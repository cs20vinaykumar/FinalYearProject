import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState(null);
  const isLoggedIn = localStorage.getItem("token");

  const handleLinkClick = (link) => {
    console.log("Clicked on link:", link);
    setActiveLink(link);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
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
                  <button
                    className="btn btn-primary buton "
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
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
                    to="/Login"
                    className={activeLink === "login" ? "active" : "hidden"}
                    onClick={() => handleLinkClick("login")}
                  >
                    Login{" "}
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/Signup"
                    className={activeLink === "signup" ? "active" : "hidden"}
                    onClick={() => handleLinkClick("signup")}
                  >
                    Signup
                  </Link>
                </li> */}
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
