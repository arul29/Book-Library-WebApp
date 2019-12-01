import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from "react-router-dom";
// Import Materialize
import M from "materialize-css";
// import { getBookdetail } from "./../Public/Redux/Actions/books";
import { connect } from "react-redux";
import {
  updateBook,
  borrowBook,
  getWishlist,
  addWishlist,
  addBorrow,
  getBorrow,
  updateBorrow
} from "../Public/Redux/Actions/books";
import { delBook } from "../Public/Redux/Actions/books";
import decode from "jwt-decode";
import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// const MySwal = withReactContent(Swal);
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      id: 0,
      detail: {
        id: "",
        id_user: "",
        title: "",
        author: "",
        des: "",
        genre: "",
        status: "",
        url_img: "",
        created_at: "",
        updated_at: ""
        //   title: "",
        //   desc: "",
        //   img: "",
        // data: [],
        //   show: false,
        // },
      },
      tempBooks: {
        title: "",
        author: "",
        url_img: "",
        des: "",
        status: "",
        genre: ""
      },
      data: [],
      data2: []
    };
    // console.log();

    // this.editBook = this.editBook.bind(this);
  }

  async componentDidMount() {
    // mengambul data wishlist
    if (localStorage.id_token) {
      await this.props.dispatch(
        getWishlist(decode(localStorage.id_token).response.id)
      );
      this.setState({
        data: this.props.data.bookData
        // mengambul data wishlist
        // onGenre: this.handleGenre.bind(this)
      });
      const { id } = this.props.match.params;
      await this.props.dispatch(
        getBorrow(decode(localStorage.id_token).response.id, id)
      );
      this.setState({
        data2: this.props.data.bookData
        // mengambul data wishlist
        // onGenre: this.handleGenre.bind(this)
      });
    }
    M.AutoInit();
    if (this.props.location.state) {
      const { id } = this.props.match.params;
      const { books } = this.props.location.state;
      // console.log("isi idnya : ", books[id]);
      // console.log("ID : ", id);
      this.setState({
        books,
        id: id,
        detail: books.filter(book => id === `${book.id}`)[0],
        tempBooks: books.filter(book => id === `${book.id}`)[0],
        onChange: this.handleChange.bind(this),
        onEdit: this.handleonEdit.bind(this),
        onDel: this.handleonDel.bind(this)
      });
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      tempBooks: { ...this.state.tempBooks, [name]: value }
    });
  };

  handleonEdit = event => {
    const { id } = this.props.match.params;
    event.preventDefault();
    const { title, author, url_img, des, status, genre } = this.state.tempBooks;
    const new_editBook = {
      title: title,
      author,
      url_img,
      des,
      status,
      genre
    };
    this.props.dispatch(updateBook(new_editBook, id)).then(() => {
      alert("Updated Succes");
      window.location.href = "/";
      // window.location.href = `/detail/${id}`;
    });
  };

  handleonDel = event => {
    const { id } = this.props.match.params;
    event.preventDefault();
    console.log(id);
    this.props.dispatch(delBook(id)).then(() => {
      alert("Deleted Succes");
      window.location.href = "/";
    });
  };

  borrow = () => {
    if (!localStorage.id_token) {
      // MySwal.fire({ title: "Success",footer: "sss",type: "error",imageUrl: "https://unsplash.it/400/200",
      // text: "Your work has been saved."});
      // MySwal.fire("Cannot borrow book","if you want to borrow book, please login or register :)","error");

      const swalWithConfirm = Swal.mixin({
        customClass: {
          confirmButton: "btn waves-light red",
          cancelButton: "btn waves-light blue"
        },
        buttonsStyling: false
      });

      swalWithConfirm
        .fire({
          title: "Cannot borrow book",
          text: "if you want to borrow book, please login or register",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Login",
          cancelButtonText: "Close",
          reverseButtons: true
        })
        .then(result => {
          if (result.value) {
            // swalWithBootstrapButtons.fire("Deleted!","Your file has been deleted.","success");
            window.location.href = "../login";
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithConfirm.fire("Cancelled", "", "error");
          }
        });

      // alert("if you want to borrow book, please login or register");
    } else {
      // console.log(decode(localStorage.id_token).response.id);
      const { id } = this.props.match.params;
      const id_u = decode(localStorage.id_token).response.id;
      const newBookz = {
        status: "Empty",
        id_user: id_u
      };
      const newBorrow = {
        id_user: id_u,
        id_book: id
      };
      // console.log("isi newbookz", newBookz);
      this.props.dispatch(borrowBook(newBookz, id)).then(() => {
        this.props.dispatch(addBorrow(newBorrow)).then(() => {
          Swal.fire("Borrow Succes", "Happy reading :)", "success").then(() => {
            window.location.href = "/";
          });
        });
        // window.location.href = `/detail/${id}`;
      });
    }
  };
  return = () => {
    let id_borrow;
    this.state.data2.map((item, index) => {
      id_borrow = item.id;
    });
    const { id } = this.props.match.params;
    const newBookz = {
      status: "Available",
      id_user: 0
    };
    this.props.dispatch(borrowBook(newBookz, id)).then(() => {
      this.props.dispatch(updateBorrow(id_borrow)).then(() => {
        Swal.fire(
          "Return Succes",
          "Thank you for borrowing :)",
          "success"
        ).then(() => {
          window.location.href = "/";
        });
      });
    });
  };
  wishlist = () => {
    const { id } = this.props.match.params;
    const id_u = decode(localStorage.id_token).response.id;
    const newWish = {
      id_book: id,
      id_user: id_u
    };
    this.props.dispatch(addWishlist(newWish)).then(() => {
      Swal.fire("Wishlist Succes", "", "success").then(() => {
        window.location.href = "/";
      });
    });
  };

  render() {
    // console.log("id wislsi", this.state.data);
    const token = localStorage.id_token;
    // const token = localStorage.getItem('id_token');
    let userProfile, userName, userEmail, userRole, userID, exp, datenow;
    let disWish = "";
    if (token) {
      userProfile = decode(token);
      userName = userProfile.response.name;
      userEmail = userProfile.response.email;
      userRole = userProfile.response.role;
      userID = userProfile.response.id;
      // console.log(userProfile);

      // if (userID === this.state.detail.id_user) disWish = "disabled";
      this.state.data.map((item, index) => {
        // console.log(item.id_book);
        // console.log("MATCH PARAMS", parseInt(this.props.match.params.id));
        // console.log("ID BOOKS", this.state.data[0].id_book);

        if (
          parseInt(this.props.match.params.id) ===
          this.state.data[index].id_book
        ) {
          disWish = "disabled";
          // alert(disWish);
        }
      });
    }
    // console.log("id borrow", this.state.data2.id);

    // console.log("id user dari book", this.books.bookData.id);
    // console.log("id user dari book", this.state.detail.id_user);
    // console.log("id user login", userID);
    // console.log("TEMP,", this.state.tempBooks);
    // const { title, author, url_img, des, status, genre } = this.state.tempBooks;
    // DATE FORMAT -----v-------
    let arrDate = this.state.detail.updated_at
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

    console.log(arrDate.join(" "));

    let isDisabled = "";
    if (this.state.detail.status.toLowerCase() === "empty")
      isDisabled = "disabled";

    return (
      <div>
        <div className="parallax-container">
          <div>
            <div className="row" style={{ marginTop: "1rem" }}>
              <div className="col s8 lighten-2">
                <Link
                  to="../"
                  style={{ position: "fixed" }}
                  className="btn-floating btn-large waves-effect waves-light white"
                >
                  <i className="material-icons" style={{ color: "black" }}>
                    undo
                  </i>
                </Link>
              </div>
              {userRole === "admin" ? (
                <div className="col s4 lighten-2 right-align">
                  <button
                    href="#modaledit"
                    class="btn waves-light blue modal-trigger"
                    type="submit"
                    name="action"
                    style={{ borderRadius: "15px" }}
                  >
                    Edit
                    <i class="material-icons right">border_color</i>
                  </button>
                  <button
                    href="#modaldel"
                    style={{ marginLeft: "10px", borderRadius: "15px" }}
                    className="btn waves-light red modal-trigger"
                    type="submit"
                    name="action"
                  >
                    Delete
                    <i class="material-icons right">backspace</i>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* {console.log(this.props.data.title)} */}
          <div className="parallax">
            <img src={this.state.detail.url_img} />
          </div>
        </div>
        <div className="section  grey lighten-4">
          <div className="row container">
            <div
              className="col s10 card-panel lighten-2"
              style={{ borderRadius: "20px 20px 20px 20px" }}
            >
              <div className="col s8 lighten-2">
                {/* GENRE */}
                <div
                  className="col s2"
                  style={{
                    marginRight: "100px",
                    marginTop: "10px"
                  }}
                >
                  <span
                    style={{ borderRadius: "10px" }}
                    class="new badge blue"
                    data-badge-caption={this.state.detail.genre}
                  ></span>
                </div>
                <br />
                <h3 style={{ marginBottom: "-20px" }}>
                  {this.state.detail.title}
                </h3>
                <br />
                <h5>{arrDate}</h5>
              </div>
              <div
                className="col s4 lighten-2 right-align"
                style={{ marginTop: "3rem" }}
              >
                {this.state.detail.status === "Empty" &&
                userID === this.state.detail.id_user ? (
                  <p class="flow-text orange-text">You Borrowed</p>
                ) : (
                  <p class="flow-text orange-text">
                    {this.state.detail.status}
                  </p>
                )}
              </div>
              <div
                className="col s4 lighten-2 right-align"
                style={{ marginTop: "2rem" }}
              ></div>
              <p
                align="justify"
                style={{
                  fontSize: "15px"
                  // fontFamily: "Segoe Print"
                }}
              >
                &nbsp; &nbsp;
                {this.state.detail.des}
              </p>
            </div>
            <div className="col s2 lighten-2 right-align">
              <div className="right-align">
                <img
                  src={this.state.detail.url_img}
                  style={{
                    width: "140px",
                    marginTop: "-19rem",
                    borderRadius: "10px",
                    borderStyle: "solid",
                    borderColor: "white",
                    marginLeft: "11px"
                  }}
                />
                {this.state.detail.status === "Empty" &&
                userID === this.state.detail.id_user ? (
                  <button
                    onClick={this.return}
                    style={{
                      color: "white",
                      marginRight: "-10px",
                      borderRadius: "15px"
                    }}
                    className="btn waves-light pink"
                    type="submit"
                    name="action"
                  >
                    Return
                    <i class="material-icons right">keyboard_return</i>
                    {/* shopping_cart */}
                  </button>
                ) : (
                  ""
                )}
                {(userRole !== "admin" ||
                  this.state.detail.status === "Available") &&
                userID !== this.state.detail.id_user &&
                userRole !== "admin" ? (
                  <button
                    onClick={this.borrow}
                    style={{
                      color: "black",
                      marginRight: "-10px",
                      borderRadius: "15px"
                    }}
                    className={`btn ${isDisabled} waves-light yellow `}
                    type="submit"
                    name="action"
                  >
                    Borrow
                    <i class="material-icons right">add_shopping_cart</i>
                    {/* shopping_cart */}
                  </button>
                ) : (
                  ""
                )}
                {userRole === "user" ? (
                  <button
                    onClick={this.wishlist}
                    style={{
                      marginTop: "10px",
                      color: "white",
                      marginRight: "-12px",
                      borderRadius: "15px"
                    }}
                    className={`btn ${disWish} waves-light green`}
                    type="submit"
                    name="action"
                  >
                    Wishlist
                    <i class="material-icons right">bookmark_border</i>
                    {/* shopping_cart */}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        {/* PARALLAX BAWAH */}
        {/* <div class="parallax-container">
          <div class="parallax">
            <img src={this.state.detail.url_img} />
          </div>
        </div> */}
        {/* ALERT DELETE */}
        <div>
          {/* Modal Structure */}
          <div id="modaldel" className="modal">
            <button
              // href={`../?ide=${this.props.match.params.id}`}

              className="modal-close waves-grey btn-flat"
              style={{
                float: "right",
                color: "black"
              }}
            >
              <i className="material-icons"> close</i>
            </button>
            <button
              // href={`../?ide=${this.props.match.params.id}`}
              onClick={this.state.onDel}
              className="modal-close waves-grey btn-flat"
              style={{
                float: "right",
                color: "black"
              }}
            >
              <i className="material-icons"> check</i>
            </button>
            <center>
              <div
                className="modal-content center-align"
                style={{ width: "50%" }}
              >
                <h4>Are you sure remove {this.state.tempBooks.title}?</h4>
                <img
                  width="25%"
                  src="https://image.flaticon.com/icons/png/512/458/458594.png"
                />
                {/* <p>Data {this.state.detail.title} Deleted</p> */}
              </div>
            </center>
          </div>
        </div>

        {/* ALERT EDIT */}
        {/* Modal Structure */}
        <div id="modaledit" className="modal">
          <div className="modal-content">
            <a
              className="modal-close waves-grey btn-flat"
              style={{
                float: "right",
                color: "black"
              }}
            >
              <i className="material-icons"> arrow_back</i>
            </a>
            <h4>Edit Data</h4>
            <div className="row">
              <form className="col s12" onSubmit={this.state.onEdit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      name="title"
                      id="title"
                      type="text"
                      value={this.state.tempBooks.title}
                      className="validate"
                      onChange={this.state.onChange}
                    />
                    <label htmlFor="title">Title</label>
                  </div>
                </div>
                <div className="row modal-form-row">
                  <div className="input-field col s12">
                    <input
                      name="author"
                      id="author"
                      type="text"
                      value={this.state.tempBooks.author}
                      className="validate"
                      onChange={this.state.onChange}
                    />
                    <label htmlFor="author">Author</label>
                  </div>
                </div>
                <div className="row modal-form-row">
                  <div className="input-field col s12">
                    <input
                      name="url_img"
                      id="url_img"
                      type="text"
                      value={this.state.tempBooks.url_img}
                      className="validate"
                      onChange={this.state.onChange}
                    />
                    <label htmlFor="url_img">Image URL</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea
                      name="des"
                      onChange={this.state.onChange}
                      id="des"
                      type="text"
                      className="materialize-textarea validate"
                      value={this.state.tempBooks.des}
                    />
                    <label htmlFor="des">Description</label>
                  </div>
                </div>
                <div className="row modal-form-row">
                  <div className="input-field col s12">
                    {/* <input
                      name="status"
                      id="status"
                      type="text"
                      className="validate"
                      value={this.state.tempBooks.status}
                      onChange={this.state.onChange}
                    /> */}
                    <select
                      className="validate"
                      required
                      name="status"
                      id="status"
                      type="text"
                      className="validate"
                      value={this.state.tempBooks.status}
                      onChange={this.props.onChange}
                    >
                      <option value="Available">Available</option>
                      <option value="Empty">Empty</option>
                    </select>
                    <label htmlFor="status">Status</label>
                  </div>
                </div>
                <div className="row modal-form-row">
                  <div className="input-field col s12">
                    {/* <input
                      name="genre"
                      id="genre"
                      type="text"
                      className="validate"
                      onChange={this.state.onChange}
                      value={this.state.tempBooks.genre}
                    /> */}
                    <select
                      required
                      name="genre"
                      id="genre"
                      type="text"
                      className="validate"
                      onChange={this.props.onChange}
                      value={this.state.tempBooks.genre}
                    >
                      <option value="Fanstasy">Fantasy</option>
                      <option value="Action">Action</option>
                      <option value="Romance">Romance</option>
                      <option value="Horror">Horror</option>
                    </select>
                    <label htmlFor="genre">Genre</label>
                  </div>
                </div>{" "}
                <div className="modal-footer">
                  <button className=" modal-action modal-close waves-effect waves-grey btn-flat">
                    <i className="material-icons">send</i>
                  </button>
                </div>
              </form>
            </div>
          </div>
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

export default connect(mapStateToProps)(Detail);
