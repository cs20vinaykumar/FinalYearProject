import React, { useState } from "react";
import "./Forgot.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target);
    setIsEmailValid(true);
  };

  const handleContinueClick = async () => {
    if (!email) {
      setIsEmailValid(false);
      setMessage("Please fill in the email field");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/sendEmail", {
        email,
      });

      if (
        response.data.message ===
        "Email found. Proceed to the next step for password reset."
      ) {
        setMessage("Email found. OTP sent to your email");
        setTimeout(() => {
          navigate("/Code");
        }, 2000);
      } else {
        setMessage("Email not found.");
      }
    } catch (error) {
      alert("Error verifying email:", error);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="main-content">
          <div className="signup">
            <div className="image" id="svgimg"></div>
            <h4>Forgot Password</h4> <br />
            <h6>
              Enter the email address associated with your account and we'll
              send you a code to reset your password
            </h6>
            <div className="email">
              <h5>Email</h5>
              <input
                type="text"
                className={`email-input ${!isEmailValid ? "invalid" : ""}`}
                value={email}
                onChange={handleEmailChange}
              />
              {/* <Link to="/Code" className="continue-link"> */}
              <button
                class="continue-forgot-password"
                onClick={handleContinueClick}
              >
                {" "}
                Continue
              </button>
              {/* </Link> */}
              <p className="tomato-red">{message}</p>
            </div>
            <p>
              Don't have an account?{" "}
              <span class="sign-up">
                <Link to="/Signup">Sign up</Link>{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

