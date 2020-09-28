import React from "react";
import Menu from './Menu';
import './App.css';



function Login ()
{
  return(
    <div>
      <Menu/>
      <div className="loginform">
      <h1>Login Page</h1>
      <from>
        <label for="username">User Name</label>
        <input type="text" name="username" /> <br />
        
        <label for="password">Password</label>
        <input type="password" name="password" /> <br/>

      <input type="submit" value="submit" />

      </from>
      </div>
    </div>
  );
}
export default Login;