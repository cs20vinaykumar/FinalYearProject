import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);
  const [password, setPassword] = useState(true);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const hanldechange = (e) => {
    console.log(e.target);
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
    }
  };
  
 

  const handleClick = () => {
    setPassword(!password);
  };

  return (
    <>
      <div className="main-container">
        <div className="main-content">
          <div className="signup">
            <div className="image" id="svgimg"></div>
            <h4>Login</h4> <br />
            <form action="" className="form-class">
              <div className="form-group ">
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
                  onChange={hanldechange}
                  required
                />
              </div>

              <div className="form-group ">
                <label htmlFor="password" className="labels">
                  Password
                </label>
                <input
                  type={password ? "password" : "text"}
                  name="password"
                  id="password"
                  value={user.password}
                  className="inputs "
                  placeholder="Enter your password"
                  onChange={hanldechange}
                  required
                />

                <i class="fa-solid fa-eye icon3" onClick={handleClick}></i>
              </div>

              <div className="form-group passwords">
                <div className="labels rember">
                  Rember me ? <input type="checkbox" className="inpus" />{" "}
                </div>
                <div className="forgot">
                  <Link to="/Login/Forgot">Forgot Password ?</Link>
                </div>
              </div>
            </form>
            <br />
            <button className="btn btn-primary" onClick={login}>
              Login
            </button>{" "}
            <br />
            <p className="tomato-red">{message}</p>
            <br />
            <p id="para-login " className="my-3 text-color">
              Dont have an account ? <Link to="/Signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
