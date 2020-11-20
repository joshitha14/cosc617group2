import React, {useContext} from "react";
import './App.css';
import {AuthContext} from "./AuthContext";
import logo from "./images/logo.png";
import {Link, useLocation} from 'react-router-dom';

function Menu(){
    const {isAuthenticated, logout} = useContext(AuthContext);
    const location = useLocation(); 
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

                            {/* <li>BLOG</li> */}
                            {/* <li>SUPPORT</li> */}
                            {/* <li>CONTACT US</li> */}
                
                            <Link to ="/">
                            <li className={`signin ${isAuthenticated() || location.pathname==='/' ? 'hideLink' : ''}`}>LOG IN</li>
                            </Link>

                            <Link to ="/signup">
                            <li className={`signin ${isAuthenticated() ? 'hideLink' : ''}`}>SIGN UP</li>
                            </Link>
                            
                        </ul>
                    </nav>
            </header>

        </div>
    );
}
export default Menu;