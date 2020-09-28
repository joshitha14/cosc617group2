import React from "react";
import './App.css';
import logo from "./images/logo_white.png";
function Signup (){
    return (
        <div>
            <div className="loginform">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <h1>Get Started</h1> <br />
                <p>By clicking get Log in, you agree to our <a href="#">Terms</a> Learn how we process your data in our
                <a href="#">Privacy Policy</a> and <a href="#">Cookie Policy</a></p> <br />
                <form>
                    <p>First Name</p>
                    <input type="text" name="Fname" placeholder="name@email.com" />
                    <p>Last Name</p>
                    <input type="password" name="Lname" placeholder="password" /> <br />

                    <p>Date of Birth</p>
                    <input type="date" name="dob" /> <br />

                    <p>Sex</p>
                    <input type="text" name="sex" /> <br />

                    <p>Weight</p>
                    <input type="text" name="weight" /> <br />

                    <p>Breed</p>
                    <input type="text" name="breed" /> <br />

                    <p>Zip Code</p>
                    <input type="text" name="zip" /> <br />s


                    <input type="submit" name="" value="Login" />
                </form>
            </div>

        </div>
    );
}
export default Signup;
