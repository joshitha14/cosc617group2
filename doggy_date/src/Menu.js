import React, {useContext} from "react";
import './App.css';
import {AuthContext} from "./AuthContext";
import logo from "./images/logo.png";
import {Link} from 'react-router-dom'

function Menu(){
    const {authState} = useContext(AuthContext);
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
                            
                            <Link to ={authState.isAuth ? '/meet' : '/login'}>
                            <li className="meet">MEET</li>
                            </Link>

                            <Link to ="/matches">
                            <li className="matches">MATCHES</li>
                            </Link>

                            <li>BLOG</li>
                          

                      
                            <li>SUPPORT</li>
                      

                   
                            <li>CONTACT US</li>
                    

                            
                            
                            <Link to ={authState.isAuth ? '/home' : '/signup'}>
                            <li className="signup">SIGN UP</li>
                            </Link>
                            
                        </ul>
                    </nav>
            </header>

        </div>
    );
}
export default Menu;