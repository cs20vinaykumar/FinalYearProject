import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signup", user);
      setMessage(response.data.message);
      if (response.data.message === "OTP Sent TO Your Email") {
        setTimeout(() => {
          navigate("/email-verify");
        }, 2000);
      }
    } catch (error) {
      console.error(error.message || error.response.data);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="main-container vh-100 gradient-custom">
      <div className="main-content">
        <div className="signup"> <br /><br />
          <h4>Create Account</h4> <br /><br />
          <form action="" className="form-class">
          <div className="form-group">
              <label htmlFor="name" className="labels">
                Full Name:
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                id="name"
                className="inputs"
                placeholder="Enter Your full Name"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="labels">
                Email Id:
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                id="email"
                className="inputs"
                placeholder="Enter Your email Id"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="number" className="labels">
                Phone No:
              </label>
              <input
                type="number"
                name="number"
                value={user.number}
                id="number"
                className="inputs"
                placeholder="Enter Your Phone Number"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pass" className="labels">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                id="pass"
                className="inputs"
                placeholder="Enter Your Password"
                onChange={handleChange}
              />
            </div>
          </form>
          <p className="tomato-red">{message}</p>
          <button
            className="btn btn-primary my-3 btn"
            style={{ background: "#8f2c24" }}
            onClick={register}
          >
            Register
          </button>
          <p id="para-login" className="my-3">
            Already have an account ? <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
