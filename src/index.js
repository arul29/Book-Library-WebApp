import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import "react-mdl/extra/material.css";
// import "react-mdl/extra/material.js";
import Detail from "./Components/Detail";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Provider } from "react-redux";
import store from "./Public/Redux/store";
import Admin from "./Components/Admin";
import Wishlist from "./Components/Wishlist";
import History from "./Components/History";

const EnhancedApp = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/" exact component={App} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/wishlist" exact component={Wishlist} />
          <Route path="/history" exact component={History} />
        </div>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<EnhancedApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
