import React, {useContext} from "react";
import profilepic from "./images/Dog1/pp.jpeg";
import pic3 from "./images/Dog1/processed2.jpeg";
import pic4 from "./images/Dog1/upload1.jpeg";
import {AuthContext} from "./AuthContext";
import './App.css';




function Profile() {
    const {logout} = useContext(AuthContext);
    return (
        <div>

            <div className="cardprofile">
                <img className="profilepic" src={profilepic} alt="Profile" />
                <div className="profilecontent">
                    <h1>Oscar Black</h1>
                    <em>" I like to chew furniture. I am a big boofy boy with a strong waggy tail." </em> <br/>
                    <p>Age: </p><span>20 </span>
                    <p>Sex: </p><span>Male </span>
                    <p>Weight(lbs): </p><span>62 </span>
                    <p>Breed: </p>  <span>German Shepherd </span>
                </div>
                
                <div className="topnav">
                <h4>Welcome, Oscar Black</h4>
                <h6 onClick={logout}>Signout</h6>
                <h6><i class="fas fa-sign-out-alt"></i></h6>
                </div>
                <img className="imagereelpics" src={profilepic} alt="Profile" id="myimg" />
                <img className="imagereelpics" src={pic3} alt="Profile" />
                <img className="imagereelpics" src={pic4} alt="Profile" />

                </div>
        
                <form className="profile-signup">
                <h1> Basic Information</h1> 
                Name <input type="text" name="name" /> 

                Date of Birth <input type="date" name="dob" />

                Sex <select id="custom-select" name="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select> <br />
                
                   Weight (lbs) 
                <input type="text" name="weight" /> 
                
                    Breed
                <select id="custom-select" name="breed">
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
                </select>
                
                    Zip 
                <input type="text" name="zip" />
               <br/>Bio <br />
                <textarea name="bio" rows="6"cols="25" placeholder="Describe yourself..."></textarea>

                <h1> Preferences</h1> 

                     Min. Age
                <input type="number" name="age_min_pref" placeholder ="years" /> 

                  Max. Age
                <input type="number" name="age_max_pref" placeholder="years" /> 

                Sex
                <select id="custom-select" name="sex_pref">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select> <br/>
                
              Min. Weight
                <input type="text" name="weight_min_pref" placeholder="lbs" /> 
                
              Max. Weight
                <input type="text" name="weight_max_pref" placeholder="lbs" />

                   Breed
                <select id="custom-select" name="breed_pref">
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
                </select>
                 Distance
                <input type="text" name="weight_max_pref" placeholder="miles"/>  <br/>

                <input type="submit" value="SAVE" className="save-btn" />
                </form>
            </div>
    
    );
}
export default Profile;