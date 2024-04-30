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
    gender: "",
    userType: "",
    cnic: "",
  });

  const hanldechange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    // Show validation message when full name is changed
    if (name === "name") {
      setMessage("Please enter your name exactly as it appears on your CNIC.");
    } else {
      setMessage("");
    }

    // Show validation message only when CNIC is not 13 digits long
    if (name === "cnic" && value.length !== 13) {
      setMessage("CNIC should be exactly 13 digits long.");
    }
  };

  const validateCNIC = (cnic) => {
    return /^\d{13}$/.test(cnic);
  };

  const register = async () => {
    const { name, email, number, password, gender, userType, cnic } = user;

    if (name && email && number && password && gender && userType && cnic) {
      if (!validateCNIC(cnic)) {
        setMessage("Please enter a valid CNIC (13 digits).");
        return;
      }
      try {
        const response = await axios.post("http://localhost:4000/Signup", user);
        setMessage(response.data.message);
        if (response.data.message === "OTP Sent TO Your Email") {
          setTimeout(() => {
            navigate("/EmailVerify");
          }, 2000);
        }
      } catch (error) {
        console.error(error.message || error.response.data);
        setMessage("An error occurred. Please try again later.");
      }
    } else {
      setMessage("Please fill in all the required fields");
    }
  };

  return (
    <div className="main-container vh-100 gradient-custom">
      <div className="main-content">
        <div className="signup">
          <h4>Create Account</h4>
          <form action="" className="form-class">
            <div className="form-group">
              <label htmlFor="name" className="labels">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                id="name"
                className="inputs"
                placeholder="Enter Your Full Name"
                onChange={hanldechange}
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
                onChange={hanldechange}
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
                onChange={hanldechange}
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
                onChange={hanldechange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cnic" className="labels">
                CNIC:
              </label>
              <input
                type="text"
                name="cnic"
                value={user.cnic}
                id="cnic"
                className={"inputs" + (message ? " invalid" : "")}
                placeholder="Enter Your CNIC"
                onChange={hanldechange}
              />
            </div>
            <div className="form-group">
              <label className="labels">User Type:</label>
              <select
                name="userType"
                value={user.userType}
                className="inputs"
                onChange={hanldechange}
              >
                <option value="">Select User Type</option>
                <option value="tenant">Tenant</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <div className="form-group">
              <label className="labels">Gender:</label>
              <div className="radio-group">
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={hanldechange}
                />
                <label htmlFor="female" className="female">
                  Female
                </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={hanldechange}
                />
              </div>
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
