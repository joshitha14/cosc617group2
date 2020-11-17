import React from "react";
import './App.css';
import logo from "./images/logo_white.png";


function Signup (){
    return (
        <div>
            <div className="signupform">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <h1>Get Started</h1> <br />
                <p>By clicking get Sign Up, you agree to our Terms . Learn how we process your data in our
                Privacy Policy and Cookie Policy.</p> <br/>
                <form>
                    <p>Username</p>
                    <input type="text" name="username"  />
                    <p>Password</p>
                    <input type="text" name="password"  /> <br />
                    <p>Confirm Password</p>
                    <input type="text" name="cpassword"  /> <br />

                    
                    {/* {<p>Date of Birth</p>
                    <input type="date" name="dob" /> <br />

                    <p>Sex</p>
          
                   <select id="custom-select" name="gender">
                       <option value="male">Male</option>
                       <option value="female">Female</option>
                       <option value="other">Other</option>
                       </select>}
                     
                    <p>Weight (In Pound)</p>
                    <input type="text" name="weight" /> <br />

                    <p>Breed</p>
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

                    <p>Zip Code</p>
                    <input type="text" name="zip" /> <br />

                    <p>Preffered Minimum Age?</p>
                    <input type="number" name="age_min_pref"  />

                    <p>Preffered Maximum Age?</p>
                    <input type="number" name="age_max_pref"  />

                    <p>Preffered Sex?</p>
                    <select id="custom-select" name="sex_pref">
                       <option value="male">Male</option>
                       <option value="female">Female</option>
                       <option value="other">Other</option>
                       </select>

                    <p>Preffered Minimum Weight?</p>
                    <input type="text" name="weight_min_pref"  />

                    <p>Preffered Maximum Weight?</p>
                    <input type="text" name="weight_max_pref"  />

                    <p>Preffered Breed?</p>
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

                    <p>Preffered Distance?</p>
                    <input type="text" name="weight_max_pref" />   <br/> */}
                  
                    

                    <input type="submit" name="" value="SIGN UP"/>
                </form>
            </div>

        </div>
    );
}
export default Signup;
