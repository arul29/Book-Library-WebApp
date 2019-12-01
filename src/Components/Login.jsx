import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from "react-router-dom";
// Import Materialize
import M from "materialize-css";
// import { connect } from "react-redux";
import "./../Assets/Login.css";
import Swal from "sweetalert2";
import AuthService from "./AuthService";
class Login extends Component {
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

  handleFormSubmit(e) {
    e.preventDefault();
    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace("/");
      })
      .catch(err => {
        // alert("wrong username or password");
        Swal.fire("Login Failed", "Wrong username or password :(", "error");
      });
  }

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
                <h4 className="card-title center-align">Login</h4>
                <form onSubmit={this.handleFormSubmit}>
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
                      Login
                      <i className="material-icons right">fingerprint</i>
                    </button>
                  </div>
                  <Link to="./">Back to Home</Link>
                  <br />
                  <Link to="./register">Register</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

// const mapStateToProps = state => {
//   return {
//     data: state.books // namaProps: state.namaReducer
//   };
// };

// export default connect(mapStateToProps)(Detail);
