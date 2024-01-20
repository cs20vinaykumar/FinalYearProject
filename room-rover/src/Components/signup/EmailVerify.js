import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Code() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(false);

  const navigate = useNavigate();

  const handleVerification = async () => {
    try {
      const response = await fetch("http://localhost:4000/EmailVerify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enteredOtp: otp,
        }),
      });

      const data = await response.json();

      console.log("API RESponse ", data);

      if (data.success) {
        setMessage("OTP matched successfully");
        setTimeout(() => {
          navigate("/Login");
        }, 3000);
      } else {
        setMessage(data.message || "Invalid or expired OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage(
        "An error occurred while verifying the OTP. Please try again."
      );
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
              Enter the code sent to your email address to create
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
