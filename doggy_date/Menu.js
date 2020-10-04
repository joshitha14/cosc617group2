import React from "react";
import './App.css';
import logo from "./images/logo.png";
import {Link}from 'react-router-dom'

function Menu(){
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
                            
                            <li>BLOG</li>
                          

                      
                            <li>SUPPORT</li>
                      

                   
                            <li>CONTACT US</li>
                    

                            <Link to ="/login">
                            <li className="signin">LOG IN </li>
                            </Link>
                            
                            <Link to ="/signup">
                            <li className="signup">SIGN UP</li>
                            </Link>
                            
                        </ul>
                    </nav>
            </header>

        </div>
    );
}
export default Menu;