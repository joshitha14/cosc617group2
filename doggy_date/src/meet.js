import React, {useEffect, useState} from "react";
import './App.css';
import heart from "./images/heart-solid.png"
import cross from "./images/times-solid.svg";


function Meet() { 
  //useEffect() will be used to call fetchUserDetails() when the component mounts. 
  //The [] argument tells useEffect() to run when the component mounts. 
  useEffect (() => {
    fetchUserDetails();
  }, []);

  var [users, setUsers] = useState([]);

  //Fetch user details and photo ID#s. Store in separate object for each user:
  const fetchUserDetails = async () => {
    const data = await fetch('http://localhost:3001/user_details/');
    const userDetails = await data.json();
    //For each user, fetch the list of image filenames and store the list as an array
    //in the object for that user.
    for(var user of userDetails) {
      const data = await fetch(`http://localhost:3001/photos?Username=${user.Username}`);
      const imageFileNames = await data.json();
      user.currentImage = 0; //This will store the index of the image that is currently displayed for the user.
      user.images = []; //This array will store the filenames for the user's images.
      for(var file of imageFileNames) { 
        user.images.push(file.PhotoID); //Push the filenames for each image into the array. 
      }
    }
    setUsers(userDetails);
  }

  // Generate a link to the users primary (first) photo:
  function generateLinkToMainPhoto(username) {
    var photoID;
    for(var user of users)
      if(user.Username === username) {
        photoID = user.images[0];
        break;
      }
    return `./pubImages/${username}/${photoID}.jpg`
  }

  function showNextImage(username) {
    //Find the particular user in the array of users:
    var user;
    for(user of users)
      if(user.Username === username)
         break;
    //Increment the value of the currentImage property to reflect the index of the next image. 
    //Loop back to index 0 at the end of the image array:
    if(user.currentImage === user.images.length - 1)
      user.currentImage = 0;
    else
      user.currentImage++;
    //Display the next image. The index of the next image is now the value of the currentImage property:
    document.getElementById(`main-pic-${user.Username}`).src = `./pubImages/${username}/${user.images[user.currentImage]}.jpg`;
  }

  //Calculate age from birthdate.
  function getAge(birthDay){
    const milisecondsPerYear = 31536000000;
    const milisecondsPerMonth = 2629800000;
    var today = new Date();
    var bday = new Date(birthDay);
    var ageMiliseconds = Date.parse(today) - Date.parse(bday);
  
    if(ageMiliseconds >= milisecondsPerYear) //Older than 1 year.
      return Math.floor(ageMiliseconds / milisecondsPerYear).toString();
    else
      return Math.floor(ageMiliseconds / milisecondsPerMonth).toString() + "m";
  }

  return (
    <div>
      {users.map(user => (
        <div className="card" key={user.Username}>
          <img className="newsfeedpic" id={`main-pic-${user.Username}`} src={generateLinkToMainPhoto(user.Username)} 
          alt="Profile" onClick={() => showNextImage(user.Username)}/>
          <h1 id="firstName">{user.First_name}</h1>
          <div className="profilecontent">
            <p>Age:</p><span>{getAge(user.Birthdate)}</span>
            <p>Sex:</p><span>{user.Sex} </span>
            <p>Weight(lbs):</p><span>{user.Weight}</span>
            <p>Breed:</p>  <span>{user.Breed}</span><br />
            <div id="bio">{user.Bio}</div>
            <div className="reactions">
              <img src={heart} height="42px" style={{padding:"0px 66px 0 0"}}/>
              <img src={cross} height="48px"/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Meet;
