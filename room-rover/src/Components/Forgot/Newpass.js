import { Link } from "react-router-dom";
import "./Newpass.css";

export default function Newpass() {
  return (
    <>
      <div className="main-container">
        <div className="main-content">
          <div className="signup">
            <div className="image" id="svgimg"></div>
            <h4>Reset Your Password</h4> <br />
            <h6>
              Enter the new password to reset the password of your account
            </h6>
            <div className="new-pass">
              <h5>Enter New Password</h5>
              <input type="text" className="new-pass-input" />

              <h5>Confirm-Password</h5>
              <input type="text" className="new-pass-input-2" />

              <button class="continue-new-password">Continue</button>
            </div>
            <p>
              Don't have an account?{" "}
              <span class="sign-up">
                <Link to="/Signup">Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
