import React from "react";
import {Link} from 'react-router-dom';
import './App.css';

function Login () {
  return(
    <div className="loginform">
      <h1>WELCOME, DOG LOVERS!</h1>
      <form action="newsfeed.js" method="get">
        <p>User Name</p>
        <input type="text" name="username" required /> <br />
        
        <p>Password</p>
        <input type="password" name="password" required /> <br/>

        <input type="submit" value="LOG IN" />
      </form>
      <p>Forgot Password?</p>
      <p><Link to="/signup">Don't have an account?</Link></p>
    </div>
  );
}
export default Login;