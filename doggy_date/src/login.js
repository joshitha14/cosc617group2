import React from "react";
import Menu from './Menu';
import './App.css';



function Login ()
{
  return(
    <div>
      <Menu/>
      <div className="loginform">
      <h1>WELCOME, DOG LOVERS!</h1>
      <form>
        <p>User Name</p>
        <input type="text" name="username" /> <br />
        
        <p>Password</p>
        <input type="password" name="password" /> <br/>

      <input type="submit" value="LOG IN" />
    <p>Forgot Password?</p>
    <p>Don't have an account?</p>
      </form>
      </div>
    </div>
  );
}
export default Login;