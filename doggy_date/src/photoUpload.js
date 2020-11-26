import React, { useState, useEffect, useContext } from 'react';
import './photoUpload.css';
import axios from 'axios';
import {AuthContext} from "./AuthContext";

function PhotoUpload(){
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const {authState} = useContext(AuthContext);
  var username = authState.userInfo.userName;


//Get the last photo name which will be used to generate a name for 
//the new photo:
  useEffect (() => {
    fetchMostRecentPhotoName();
  }, []);

  var [lastPhotoName, setlastPhotoName] = useState('');

  const fetchMostRecentPhotoName = async () => {
    const data = await fetch(`http://localhost:3001/mostRecentPhoto?Username=${username}`);
      const JSONdata = await data.json();
      if(JSONdata.length > 0) {
        var photoName = JSONdata[0].PhotoID;
        setlastPhotoName(photoName);
      }
  }

  //Funciton to geneate a new photo name of the new photo:
  function generateNewPhotoName(previousPhotoName) {

      //Remove user name from file name:
      var tempStr = previousPhotoName.replace(username,"");
      console.log("tempStr: " + tempStr + typeof(tempStr));

      //Extract the numeric substring at the end of the file name:
      var tempStr2 = tempStr.replace(/[^0-9]+/ig,"");
      console.log("tempStr2: " + tempStr2 + typeof(tempStr2));

      //Convert the numeric substring to an int:
      var tempInt = parseInt(tempStr2);
      console.log("tempInt: " + tempInt + typeof(tempInt));

      //Incrment by one:
      tempInt += 1;
      console.log("tempInt + 1: " + tempInt + typeof(tempInt));
  
      //Crete a new file name using the incremented number:
      var newName = `${username}-pic${tempInt}` 

      return(newName);
  }


 
//Retrieve the new photo from the form:
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };


//Send the photo to the server which will redirect it to local file storage. A new file
//will be created if none exists. Send the file name to the database. 
  const onSubmit = async e => {

    //If no file has been uploaded, do nothing: 
    if(file === '')
      return;

    //Generate new photo name:
    var newPhotoName = '';
    if(lastPhotoName != ''){
      console.log(true);
      newPhotoName = generateNewPhotoName(lastPhotoName);
    }
    else {
      console.log(false);
      newPhotoName = `${username}-pic1` 
    }

    //Send image file to local directory
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
   
    try {
      const res = await axios.post(`http://localhost:3001/upload?Username=${username}&FileName=${newPhotoName}.jpg`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

    //setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }

    //Post File name to database:
    const newPhotoDetails = {
      Username: username,
      PhotoID: newPhotoName
    }
    console.log(username);

    const requestOptions = {
      method: 'post',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPhotoDetails)
  }
  
    fetch('http://localhost:3001/newPhotoName', requestOptions)
      .then(res => {return res.json()})
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      //Return the file state variable to '';
      setFile('');
    };

  return (
    <div>
          <label className="photoLabel">Photos: </label>
          <input type="file" onChange={onChange} id="files"/>
          <button onClick={onSubmit} className="savePhoto-button" >Save Photo</button>
    </div>
  )
}

export default PhotoUpload;


