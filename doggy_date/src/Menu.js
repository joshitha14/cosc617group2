import React, {useContext, useState, useEffect} from "react";
import './App.css';
import {AuthContext} from "./AuthContext";
import logo from "./images/logo.png";
import {Link, useLocation} from 'react-router-dom';
// import {useEffect, useState} from "react"; //used to set user photo.

function Menu(){
    const {isAuthenticated, logout, authState} = useContext(AuthContext);
    const location = useLocation(); 

    var currentUser = authState.userInfo.userName;

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


                            
                        </ul>
                    </nav>
                {/* The below code will display the users photo in the menu when they are logged in but it is not a permanent solution. If user deletes their pic1, then the photo will not display. I tried doing a call to the database to get the photo name of the first photo instead of hard-coding "pic1", but his proved to be challenging. For some reason the image would only show after reloading the page. The menu would not rerender after the photo name was retrived and the photo state variable was updated. Best solution may 
                be to get the photo name form the DB and store it in the authState */}
                <div>
                    {isAuthenticated() ? <img className='menuPic'src={`./pubImages/${currentUser}/${currentUser}-pic1.jpg`}/> : ''}
                </div>
                
            </header>

        </div>
    );
}
export default Menu;