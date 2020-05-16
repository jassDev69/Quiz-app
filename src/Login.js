import React from "react";
//import "./Login.css";
import styles from "./Login.css";

function Login() {
  return (
    <form>
      <label htmlFor="UserName">UserName</label>
      <input type="text" id="UserName" name="UserName"></input>
      <br></br>
      <label htmlFor="Password">Password</label>
      <input type="password" id="password" name="password"></input> <br></br>
      <input type="submit" value="Submit"></input>
    </form>
  );
}

export default Login;
