import React, {useEffect, useState} from "react";
import "../css/App.css";
import Menu from "../components/Menu";
import heart from "../images/heart-solid.png"
import cross from "../images/times-solid.svg";

function Meet() { 
  
  //useEffect() will be used to load the user details.
  //The [] argument tells useEffect() to run when the component mounts. 
  useEffect (() => {
    fetchUserDetails();
  }, []);

  var [users, setUsers] = useState([]);

  //Fetch user details and photo ID#s:
  const fetchUserDetails = async () => {
    const data = await fetch('http://localhost:3001/user_details/');
    const userDetails = await data.json();
    //For each user, fetch the list of image filenames and store the list as an array
    //in the object for that user.
    for(var user of userDetails) {
      const data = await fetch(`http://localhost:3001/photos?Username=${user.Username}`);
      const imageFileNames = await data.json();
      user.currentImage = 0; //This stores the index of the image that is currently displayed.
      user.images = []; //This array will store the filenames for the images.
      for(var file of imageFileNames) { 
        user.images.push(file.PhotoID); //Push the filenames for each image into the array. 
      }
    }
    setUsers(userDetails);
  }
  
  // Generate a link to the users main photo:
  function generateLinkToMainPhoto(username) {
    var photoID;
    for(var user of users) {
      if(user.Username === username) {
        photoID = user.images[0];
        break;
      }
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
      user.currentImage++
    //Display the next image. The index of the next image is now the value of the currentImage property:
    document.getElementById(`main-pic-${user.Username}`).src = `./pubImages/${username}/${user.images[user.currentImage]}.jpg`;
  }

  return (
    <div>
      <Menu/>
      {users.map(user => (
        <div className="card" key={user.Username}>
            <img className="cardprofilepic" src={generateLinkToMainPhoto(user.Username)} alt="Profile" />
            <div className="profilecontent">
                <h1>{user.First_name}</h1>
                <p>Age: </p><span>{user.Age}</span>
                <p>Sex: </p><span>{user.Sex} </span>
                <p>Weight(lbs): </p><span>{user.Weight}</span>
                <p>Breed: </p>  <span>{user.Breed}</span>
                <img className="newsfeedpic" id={`main-pic-${user.Username}`} src={generateLinkToMainPhoto(user.Username)} alt="Profile" 
                  onClick={() => showNextImage(user.Username)}/>
                <div className="reactions">
                  <img alt="heart" src={heart} height="64px" style={{padding:"0px 100px 0 0"}}/>
                  <img alt="cross" src={cross} height="72px"/>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}
export default Meet;
