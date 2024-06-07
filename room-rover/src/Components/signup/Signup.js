import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    gender: "",
    userType: "",
    // cnic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    if (name === "name") {
      setMessage("Please enter your name exactly as it appears on your CNIC.");
    } else {
      setMessage("");
    }

    // if (name === "cnic" && value.length !== 13) {
    //   setMessage("CNIC should be exactly 13 digits long.");
    // }
  };

  const handleFileChange = (event) => {
    const newFiles = event.target.files;
    setFile([...file, ...newFiles]);
  };

  // const validateCNIC = (cnic) => {
  //   return /^\d{13}$/.test(cnic);
  // };

  const register = async () => {
    const { name, email, number, password, gender, userType } = user;

    if (
      name &&
      email &&
      number &&
      password &&
      gender &&
      userType &&
      // cnic &&
      file.length > 0
    ) {
      // if (!validateCNIC(cnic)) {
      //   setMessage("Please enter a valid CNIC (13 digits).");
      //   return;
      // }
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("number", number);
        formData.append("password", password);
        formData.append("gender", gender);
        formData.append("userType", userType);
        // formData.append("cnic", cnic);
        for (let i = 0; i < file.length; i++) {
          formData.append("file", file[i]);
        }

        const response = await axios.post(
          "http://localhost:4000/Signup",
          formData
        );
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
            {/* <div className="form-group">
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
                onChange={handleChange}
              />
            </div> */}
            <div className="form-group">
              <label className="labels">User Type:</label>
              <select
                name="userType"
                value={user.userType}
                className="inputs select-one"
                onChange={handleChange}
              >
                <option value="">Select User Type</option>
                <option value="tenant">Tenant</option>
                <option value="owner">Owner</option>
                <option value="both">Both Tenant and Owner</option>
              </select>
            </div>
            <div className="form-group">
              <label className="labels-one">Gender:</label>
              <div className="radio-group">
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                />
                <label htmlFor="female" className="female">
                  Female
                </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group cnic">
              <label htmlFor="cnicPhotos" className="labels">
                CNIC Photos:
              </label>
              <input
                type="file"
                name="cnicPhotos"
                accept="image/*"
                id="cnicPhotos"
                className="inputs"
                multiple
                onChange={handleFileChange}
              />
            </div>
            {/* {file.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))} */}
          </form>
          <p className="tomato-red">{message}</p>
          <button
            className="btn btn-primary  btn"
            id="btn-top"
            style={{ background: "#8f2c24" }}
            onClick={register}
          >
            Register
          </button>

          <p id="para-login" className="my-3">
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
