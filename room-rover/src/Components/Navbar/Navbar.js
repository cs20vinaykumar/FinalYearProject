import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    console.log("Clicked on link:", link);
    setActiveLink(link);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    // Implement the logout process here, e.g., clear session/token

    // After logout, redirect the user to the login page
    navigate("/");
  };

  return (
    <>
      <div id="header-one">
        <nav-head className={`shadow p-10 mb-7 bg-body-tertiary rounded `}>
          <div className="left-text-2">
            <h3 className="Logo-1">
              {" "}
              <Link to="/" className="Logo-1">
                {" "}
                ROOM<span className="green">ROVER</span>
              </Link>
            </h3>
          </div>
          <div className="right-text">
            <ul>
              <li>
                <Link
                  to="/"
                  className={activeLink === "home" ? "active" : ""}
                  onClick={() => handleLinkClick("home")}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className={activeLink === "about" ? "active" : ""}
                  onClick={() => handleLinkClick("about")}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/Login"
                  className={activeLink === "login" ? "active" : ""}
                  onClick={() => handleLinkClick("login")}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/Signup"
                  className={activeLink === "signup" ? "active" : ""}
                  onClick={() => handleLinkClick("signup")}
                >
                  Signup
                </Link>
              </li>

              <li>
                <div className="search-bar">
                  <i className="fa-solid fa-location-dot fa-2xs icon-1"></i>
                  <input
                    type="text"
                    name="eingabe"
                    className="input-text-2 searchbar"
                    placeholder="Enter City Name"
                  />
                  <i className="fa-solid fa-arrow-right fa-2xs icon2-2"></i>
                </div>
              </li>

              <li>
                <Link to="/Upload">
                  {" "}
                  <button className="btn btn-success btn-post">
                    List aPlace
                  </button>{" "}
                </Link>
              </li>

              <li>
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav-head>
      </div>
    </>
  );
}
