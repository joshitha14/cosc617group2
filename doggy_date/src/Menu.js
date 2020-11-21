import React, {useContext} from "react";
import './App.css';
import {AuthContext} from "./AuthContext";
import logo from "./images/logo.png";
import {Link, useLocation} from 'react-router-dom';
import {useEffect, useState} from "react"; //used to set user photo.

function Menu(){
    const {isAuthenticated, logout, authState} = useContext(AuthContext);
    const location = useLocation(); 


    //The below code is used to diplay the users photo in the navigation menu
    //but for some reason the component won't re-redner after the photo is
    //retreived, so the photo only shows after clicking the refresh button
    //in the browser. (Ian)

    // var currentUser = authState.userInfo.userName;

    // useEffect (() => {
    //     fetchUserPhotoID();
    // }, []);
    
    // var [photo, setPhoto] = useState('');

    // const fetchUserPhotoID = async () => {
    //     const data = await fetch(`http://localhost:3001/photos?Username=${currentUser}`)
    //     const userPhotoIDs = await data.json();
    //     setPhoto(userPhotoIDs[0].PhotoID);
    // }
    // console.log(photo);


    return(
        <div>
            
            <header>
                <div className="logo">
                <Link to ="/">
                <img src={logo} alt="logo"/>
                </Link>
                </div>

                    <nav>
                        <ul className="menu">
                            
                            <Link to ='/meet'>
                            <li className={!isAuthenticated() ? 'hideLink' : ''}>MEET</li>
                            </Link>

                            <Link to ="/matches">
                            <li className={!isAuthenticated() ? 'hideLink' : ''}>MATCHES</li>
                            </Link>

                            <Link to ="/profile">
                            <li className={!isAuthenticated() ? 'hideLink' : ''}>PROFILE</li>
                            </Link>

                            <Link onClick={logout} to ="">
                            <li className={`signin ${!isAuthenticated() ? 'hideLink' : ''}`}>LOGOUT</li>
                            </Link>
          
                            <Link to ="/">
                            <li className={`signin ${isAuthenticated() || location.pathname==='/' ? 'hideLink' : ''}`}>LOG IN</li>
                            </Link>

                            <Link to ="/signup">
                            <li className={`signin ${isAuthenticated() ? 'hideLink' : ''}`}>SIGN UP</li>
                            </Link>

                            {/* <li>
                                <img className='menuPic'src={`./pubImages/${currentUser}/${photo}.jpg`}/>
                            </li> */}
                            
                        </ul>
                    </nav>
            </header>

        </div>
    );
}
export default Menu;