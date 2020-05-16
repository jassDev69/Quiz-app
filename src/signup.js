import React from "react";

function signup() {
  return (
    <form>
      <label htmlFor="FirstName">First Name</label>
      <input type="text" id="FirstName" name="FirstName"></input>
      <br></br>
      <label htmlFor="LastName">Last Name</label>
      <input type="text" id="LastName" name="LastName"></input> <br></br>
      <label htmlFor="Email">Email</label>
      <input type="email" id="Email" name="Email"></input> <br></br>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password"></input> <br></br>
      <input type="submit" value="submit"></input>
    </form>
  );
}

export default signup;
