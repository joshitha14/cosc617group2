import React, {useEffect, useState, useContext} from "react";
import {AuthContext} from "./AuthContext";
import './profile.css';


function Profile() { 

  const {authState} = useContext(AuthContext);
  console.log(authState.userInfo.userName);
  //useEffect() will be used to call fetchUserDetails() when the component mounts. 
  //The [] argument tells useEffect() to run when the component mounts. 
  useEffect (() => {
    fetchUserDetails();
  }, []);

  var [users, setUsers] = useState([]);

  var [currentMatch, setCurrentMatch] = useState({});

  //Fetch user details and photo ID#s. Store in separate object for each user:
  const fetchUserDetails = async () => {
    const data = await fetch(`http://localhost:3001/user_details?Username=${authState.userInfo.userName}`);
    const userDetails = await data.json();
    //For each user, fetch the list of image filenames and store the list as an array
    //in the object for that user.
    for(var user of userDetails) {
      const data = await fetch(`http://localhost:3001/photos?Username=${authState.userInfo.userName}`);
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
      <form>
        <div className="formColumn">
          <h1>Basic Information</h1>
          <label>First name</label>
          <input type="text" name="name" /> <br />
          <label>Date of Birth</label>
          <input type="date" name="dob" /> <br />
          <label>Sex</label>
          <select name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
          </select> <br />
          <label>Weight (lbs)</label>
          <input type="text" name="weight" /> <br />
          <label>Breed</label>
          <select name="breed">
            <option value="selectnone">Select</option>
            <option value="germanshepherd">German Shepherd</option>
            <option value="bulldog">Bulldog</option>
            <option value="poodle">Poodle</option>
            <option value="labrador">Labrador</option>
            <option value="beagle">Beagle</option>
            <option value="dachshund">Dachshund</option>
            <option value="husky">Husky</option>
            <option value="chihuahua">Chihuahua</option>
            <option value="maltese">Maltese</option>
            <option value="pomeranien">Pomeranien</option>
            <option value="greyhaund">Greyhaund</option>
            <option value="pembroke">Pembroke</option>
            <option value="dobermann">Dobermann</option>
            <option value="greatdane">Great Dane</option>
            <option value="bichon">Bichon Frise</option>
          </select> <br />
          <label>Zip</label>
          <input type="text" name="zip" /> <br />
          <textarea name="bio" rows="6"cols="25" placeholder="Describe yourself..."></textarea>
        </div>
        <div className="formColumn">
          <h1>Preferences</h1>
          <label>Min. Age</label>
          <input type="number" name="age_min_pref" placeholder ="years" /> <br />
          <label>Max. Age</label>
          <input type="number" name="age_max_pref" placeholder="years" /> <br />
          <label>Sex</label>
          <select name="sex_pref">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
          </select> <br />
          <label>Min. Weight</label>
          <input type="text" name="weight_min_pref" placeholder="lbs" /> <br />
          <label>Mex. Weight</label>
          <input type="text" name="weight_max_pref" placeholder="lbs" /><br />
          <label>Breed</label>
          <select name="breed_pref">
              <option value="selectnone">Select</option>
              <option value="germanshepherd">German Shepherd</option>
              <option value="bulldog">Bulldog</option>
              <option value="poodle">Poodle</option>
              <option value="labrador">Labrador</option>
              <option value="beagle">Beagle</option>
              <option value="dachshund">Dachshund</option>
              <option value="husky">Husky</option>
              <option value="chihuahua">Chihuahua</option>
              <option value="maltese">Maltese</option>
              <option value="pomeranien">Pomeranien</option>
              <option value="greyhaund">Greyhaund</option>
              <option value="pembroke">Pembroke</option>
              <option value="dobermann">Dobermann</option>
              <option value="greatdane">Great Dane</option>
              <option value="bichon">Bichon Frise</option>
          </select> <br />
          <label>Distance</label>
          <input type="text" name="weight_max_pref" placeholder="miles"/> <br />
          <input type="submit" value="SAVE" className="save-button" />
        </div>
      </form>
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
          <p>Breed:</p>  <span>{currentMatch.Breed}</span> <br />
          <div id="bio">{currentMatch.Bio}</div>
        </div>
      </div>
    </div>
  );

}
export default Profile;