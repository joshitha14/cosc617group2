import React from "react";
import './App.css';
import header from "./images/bg.jpg";


function Header() {
    return (
        <div>
            <main>
                <section className="presentation">
                    <div className="mainheading">
                        <h1>THE WORLD'S FIRST DATING WEBSITE FOR YOUR DOG </h1>
                        <p> <b>Start finding a friend for your dog. Or a partner?</b> </p>
                        <p>Lorem Ipsum another headline title goes here </p>
                        <div className="cta">
                            <button className="learnmore"> Learn More </button>

                        </div>
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