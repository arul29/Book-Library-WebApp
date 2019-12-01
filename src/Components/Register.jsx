import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from "react-router-dom";
// Import Materialize
import M from "materialize-css";
import { connect } from "react-redux";
import "./../Assets/Login.css";
import AuthService from "./AuthService";
import Swal from "sweetalert2";
import { registUser } from "../Public/Redux/Actions/users";
class Register extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentDidMount() {
    M.AutoInit();
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }

  // componentWillMount() {
  //   if (this.Auth.loggedIn()) this.props.history.replace("/");
  // }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    // const { title, author, url_img, des, status, genre } = this.state.tempBooks;

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    console.log(newUser);

    this.props.dispatch(registUser(newUser)).then(() => {
      // alert("Regist Succes");
      Swal.fire("Registration Succes", "Please Login :)", "success").then(
        () => {
          window.location.href = "/login";
        }
      );
    });
    if (Error) {
      Swal.fire("Registration Failed", "Email already exists :(", "error");
    }
  };

  //   handleFormSubmit(e) {
  //     e.preventDefault();
  //     this.Auth.login(this.state.email, this.state.password)
  //       .then(res => {
  //         this.props.history.replace("/");
  //       })
  //       .catch(err => {
  //         alert(err);
  //       });
  //   }

  render() {
    return (
      <div>
        {" "}
        <div className="background-image" />
        <div className="title">
          <h3 className="center-align grey-text">Welcome!</h3>
        </div>
        <div className="row">
          <div className="col s12 l4 offset-l4">
            <div className="card grey lighten-3">
              <div className="card-content">
                <center>
                  <img
                    src="https://svsmup.in/wp-content/uploads/2018/05/register-online.gif"
                    width="150px"
                  />
                </center>
                {/* <h4 className="card-title center-align">Register</h4> */}
                <form onSubmit={this.handleFormSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">person</i>
                      <input
                        required
                        name="name"
                        type="text"
                        id="name"
                        className="validate"
                        onChange={this.handleChange}
                      />
                      <label htmlFor="name">Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">email</i>
                      <input
                        required
                        name="email"
                        type="email"
                        id="email"
                        className="validate"
                        onChange={this.handleChange}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">vpn_key</i>
                      <input
                        required
                        name="password"
                        type="password"
                        id="password"
                        className="validate"
                        onChange={this.handleChange}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row center-align">
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      Register
                      <i className="material-icons right">person_add</i>
                    </button>
                  </div>
                  <Link to="./">Back to Home</Link>
                  <br />
                  <Link to="./login">Login</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default Register;

const mapStateToProps = state => {
  return {
    data: state.users // namaProps: state.namaReducer
  };
};

export default connect(mapStateToProps)(Register);
