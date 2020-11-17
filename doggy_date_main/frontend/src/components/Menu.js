import React, {useContext} from "react";
import "../css/App.css";
import logo from "../images/logo.png";
import {AuthContext} from "../context/AuthContext";
import {Link} from 'react-router-dom'

function Menu(){
    // console.log("Menu component redered");
    const {authState} = useContext(AuthContext);
    // console.log(authState);

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