import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from "react-router-dom";
// Import Materialize
import M from "materialize-css";
import { connect } from "react-redux";
import { getWishlist } from "../Public/Redux/Actions/books";
import decode from "jwt-decode";
import Swal from "sweetalert2";
import Axios from "axios";
// import withReactContent from "sweetalert2-react-content";
// const MySwal = withReactContent(Swal);
class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tempBooks: {
        id: "",
        title: "",
        author: "",
        url_img: "",
        id_book: ""
      }
    };
    // this.remove = this.remove.bind(this);
  }

  async componentDidMount() {
    await this.props.dispatch(
      getWishlist(decode(localStorage.id_token).response.id)
    );
    this.setState({
      data: this.props.data.bookData
      // onGenre: this.handleGenre.bind(this)
    });
    M.AutoInit();
  }

  remove = id => {
    console.log(id);
    Axios.delete(
      `https://nameless-plateau-17084.herokuapp.com/book/removewishlist?id=${id}`
    )
      .then(res => {
        {
          // array.splice(index, 1);
          this.setState({
            data: this.state.data.filter(item => item.id != id)
          });
        }
      })
      .then(() => Swal.fire("Remove Succes", "", "success"))
      .catch(error => {
        console.log(error);
      });
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:8000/user/register", this.state.dataPostRegister)
  //     .then(res => {
  //       console.log("ini res", res);
  //       console.log("ini data regis", this.state.dataPostRegister);
  //       window.location.href ="/login"

  //     }).then(()=>Swal.fire({
  //       position: 'top-center-end',
  //       icon: 'success',
  //       title: 'Succes to Register',
  //       showConfirmButton: false,
  //       timer: 2000
  //     }))
  //     .catch(error => {
  //       console.log(error);
  //     })

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
          <h5 class="center-align">Your Wishlist</h5>
        </div>

        <div className="container">
          {this.state.data.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Cover</th>
                  <th>Action</th>
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
                      <td>
                        <button
                          onClick={() => this.remove(item.id)}
                          class="waves-effect waves-light btn-small red"
                        >
                          <i class="material-icons right">clear</i>
                          Remove
                        </button>
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
                    <h4 class="truncate">You don't have a wishlist yet :(</h4>
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

export default connect(mapStateToProps)(Wishlist);
