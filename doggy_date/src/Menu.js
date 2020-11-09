import React from "react";
import './App.css';
import logo from "./images/logo.png";
import {Link} from 'react-router-dom'

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
                            
                            <Link to ="/meet">
                            <li className="meet">MEET</li>
                            </Link>

                            <li>BLOG</li>
                          

                      
                            <li>SUPPORT</li>
                      

                   
                            <li>CONTACT US</li>
                    

                            
                            
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