import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); 
  const [passwordVisible, setPasswordVisible] = useState(false); 

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      setMessage(data.message);

      if (data.message === "Login Successful") {
        const token = data.token;
        localStorage.setItem("token", token);

        setTimeout(() => {
          navigate("/Dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred during login. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="main-container vh-100 gradient-custom">
      <div className="main-content">
        <div className="signup">
          <div className="image" id="svgimg"></div>
          <h4>Login</h4> <br />
          <form className="form-class">
            <div className="form-group">
              <label htmlFor="email" className="labels">
                Email Id
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="inputs"
                value={user.email}
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="labels">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                value={user.password}
                className="inputs"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
              <i
                className={`fa-solid fa-eye icon3 ${
                  passwordVisible ? "visible" : ""
                }`}
                onClick={togglePasswordVisibility}
              ></i>{" "}
            </div>
          </form>
          <br />
          <br />
          <button className="btn btn-primary" onClick={login}>
            Login
          </button>
          <br />
          <button className="btn btn-primary">
            <Link to="/Login/Forgot" className="login-forgot">
              Forgot Password?
            </Link>
          </button>
          <br />
          <p className="tomato-red">{message}</p>{" "}
          <br />
          <p id="para-login" className="my-3 text-color">
            Don't have an account? <Link to="/Signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
