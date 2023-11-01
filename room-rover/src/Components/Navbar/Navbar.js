import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [activeLink, setActiveLink] = useState(null);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <>
      <div id="header-one">
        <nav-head className={`shadow p-10 mb-7 bg-body-tertiary rounded `}>
          <div className="left-text-2">
            <h3 className="Logo-1"> <Link to="/" className="Logo-1" >  ROOM<span className="green">ROVER</span></Link>
             
            </h3>
          </div>
          <div className="right-text">
             <ul>
              





              <li>
                <Link to="/" className={activeLink === 'home' ? 'active' : ''}
            onClick={() => handleLinkClick('home')}
                 >Home</Link>
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
                <Link to="/Login" className={activeLink === 'login' ? 'active' : ''}
            onClick={() => handleLinkClick('login')}>Login</Link>
              </li>
              <li>
                <Link to="/Signup"  className={activeLink === 'signup' ? 'active' : ''}
            onClick={() => handleLinkClick('signup')}>Signup</Link>
              </li>
              {/* <li>
                <Link to="/Dashboard">Dashboard</Link>
              </li> */}
            </ul> 
          </div>
        </nav-head>
      </div>
    </>
  );
}
