import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Upload from "../Upload/Upload";

export default function Navbar(props) {
  const [activeLink, setActiveLink] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const isLoggedIn = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [openHamb, setOpenHamb] = useState(false);

  const openMenu = () => {
    setOpenHamb(true);
  };

  const closeMenu = () => {
    setOpenHamb(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDrop = () => {
    setIsOpen(false);
  };

  const handleLinkClick = (link) => {
    console.log("Clicked on link:", link);
    setActiveLink(link);
    setOpenHamb(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsOpen(false);
    setOpenHamb(false);
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
            <ul id="sidemenu" style={{ right: openHamb ? "5px" : "-405px" }}>
              {isLoggedIn && (
                <>
                  {" "}
                  <br />
                  <li>
                    <Link
                      to="/Dashboard"
                      onClick={() => handleLinkClick("Home")}
                    >
                      {" "}
                      <button className="btn btn-success btn-media-login">
                        {" "}
                        Home{" "}
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Upload"
                      onClick={() => handleLinkClick("List a Place")}
                    >
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
                    <Link
                      to="/Booking"
                      onClick={() => handleLinkClick("My Booking")}
                    >
                      <button className="btn btn-success">My Booking</button>
                    </Link>
                  </li>
                  <li>
                    <div className="dropdown nvbar-drop">
                      <button
                        onClick={toggleDropdown}
                        className="btn btn-primary "
                      >
                        <i class="fa-solid fa fa-user"></i>
                      </button>
                      {isOpen && (
                        <ul className="dropdown-list">
                          <li>
                            <Link
                              to="/UserProfile"
                              onClick={() => handleLinkClick("Profile")}
                            >
                              <button
                                className="btn btn-success buton btn-subdropdown-media"
                                onClick={handleDrop}
                              >
                                Profile
                              </button>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/Post"
                              onClick={() => handleLinkClick("My Post")}
                            >
                              <button
                                className="btn btn-success buton btn-subdropdown-media"
                                onClick={handleDrop}
                              >
                                My post
                              </button>
                            </Link>
                          </li>

                          <li>
                            <button
                              className="btn btn-primary buton btn-subdropdown-media"
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
                  <br />
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
              <i class="fas fa-times" onClick={closeMenu}></i>
            </ul>
            <i class="fas fa-bars openbtn" onClick={openMenu}></i>
          </div>
        </nav-head>
      </div>
      <Upload trigger={buttonPopup} setTrigger={setButtonPopup}></Upload>
    </>
  );
}
