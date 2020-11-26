import React, {useEffect, useState, useContext} from "react";
import {AuthContext} from "./AuthContext";
import './profile.css';
import PhotoUpload from "./photoUpload";

function Profile() { 

  const {authState} = useContext(AuthContext);
  const [userData, setUserData] = useState({images:[]});
  const [cssClass, setCssClass] = useState({edit:'', save:'hideLink', cancel:'hideLink', disabled: true});

  //useEffect() will be used to call fetchUserDetails() when the component mounts. 
  //The [] argument tells useEffect() to run when the component mounts. 
  useEffect (() => {
    const currentUser = authState.userInfo.userName;
    const fetchUserDetails =  async() => {
      if(authState.userInfo.userName){
       const resData = await fetch(`http://localhost:3001/user_details?Username=${currentUser}`);
       const userDetails = await resData.json();
       const userDetailsObj = userDetails[0];
       if(userDetailsObj.Birthdate) { 
         userDetailsObj.Birthdate = formatDate(userDetailsObj.Birthdate);
        }
       const imgData = await fetch(`http://localhost:3001/photos?Username=${currentUser }`);
       const imageFileNames = await imgData.json();
        var userImages = []; //This array will store the filenames for the userData's images.
        for(var file of imageFileNames) {
          userImages.push(file.PhotoID); //Push the filenames for each image into the array. 
        }
        setUserData({...userDetailsObj, currentImage:0
          , images: userImages});
      }
    }
    fetchUserDetails();
    
  }, [authState]);

  function showNextImage(username) {
    //Increment the value of the currentImage property to reflect the index of the next image. 
    //Loop back to index 0 at the end of the image array:
    if(userData.currentImage === userData.images.length - 1)
      userData.currentImage = 0;
    else
      userData.currentImage++;
    //Display the next image. The index of the next image is now the value of the currentImage property:
    document.getElementById(`main-pic-${username}`).src = `./pubImages/${username}/${userData.images[userData.currentImage]}.jpg`;
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
  }
  
  fetch('http://localhost:3001/user_details', requestOptions)
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data.message);
    })
  }

  function formatDate(ISOdate) {
    const date = new Date(ISOdate);
    let year = date.getFullYear();
    let month = (date.getMonth())+1;
    let dt = date.getDate();
        
      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
    return year+'-' + month + '-'+dt;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div className="formColumn">
          <h1>Basic Information</h1>
          <label>First name</label>
          <input type="text" name="name" 
          value={userData.First_name || ''}
          onChange={(e) => setUserData({ ...userData, First_name: e.target.value })}
          disabled={cssClass.disabled} /> 
          <br />
          <label>Date of Birth</label>
          <input type="date" name="dob" 
          value={userData.Birthdate || ''}
          onChange={(e) => setUserData({ ...userData, Birthdate: e.target.value })}
          disabled={cssClass.disabled} /> 
          <br />
          <label>Sex</label>
          <select name="gender"
          value={userData.Sex || ''}
          onChange={(e) => setUserData({ ...userData, Sex: e.target.value })}
          disabled={cssClass.disabled} >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="X">Other</option>
          </select> <br />
          <label>Weight (lbs)</label>
          <input type="text" name="weight" 
          value={userData.Weight || ''}
          onChange={(e) => setUserData({ ...userData, Weight: e.target.value })}
          disabled={cssClass.disabled} /> 
          <br />
          <label>Breed</label>
          <select name="breed" 
          value={userData.Breed || ''}
          onChange={(e) => setUserData({ ...userData, Breed: e.target.value })}
          disabled={cssClass.disabled} >
              <option value="selectnone">Select</option>
              <option value="Any">Any</option>
              <option value="Australian Shepherd">Australian Shepherd</option>
              <option value="German Shepherd">German Shepherd</option>
              <option value="Bulldog">Bulldog</option>
              <option value="Bull Terrier">Bull Terrier</option>
              <option value="French Bulldog">French Bulldog</option>
              <option value="Poodle">Poodle</option>
              <option value="Labrador">Labrador</option>
              <option value="Beagle">Beagle</option>
              <option value="Dachshund">Dachshund</option>
              <option value="Husky">Husky</option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="Maltese">Maltese</option>
              <option value="Pomeranien">Pomeranien</option>
              <option value="Greyhaund">Greyhaund</option>
              <option value="Pembroke">Pembroke</option>
              <option value="Dobermann">Dobermann</option>
              <option value="Great Dane">Great Dane</option>
              <option value="Bichon Frise">Bichon Frise</option>
          </select> 
          <br />
          <label>Zip</label>
          <input type="text" name="zip" 
          value={userData.Zip_code || ''}
          onChange={(e) => setUserData({ ...userData, Zip_code: e.target.value })}
          disabled={cssClass.disabled} /> 
          <br />
          <PhotoUpload />
          <textarea name="bio" rows="6" cols="25" placeholder="Describe yourself..." 
          value={userData.Bio || ''}
          onChange={(e) => setUserData({ ...userData, Bio: e.target.value })}
          disabled={cssClass.disabled} >
          </textarea>
        </div>
        <div className="formColumn">
          <h1>Preferences</h1>
          <label>Min. Age</label>
          <input type="number" name="age_min_pref" placeholder ="years" 
          value={userData.Age_min_pref || ''}
          onChange={(e) => setUserData({ ...userData, Age_min_pref: e.target.value })}
          disabled={cssClass.disabled} /> 
          <br />
          <label>Max. Age</label>
          <input type="number" name="age_max_pref" placeholder="years" 
          value={userData.Age_max_pref || ''}
          onChange={(e) => setUserData({ ...userData, Age_max_pref: e.target.value })}
          disabled={cssClass.disabled} /> 
          <br />
          <label>Sex</label>
          <select name="sex_pref" 
          value={userData.Sex_pref || ''}
          onChange={(e) => setUserData({ ...userData, Sex_pref: e.target.value })}
          disabled={cssClass.disabled} >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="X">Other</option>
          </select> <br />
          <label>Min. Weight</label>
          <input type="text" name="weight_min_pref" placeholder="lbs" 
          value={userData.Weight_min_pref || ''}
          onChange={(e) => setUserData({ ...userData, Weight_min_pref: e.target.value })}
          disabled={cssClass.disabled} /> 
          <br />
          <label>Max. Weight</label>
          <input type="text" name="weight_max_pref" placeholder="lbs" 
          value={userData.Weight_max_pref || ''}
          onChange={(e) => setUserData({ ...userData, Weight_max_pref: e.target.value })}
          disabled={cssClass.disabled} />
          <br />
          <label>Breed</label>
          <select name="breed_pref" 
          value={userData.Breed_pref || ''}
          onChange={(e) => setUserData({ ...userData, Breed_pref: e.target.value })}
          disabled={cssClass.disabled} >
              <option value="selectnone">Select</option>
              <option value="Any">Any</option>
              <option value="Australian Shepherd">Australian Shepherd</option>
              <option value="German Shepherd">German Shepherd</option>
              <option value="Bulldog">Bulldog</option>
              <option value="Bull Terrier">Bull Terrier</option>
              <option value="French Bulldog">French Bulldog</option>
              <option value="Poodle">Poodle</option>
              <option value="Labrador">Labrador</option>
              <option value="Beagle">Beagle</option>
              <option value="Dachshund">Dachshund</option>
              <option value="Husky">Husky</option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="Maltese">Maltese</option>
              <option value="Pomeranien">Pomeranien</option>
              <option value="Greyhaund">Greyhaund</option>
              <option value="Pembroke">Pembroke</option>
              <option value="Dobermann">Dobermann</option>
              <option value="Great Dane">Great Dane</option>
              <option value="Bichon Frise">Bichon Frise</option>
          </select> <br />
          <label>Distance</label>
          <input type="text" name="weight_max_pref" placeholder="miles" 
          value={userData.Dist_pref || ''}
          onChange={(e) => setUserData({ ...userData, Dist_pref: e.target.value })}
          disabled={cssClass.disabled} /> 
          <br />
          <input type="button" value="EDIT" className={`save-button ${cssClass.edit}`} 
          onClick={() => setCssClass({ ...cssClass, edit: 'hideLink', save:'', cancel:'', disabled:false})} />
          <input type="submit" value="SAVE" className={`save-button ${cssClass.save}`} 
          onClick={() => setCssClass({ ...cssClass, edit: '', save:'hideLink', cancel:'hideLink', disabled:true })} />
          <input type="button" value="CANCEL" className={`save-button ${cssClass.cancel}`} onClick={() => setCssClass({ ...cssClass, edit: '', save:'hideLink', cancel:'hideLink', disabled:true })} />
          
        </div>
      </form>
      <div className="card">
        <div className="newsFeedpicContainer">
          <img className="newsfeedpic" id={`main-pic-${userData.Username}`} src={`./pubImages/${userData.Username}/${userData.images[userData.currentImage]}.jpg`} 
          alt="Profile" onClick={() => showNextImage(userData.Username)} />
        </div>
        <h1 id="firstName">{userData.First_name}</h1>
        <div className="profilecontent">
          <p>Age:</p><span>{getAge(userData.Birthdate)}</span>
          <p>Sex:</p><span>{userData.Sex} </span>
          <p>Weight(lbs):</p><span>{userData.Weight}</span>
          <p>Breed:</p>  <span>{userData.Breed}</span> <br />
          <div id="bio">{userData.Bio}</div>
        </div>
      </div>
    </div>
  );

}
export default Profile;