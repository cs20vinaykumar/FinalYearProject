import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);
  const [user, setUser] = useState({
    name: "",
    lname: "",
    email: "",
    number: "",
    password: "",
    gender: "",
  });

  const hanldechange = (e) => {
    // console.log(e.target)
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async () => {
    const { name, lname, email, number, password, gender } = user;

    if (name && lname && email && number && password && gender) {
      try {
        const response = await axios.post("http://localhost:4000/Signup", user);
        setMessage(response.data.message);
        if(response.data.message === "OTP Sent TO Your Email"){
          setTimeout(() => {
            navigate("/EmailVerify");
          }, 2000);
        }else{
          setMessage(response.data.message)
        }
        
      } catch (error) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          console.error(error.message);
        }
      }
    } else {
      setMessage("Please fill in all the required fields");
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="main-content">
          <div className="signup">
            {console.log("user", user)}
            <h4>Create Account</h4> <br />
            <form action="" className="form-class">
              <div className="form-group ">
                <label htmlFor="name" className="labels">
                  First Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  id="name"
                  className="inputs"
                  placeholder="Enter Your First Name"
                  onChange={hanldechange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lname" className="labels">
                  {" "}
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lname"
                  value={user.lname}
                  id="lname"
                  className="inputs"
                  placeholder="Enter Your Last Name"
                  onChange={hanldechange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="labels">
                  {" "}
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
                  {" "}
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
            <button className="btn btn-primary my-3" onClick={register}>
              Register
            </button>
            <p className="tomato-red">{message}</p>
            <p id="para-login " className="my-3">
              Already have an account ? <Link to="/Login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
