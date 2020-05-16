import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./Login";
import Signup from "./signup";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
//import { Link } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Routing() {
  return (
    <Router>
      <div>
        <h2>Welcome to My React App</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li>
              <Link to={"/"} className="nav-link">
                {" "}
                Login{" "}
              </Link>
            </li>
            <li>
              <Link to={"/signup"} className="nav-link">
                Signup
              </Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}
ReactDOM.render(<Routing />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//export default App;
