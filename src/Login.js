import React from "react";
import ReactDOM from "react-dom";

function Login() {
  return (
    <form>
      <label htmlFor="UserName">user Name</label>
      <input type="text" id="UserName" name="UserName"></input>
      <br></br>
      <label htmlFor="Password">Password</label>
      <input type="password" id="password" name="password"></input> <br></br>
      <input type="submit" value="submit"></input>
    </form>
  );
}

export default Login;
