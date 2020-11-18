import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import './App.css';
import logo from "./images/logo_white.png";


function Signup (){
    const history = useHistory();
    const [user, setUser] = useState({userName:'', password:'', passwordConfirm:''});
    const [signupMsg, setSignupMsg] = useState('');
  
    const handleSubmit =  (e) => {
      e.preventDefault();
  
      const requestOptions = {
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    }
    
    fetch('http://localhost:3001/register', requestOptions)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setSignupMsg(data.message);
        if(data.status >= 200 && data.status <= 299)
        {
          history.push('/');
        }
      })
    }
    return (
        <div>
            <div className="signupform">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <h1>Get Started</h1> <br />
                <p>By clicking get Sign Up, you agree to our Terms . Learn how we process your data in our
                Privacy Policy and Cookie Policy.</p> <br/>
                <form action='/newsfeed' onSubmit={handleSubmit}>
                    <p>Username</p>
                    <input type="text" name="username" 
                    value={user.userName} 
                    onChange={(e) => setUser({ ...user, userName: e.target.value })}
                    required /> 
                    <br /> 
                    <p>Password</p>
                    <input type="password" name="password" 
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    required /> 
                    <br />
                    <p>Confirm Password</p>
                    <input type="password" name="cpassword" 
                    value={user.passwordConfirm}
                    onChange={(e) => setUser({ ...user, passwordConfirm: e.target.value })}
                    required /> 
                    <br/>
                    <p>{signupMsg}</p>
                    
                    {/* { <br/> */}
                  
                    

                    <input type="submit" name="" value="SIGN UP"/>
                </form>
            </div>

        </div>
    );
}
export default Signup;
