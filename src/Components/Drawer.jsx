import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
// Import Materialize
// import M from "materialize-css";
// import book from "./BookDB";
import decode from "jwt-decode";
import AuthService from "./AuthService";
import Swal from "sweetalert2";
// impor
const Auth = new AuthService();
class Drawer extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   books: book
    // };
    // this.addBook = this.addBook.bind(this);
  }
  componentDidMount() {
    // Auto initialize all the things!
    // M.AutoInit();
  }

  // addBook(e) {
  //   e.preventDefault();
  //   this.setState({
  //     books: this.state.books.push({
  //       title: document.getElementById("image_title").value.trim(),
  //       img: document.getElementById("image_url").value.trim(),
  //       desc: document.getElementById("image_description").value.trim()
  //     })
  //   });
  //   // console.log("ISI BOOK BARU : ", this.state.books);
  // }

  render() {
    const token = localStorage.id_token;
    // const token = localStorage.getItem('id_token');
    let userProfile, userName, userEmail, userRole, exp, datenow;
    if (token) {
      userProfile = decode(token);
      // console.log(userProfile);
      exp = userProfile.exp;
      datenow = Date.now() / 1000;
      userName = userProfile.response.name;
      userEmail = userProfile.response.email;
      userRole = userProfile.response.role;
      if (exp < datenow) {
        Swal.fire(
          "Oops",
          "Your session has expired, please re-login :)",
          "warning"
        ).then(() => {
          Auth.logout();
          window.location.href = "/login";
        });
        // alert("Your session has expired, please re-login ");
        // Auth.logout();
        // window.location.href = "/login";
      }
    }
    // console.log("userProfile", userProfile.response.name);
    // console.log("ISI BOOK LAMA : ", this.state.books);
    console.log("ISI : ", this.props.title);
    return (
      <div>
        <ul id="slide-out" className="sidenav">
          <li>
            <div className="user-view">
              <div className="background">
                <img
                  width="400"
                  src="https://image.freepik.com/free-photo/electronic-devices-notebook-coffee-cup-dark-blue-table_23-2148128417.jpg"
                />
              </div>
              <a href="#user">
                {userName ? (
                  <img
                    className="circle"
                    src="https://image.flaticon.com/icons/svg/236/236832.svg"
                  />
                ) : (
                  <img
                    className="circle"
                    src="https://image.flaticon.com/icons/svg/189/189665.svg"
                  />
                )}

                {/* https://image.flaticon.com/icons/svg/189/189665.svg */}
              </a>
              <a href="#name">
                <span className="white-text name">
                  {userName ? userName : "Guest"}
                </span>
              </a>
              <a href="#email">
                <span className="white-text email">
                  {userEmail ? userEmail : "Have a nice day"}
                </span>
              </a>
            </div>
          </li>
          <li>
            <a href="#!">
              <i className="material-icons">explore</i>Explore
            </a>
          </li>
          {userRole === "user" ? (
            <div>
              <li>
                <a href="/history">
                  <i className="material-icons">history</i>History
                </a>
              </li>
              <li>
                <a href="/wishlist">
                  <i className="material-icons">bookmark_border</i>Wishlist
                </a>
              </li>
            </div>
          ) : (
            ""
          )}
          {userRole !== "admin" ? (
            ""
          ) : (
            <div>
              <li>
                <a href="#modal1" className="modal-trigger">
                  <i className="material-icons">add_to_photos</i>Add Book
                </a>
              </li>
              <li>
                <a href="./admin">
                  <i className="material-icons">person_add</i>Add Admin
                </a>
              </li>
            </div>
          )}

          {userRole === undefined ? (
            <li>
              <a href="./register">
                <i className="material-icons">person_add</i>Register
              </a>
            </li>
          ) : (
            ""
          )}
          {token ? (
            <li>
              <a href="" onClick={this.props.onLogout}>
                <i className="material-icons">vpn_key</i>Logout
              </a>
            </li>
          ) : (
            <li>
              <a href="./login">
                <i className="material-icons">vpn_key</i>Login
              </a>
            </li>
          )}
        </ul>

        <div>
          {/* Modal Structure */}
          <div id="modal1" className="modal">
            <div className="modal-content">
              <a
                className="modal-close waves-effect waves-grey btn-flat"
                style={{
                  float: "right",
                  color: "black"
                }}
              >
                <i className="material-icons"> arrow_back</i>
              </a>
              <h4>Add Data</h4>
              <div className="row">
                <form className="col s12" onSubmit={this.props.onAdd}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        required
                        name="title"
                        id="title"
                        type="text"
                        value={this.props.title}
                        className="validate"
                        onChange={this.props.onChange}
                      />
                      <label htmlFor="title">Title</label>
                    </div>
                  </div>
                  <div className="row modal-form-row">
                    <div className="input-field col s12">
                      <input
                        required
                        name="author"
                        id="author"
                        type="text"
                        value={this.props.author}
                        className="validate"
                        onChange={this.props.onChange}
                      />
                      <label htmlFor="author">Author</label>
                    </div>
                  </div>
                  <div className="row modal-form-row">
                    <div className="input-field col s12">
                      <input
                        required
                        name="url_img"
                        id="url_img"
                        type="text"
                        value={this.props.url_img}
                        className="validate"
                        onChange={this.props.onChange}
                      />
                      <label htmlFor="url_img">Image URL</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea
                        required
                        name="des"
                        onChange={this.props.onChange}
                        id="des"
                        type="text"
                        className="materialize-textarea validate"
                        value={this.props.des}
                      />
                      <label htmlFor="des">Description</label>
                    </div>
                  </div>
                  <div className="row modal-form-row">
                    <div className="input-field col s12">
                      {/* <input
                        required
                        name="status"
                        id="status"
                        type="text"
                        className="validate"
                        value={this.props.status}
                        onChange={this.props.onChange}
                      /> */}
                      <select
                        className="validate"
                        required
                        name="status"
                        id="status"
                        type="text"
                        className="validate"
                        value={this.props.status}
                        onChange={this.props.onChange}
                      >
                        <option value="" disabled selected>
                          Choose
                        </option>
                        <option value="Available">Available</option>
                        <option value="Empty">Empty</option>
                      </select>
                      <label htmlFor="status">Status</label>
                    </div>
                  </div>
                  <div className="row modal-form-row">
                    <div className="input-field col s12">
                      {/* <input
                        required
                        name="genre"
                        id="genre"
                        type="text"
                        className="validate"
                        onChange={this.props.onChange}
                        value={this.props.genre}
                      /> */}
                      <select
                        required
                        name="genre"
                        id="genre"
                        type="text"
                        className="validate"
                        onChange={this.props.onChange}
                        value={this.props.genre}
                      >
                        <option value="" disabled selected>
                          Choose
                        </option>
                        <option value="Fanstasy">Fantasy</option>
                        <option value="Action">Action</option>
                        <option value="Romance">Romance</option>
                        <option value="Horror">Horror</option>
                      </select>
                      <label htmlFor="genre">Genre</label>
                    </div>
                  </div>{" "}
                  <div className="modal-footer">
                    <button className=" modal-action waves-effect waves-grey btn-flat">
                      <i className="material-icons">send</i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Drawer;
