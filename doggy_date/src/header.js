import React from "react";
import './App.css';
import header from "./images/bg3.jpg";
import Login from "./login.js";

function Header() {
    return (
        <div>
            <Login />
            <main>
                <section className="presentation">
                    <div className="mainheading">
                        <h1>THE WORLD'S FIRST DATING WEBSITE FOR YOUR DOG </h1>
                        <p> <b>Meet local dogs and make a playdate for your pup!</b> </p>
                        {/* <div className="cta">
                            <button className="learnmore"> Learn More </button>
                        </div> */}
                    </div>
                    <div className="imagebanner">
                        <img src={header} alt="bannerimage" />
                    </div>
                </section>
            </main>
        </div>
    );
}
export default Header;