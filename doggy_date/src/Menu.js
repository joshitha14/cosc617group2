import React from "react";
import './App.css';
import logo from "./images/logo.png";
import {Link} from 'react-router-dom';

function Menu(){
    return(
        <div>
            <Menu/>
            <header>
                <div className="logo">
                <Link to ="/">
                <img src={logo} alt="logo"/>
                </Link>
                </div>

                    <nav>
                        <ul className="menu">
                            <Link>
                            <li>BLOG</li>
                            </Link>
                            <Link>
                            <li>SUPPORT</li>
                            </Link>
                            <Link>
                            <li>CONTACT US</li>
                            </Link>
                            <Link to="/login">
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