import React, { useState } from "react";
import "./Code.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";

export default function Code() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(false);

  const navigate = useNavigate();
  const { user } = useAppContext();

  const handleVerification = async () => {
    try {
      const response = await fetch("http://localhost:4000/verifycode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user,
          enteredOtp: otp,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("OTP matched successfully");
        setTimeout(() => {
          navigate("/Newpass");
        }, 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };
  return (
    <>
      <div className="main-container">
        <div className="main-content">
          <div className="signup">
            <div className="image" id="svgimg"></div>
            <h4>Enter the Code</h4> <br />
            <h6>
              Enter the code sent to your email address to reset the password of
              your account
            </h6>
            <div className="code">
              <h5>Code</h5>
              <input
                type="number"
                className="code-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={handleVerification} className="continue-code">
                Continue
              </button>{" "}
              <br />
              <p className="tomato-red">{message}</p>
            </div>
            <p>
              Don't have an account?{" "}
              <span className="sign-up">
                <Link to="/Signup">Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
