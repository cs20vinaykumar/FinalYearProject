import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState(null);
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
    <div id="header-one">
      <nav className="shadow p-10 mb-7 bg-body-tertiary rounded">
        <div className="left-text-2">
          <h3 className="Logo-1">
            <Link to="/" className="Logo-1">
              ROOM
              <span onClick={handleLogoClick} className="green">
                ROVER (Admin){" "}
              </span>
            </Link>
          </h3>
        </div>

        <div className="right-text">
          <ul id="sidemenu">
            {isLoggedIn && (
              <>
                {" "}
                <br />
                <li>
                  <Link to="/Dashboard" onClick={() => handleLinkClick("Home")}>
                    {" "}
                    <button className="btn btn-success btn-media-login">
                      {" "}
                      Home{" "}
                    </button>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/UserList"
                    onClick={() => handleLinkClick("List a Place")}
                  >
                    {" "}
                    <button className="btn btn-success btn-post">
                      User List
                    </button>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/Bookings">
                    <button className="btn btn-success">Bookings</button>

                    {/* <i class="fa-solid fa-cart-shopping"></i> */}
                  </Link>
                </li>
                <li>
                  <div className="dropdown nvbar-drop">
                    <button
                      onClick={toggleDropdown}
                      className="btn btn-primary "
                    >
                      <i className="fa-solid fa fa-user"></i>
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
            {/* <i className="fas fa-times" onClick={closeMenu}></i> */}
          </ul>
          {/* <i className="fas fa-bars openbtn" onClick={openMenu}></i> */}
        </div>
      </nav>
    </div>
  );
}
