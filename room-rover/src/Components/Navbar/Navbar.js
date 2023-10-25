import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


export default function Navbar(props) {
  return (
    <>
      <div id="header-one">
        <nav-head className={`shadow p-10 mb-7 bg-body-tertiary rounded `}>
          <div className="left-text-2">
            <h3 className="Logo-1">
              ROOM<span className="green">ROVER</span>
            </h3>
          </div>
          <div className="right-text">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link className="green" to="/Login">Login</Link>
              </li>
              <li>
                <Link to="/Signup">Signup</Link>
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
