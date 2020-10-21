import React from "react";
import profilepic from "./images/Dog1/pp.jpeg";
import pic3 from "./images/Dog1/processed2.jpeg";
import pic4 from "./images/Dog1/upload1.jpeg";
import { Link } from 'react-router-dom';


import './App.css';

function Profile() {
    return (
        <div>
            <div className="cardprofile">
                <img className="profilepic" src={profilepic} alt="Profile" />
                <div className="profilecontent">
                    <h1>Oscar Black</h1>
                    <p>Age: </p><span>20 </span>
                    <p>Sex: </p><span>Male </span>
                    <p>Weight(lbs): </p><span>62 </span>
                    <p>Breed: </p>  <span>German Shepherd </span>

                </div>
                <em>" I like to chew furniture. I am a big boofy boy with a strong waggy tail." </em>
                <br />
                <div className="topnav">
                    <h4>Signout</h4>
                </div>
                <img className="imagereelpics" src={profilepic} alt="Profile" id="myimg" />
                <img className="imagereelpics" src={pic3} alt="Profile" />
                <img className="imagereelpics" src={pic4} alt="Profile" />

            </div>
        </div>
    );
}
export default Profile;