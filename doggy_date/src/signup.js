import React from "react";
import './App.css';
import logo from "./images/logo_white.png";


function Signup (){
    return (
        <div>
            <div className="signupform">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <h1>Get Started</h1> <br />
                <p>By clicking get Sign Up, you agree to our Terms . Learn how we process your data in our
                Privacy Policy and Cookie Policy.</p> <br/>
                <form action='/newsfeed'>
                    <p>Username</p>
                    <input type="text" name="username" required  />
                    <p>Password</p>
                    <input type="text" name="password" required  /> <br />
                    <p>Confirm Password</p>
                    <input type="text" name="cpassword" required  /> <br />

                    
                    {/* { <br/> */}
                  
                    

                    <input type="submit" name="" value="SIGN UP"/>
                </form>
            </div>

        </div>
    );
}
export default Signup;
