import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Newpass.css";


const Newpass = () => {

  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async () => {
    try {
      const response = await fetch("http://localhost:4000/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "vinaychoithani223@gmail.com", // Replace with the actual user's email
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Password reset successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      // Handle error
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="main-content">
          <div className="signup">
            <div className="new-pass">
              <h5>Enter New Password</h5>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="new-pass-input"
              />

              <h5>Confirm Password</h5>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="new-pass-input-2"
              />

              <button
                className="continue-new-password"
                onClick={handlePasswordReset}
              >
                Continue
              </button>
              <br /><br />

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
};

export default Newpass;
