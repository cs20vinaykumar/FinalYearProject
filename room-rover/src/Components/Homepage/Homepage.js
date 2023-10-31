import React, { useEffect } from "react";
import Typed from "typed.js";
import "./Homepage.css";

export default function Homepage() {
  useEffect(() => {
    let typed = new Typed("#element", {
      strings: [
        "Welcome at the RoomRover",
        "Find home together",
        "Find Your Ideal room for rent.",
      ],
      typeSpeed: 50,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className="Main">
        <section className="firstsection">
          <div className="leftsection">
            Rooms for <span className="purple"> rent</span> <br />
            {/* <div>and I am a passionate</div> */}
            <span id="element"></span> <br /> <br />
            <div className="search-bar">
              <i className="fa-solid fa-location-dot fa-2xs icon"></i>
              <input
                type="text"
                name="eingabe"
                className="input-text searchbar"
                placeholder="Enter City Name"
              />
              <i className="fa-solid fa-arrow-right fa-2xs icon2"></i>
            </div>
          </div>

          <div className="rightsection">
            <img src="" alt="" />
          </div>
        </section>

        {/* ------------------2nd paraghraoh--------------  */}

        {
          <div id="Find">
            <h2 className="subtitle">
              {" "}
              <span id="element">Looking for a tenant or a roommate</span>
            </h2>
            <div className="secondsection">
              <div className="box-left midDiv">
                <button className=" btn btn-dark btnB" > + Find a Place</button>
              </div>
              <div className="box-right midDiv">
                <button className=" btn btn-dark btnB"> + List a Place</button>
              </div>
            </div>
          </div>
        }
        {/* ------------------3rd paragraph--------------  */}

        <div id="Cities">
          <h2 className="subtitle">
            <span id="element"> Popular cities in pakistan</span>
          </h2>
          <div className="container">
            <div className="cities-list ">
              <div className="media-1 midDiv">
                <button className=" btn btn-dark btnB btnc"> Karachi </button>{" "}
              </div>
              <div className="media-2 midDiv">
                <button className=" btn btn-dark btnB btnc"> Hyderabad </button>
              </div>
              <div className="media-3 midDiv">
                <button className=" btn btn-dark btnB btnc"> Sukkur </button>
              </div>
              <div className="media-4 midDiv">
                <button className=" btn btn-dark btnB btnc"> Lahore </button>
              </div>
              <div className="media-5 midDiv">
                <button className=" btn btn-dark btnB btnc"> Multan </button>
              </div>
              <div className="media-6 midDiv">
                <button className=" btn btn-dark btnB btnc">
                  {" "}
                  Rawalpindi{" "}
                </button>
              </div>
              <div className="media-7 midDiv">
                <button className=" btn btn-dark btnB btnc">Islamabad </button>
              </div>
              <div className="media-8 midDiv">
                <button className=" btn btn-dark btnB btnc"> Faislabad </button>
              </div>
              <div className="media-9 midDiv">
                <button className=" btn btn-dark btnB btnc"> Jamshoro </button>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------4th paragraph--------------  */}

        <footer>
          <div id="footer">
            <div className="class1 class-same">Room<span className="green-1">Rover</span></div>
            <div className="class2 class-same">Resources</div>
            <div className="class3 class-same">Useful Links</div>
            <div className="class4 class-same">News Letter</div>
          </div>
        </footer>
      </div>
    </>
  );
}
