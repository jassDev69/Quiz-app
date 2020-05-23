import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Home from "./components/home";
import Begin from "./components/beginQuiz";
import Score from "./components/score";

// componentDidMount() {
//   const isLoggedIn = localStorage.getItem('rememberMe') === 'true';
//   this.setState({ user});
// }

function App() {
     const isloggedin = localStorage.getItem('loggedIn') === 'true';
     console.log(isloggedin)
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/home"}>Quiz App</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {!isloggedin &&
                <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
              </li>
              }
              {!isloggedin &&
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              }       
               {isloggedin &&
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Logout</Link>
              </li>
              } 
                {isloggedin &&
              <li className="nav-item">
                <Link className="nav-link" to={"/score"}>Scores</Link>
              </li>
              } 
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/home" component={Home} />
            <Route path="/begin" component={Begin} />
            <Route path="/score" component={Score} />
            
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
