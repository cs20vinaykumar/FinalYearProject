import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Upload from "../Upload/Upload";

export default function Navbar(props) {
  const [activeLink, setActiveLink] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const isLoggedIn = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDrop = () => {
    setIsOpen(false);
  };

  const handleLinkClick = (link) => {
    console.log("Clicked on link:", link);
    setActiveLink(link);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/ ");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div id="header-one">
        <nav-head className={`shadow p-10 mb-7 bg-body-tertiary rounded `}>
          <div className="left-text-2">
            <h3 className="Logo-1">
              {" "}
              <Link to="/" className="Logo-1" onClick={handleLogoClick}>
                {" "}
                ROOM<span className="green">ROVER</span>
              </Link>
            </h3>
          </div>

          <div className="right-text">
            <ul>
              {isLoggedIn && (
                <>
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
                    <Link to="/Dashboard">
                      {" "}
                      <button className="btn btn-success"> Home </button>
                    </Link>
                  </li>

                  <li>
                    <Link to="/Upload">
                      {" "}
                      <button
                        className="btn btn-success btn-post"
                        onClick={() => setButtonPopup(true)}
                      >
                        List a Place
                      </button>{" "}
                    </Link>
                  </li>
                  <li>
                    <div className="dropdown nvbar-drop">
                      <button
                        onClick={toggleDropdown}
                        className="btn btn-primary "
                      >
                        <i class="fa-solid fa-bars"></i>
                      </button>
                      {isOpen && (
                        <ul className="dropdown-list">
                          <li>
                            <Link to="/UserProfile">
                              <button
                                className="btn btn-success buton"
                                onClick={handleDrop}
                              >
                                Profile
                              </button>
                            </Link>
                          </li>
                          <li>
                            <Link to="/Post">
                              <button
                                className="btn btn-success buton"
                                onClick={handleDrop}
                              >
                                My post
                              </button>
                            </Link>
                          </li>

                          <li>
                            <button
                              className="btn btn-primary buton"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </li>
                </>
              )}

              {!isLoggedIn && (
                <>
                  <li>
                    <Link
                      to="/"
                      className={activeLink === "home" ? "active" : "hidden"}
                      onClick={() => handleLinkClick("home")}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={activeLink === "about" ? "active" : "hidden"}
                      onClick={() => handleLinkClick("about")}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Login"
                      className={activeLink === "login" ? "active" : "hidden"}
                      onClick={() => handleLinkClick("login")}
                    >
                      Login{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Signup"
                      className={activeLink === "signup" ? "active" : "hidden"}
                      onClick={() => handleLinkClick("signup")}
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav-head>
      </div>
      <Upload trigger={buttonPopup} setTrigger={setButtonPopup}></Upload>
    </>
  );
}
