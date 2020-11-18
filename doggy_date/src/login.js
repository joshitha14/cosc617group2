import React, {useState, useContext} from "react";
import {AuthContext} from "./AuthContext";
import {Link} from 'react-router-dom';
import './App.css';

function Login () {
  const [user, setUser] = useState({userName:'',password:''});
  const [loginMsg, setLoginMsg] = useState('');
  // const {authState,setAuthState} = useContext(AuthContext);
  const {setAuthState} = useContext(AuthContext);

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
  
  fetch('http://localhost:3001/login', requestOptions)
    .then(res => {
      return res.json()
    })
    .then(data => {
      setLoginMsg(data.message);
      if(data.isAuth && data.expiresAt)
      {
        setAuthState(data);
        // setAuthState({ ...authState, isAuth: data.isAuth, expiresAt: data.expiresAt, userInfo: data.userInfo }); 
      }
    })
  }
  return(
    <div className="loginform">
      <h1>WELCOME, DOG LOVERS!</h1>
      <form action="newsfeed.js" method="get" onSubmit={handleSubmit}>
        <p>User Name</p>
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
        <br/>
        <input type="submit" value="LOG IN" />
      </form>
      <p>{loginMsg}</p>
      <p>Forgot Password?</p>
      <p><Link to="/signup">Don't have an account?</Link></p>
    </div>
  );
}
export default Login;