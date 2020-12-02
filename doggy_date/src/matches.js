//This component displays the use matches and provide a chat window for chatting.
//Note: some of the code to display the user profile cards is repeated in the
//profile.js, meet.js and matches.js files. When I intially wrote the code,
//I was not adept at creating reusable components, although I did get better
//at creating reusable components as I worked on this probject. (Ian)
import React, {useEffect, useState} from "react";
import './matches.css';
import Chat from './chat';
import heart from "./images/heart-solid.png"
import cross from "./images/times-solid.svg";

function Matches() { 
  console.log("meet:matches");//for testing only

  //useEffect() will be used to call fetchUserDetails() when the component mounts. 
  //The [] argument tells useEffect() to run when the component mounts. 
  useEffect (() => {
    fetchUserDetails();
  }, []);

  var [users, setUsers] = useState([]);

  var [currentMatch, setCurrentMatch] = useState({});

  //Fetch user details and photo filenames. Store in separate object for each user:
  const fetchUserDetails = async () => {
    const data = await fetch('http://localhost:3001/getMatchDetails?Username='+ 
      (JSON.parse(localStorage.getItem('userInfo'))).userName);
    const userDetails = await data.json();
    //For each user, fetch the list of photo filenames and store the list as an array
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
    setCurrentMatch(userDetails[0]);
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

  //Show the user's next image upon clicking the current image:
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
    
    //Return if user has not entered a birhtday. 
    if(!birthDay)
      return;

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

  //Destroy a match upon clicking the X button:
  function destroyMatch(likee) {
    const liker = (JSON.parse(localStorage.getItem('userInfo'))).userName;

    const match = {
      Liker: liker,
      Likee: likee
    }

    const requestOptions = {
      method: 'post',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(match)
  }
  
  fetch('http://localhost:3001/destroyMatch', requestOptions)
    .then(res => {return res.json()})
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    //Remove the match from the current state and remount the component
    //NOTE: the match is removed but the component doesn't re-mount
    //when setUsers is called. Need to look into this further. 
    var temp = users;
    for(var i = 0; i < temp.length; i++) {
      if(temp[i].Username === likee)
        temp.splice(i,1);
        break;
    }
    setUsers(temp);
  }
  
  if(users.length > 0){
  return (
    <div>
      <div className="yourMatches">
      <h1>Your Matches</h1>
        <div className="yourMatchesInnerContainer">
          {users.map((user,index) => (<img key={user.Username} className="matchesPic" src={generateLinkToMainPhoto(user.Username)} alt="Profile" onClick={() => setCurrentMatch(users[index])} /> ))}
        </div>
      </div>
      <Chat matchUserName={currentMatch.Username}/> 
      <div className="card">
        <div className="newsFeedpicContainer">
          <img className="newsfeedpic" id={`main-pic-${currentMatch.Username}`} src={generateLinkToMainPhoto(currentMatch.Username)} 
          alt="Profile" onClick={() => showNextImage(currentMatch.Username)} />
        </div>
        <h1 id="firstName">{currentMatch.First_name}</h1>
        <div className="profilecontent">
          <p>Age:</p><span>{getAge(currentMatch.Birthdate)}</span>
          <p>Sex:</p><span>{currentMatch.Sex} </span>
          <p>Weight(lbs):</p><span>{currentMatch.Weight}</span>
          <p>Breed:</p>  <span>{currentMatch.Breed}</span><br />
          <div id="bio">{currentMatch.Bio}</div>
          <div className="reactions">
            <img src={heart} height="42px" style={{padding:"0px 66px 0 0"}} alt="Heart"/>
            <img src={cross} height="48px" onClick={() => destroyMatch(currentMatch.Username)} alt="X"/>
          </div>
        </div>
      </div>
    </div>
  );
  }
  else {
    return(
    <div>
    <div className="yourMatches">
    <h1>Your Matches</h1>
      <div className="yourMatchesInnerContainer">
      </div>
    </div>
    <Chat />
    </div>
    );
  }
}
export default Matches;