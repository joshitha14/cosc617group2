import React, {useEffect, useState} from "react";
import './App.css';
import Menu from './Menu';
import profilepic from "./images/Dog1/pp.jpeg";
import upload1 from "./images/Dog1/upload1.jpeg";
import heart from "./images/heart-solid.png"
import cross from "./images/times-solid.svg";
import './App.css';

function Meet() { 
  
  useEffect (() => {
    fetchItems();
  }, []);

  var [users, setUsers] = useState([]);

  const fetchItems = async () => {
    const data = await fetch('http://localhost:3001/user_details/')
    const items = await data.json();
    console.log(items);
    setUsers(items);
  }

  return (
    <div>
      <Menu/>
      {users.map(user => (
        <div className="card">
            <img className="cardprofilepic" src={profilepic} alt="Profile" />
            <div className="profilecontent">
                <h1>{user.First_name}</h1>
                <p>Age: </p><span>{user.Age}</span>
                <p>Sex: </p><span>{user.Sex} </span>
                <p>Weight(lbs): </p><span>{user.Weight}</span>
                <p>Breed: </p>  <span>{user.Breed}</span>
                <img className="newsfeedpic" src={upload1} alt="Profile" />
                <div className="reactions">
                    <img src={heart} height="64px" style={{padding:"0px 100px 0 0"}}/>
                    <img src={cross} height="72px"/>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}
export default Meet;
