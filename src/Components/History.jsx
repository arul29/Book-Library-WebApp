import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
// Import Materialize
import M from "materialize-css";
import { connect } from "react-redux";
import { getdetailBorrow } from "../Public/Redux/Actions/books";
import decode from "jwt-decode";
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tempBooks: {
        title: "",
        author: "",
        url_img: "",
        id: "",
        borrow_at: "",
        return_at: ""
      }
    };
  }

  async componentDidMount() {
    await this.props.dispatch(
      getdetailBorrow(decode(localStorage.id_token).response.id)
    );
    this.setState({
      data: this.props.data.bookData
      // onGenre: this.handleGenre.bind(this)
    });
    M.AutoInit();
  }

  dateFormat = date_data => {
    console.log(date_data);
    let arrDate = String(date_data)
      .slice(0, 10)
      .split("-")
      .reverse();
    switch (Number(arrDate[1])) {
      case 1:
        arrDate[1] = " January ";
        break;
      case 2:
        arrDate[1] = " February ";
        break;
      case 3:
        arrDate[1] = " March ";
        break;
      case 4:
        arrDate[1] = " April ";
        break;
      case 5:
        arrDate[1] = " Mei ";
        break;
      case 6:
        arrDate[1] = " June ";
        break;
      case 7:
        arrDate[1] = " Jule ";
        break;
      case 8:
        arrDate[1] = " August ";
        break;
      case 9:
        arrDate[1] = " September ";
        break;
      case 10:
        arrDate[1] = " October ";
        break;
      case 11:
        arrDate[1] = " November ";
        break;
      case 12:
        arrDate[1] = " December ";
        break;
    }
    console.log(arrDate);

    return arrDate;
  };

  render() {
    const token = localStorage.id_token;
    // const token = localStorage.getItem('id_token');
    let userProfile, userName, userEmail, userRole, userID, exp, datenow;
    if (token) {
      userProfile = decode(token);
      userName = userProfile.response.name;
      userEmail = userProfile.response.email;
      userRole = userProfile.response.role;
      userID = userProfile.response.id;
      // console.log(userProfile);
    }
    // let dateFormat;
    // {
    //   this.state.data.map((item, index) => {
    //     dateFormat = item.return_at;
    //   });
    // }
    // console.log("date", dateFormat);

    return (
      <div>
        <nav style={{ backgroundColor: "#90caf9" }}>
          <ul>
            <li>
              <a onClick={() => (window.location.href = "./")}>
                <i style={{ color: "black" }} className="sidenav-trigger">
                  <img
                    style={{
                      width: 30,
                      marginTop: 15
                    }}
                    src="https://image.flaticon.com/icons/svg/60/60577.svg"
                  />
                </i>
              </a>
            </li>
          </ul>
          <div className="nav-wrapper container ">
            <a style={{ color: "black" }} href="/" className="brand-logo right">
              Library
            </a>
            <img
              className="brand-logo right"
              style={{ marginTop: 7, marginRight: 110 }}
              width="50"
              src="https://image.flaticon.com/icons/svg/201/201571.svg"
            />
          </div>
        </nav>

        <div>
          <h5 class="center-align">Your History</h5>
        </div>

        <div className="container">
          {this.state.data.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Cover</th>
                  <th>Borrow at</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.title}</td>
                      <td>{item.author}</td>
                      <td>
                        <img
                          className="materialboxed"
                          width="100px"
                          src={item.url_img}
                        />
                      </td>
                      <td>{this.dateFormat(item.borrow_at)}</td>
                      <td>
                        {/* {item.return_at === null ? "Ongoing" : "Returned"} */}
                        {!item.return_at ? "Ongoing" : "Returned at "}
                        {!item.return_at ? "" : this.dateFormat(item.return_at)}
                        {/* this.dateFormat(item.return_at) */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div
              className="container"
              style={{
                marginTop: "10rem"
                // border: "solid",
                // borderRadius: "25px"
              }}
            >
              {/* <div className="col s12 m8 offset-m2 l6 offset-l3"> */}
              {/* <div className="card-panel grey lighten-5 z-depth-1"> */}
              <div className="row valign-wrapper">
                <div className="col s2">
                  <img
                    src="https://image.flaticon.com/icons/svg/1178/1178428.svg"
                    alt=""
                    className="circle responsive-img"
                  />
                  {/* notice the "circle" class */}
                </div>
                <div className="col s10">
                  <span className="black-text">
                    <h4 class="truncate">You have never borrowed a book :(</h4>
                  </span>
                </div>
                {/* </div> */}
                {/* </div> */}
              </div>
              {/* <div class="card-panel hoverable">
                <h4 class="truncate">You don't have a wishlist yet :(</h4>
              </div> */}
              {/* <div class="progress">
                <div class="indeterminate"></div>
              </div> */}
            </div>
          )}
        </div>
      </div>
    );
  }
}

// export default Detail;

const mapStateToProps = state => {
  return {
    data: state.books // namaProps: state.namaReducer
  };
};

export default connect(mapStateToProps)(History);
