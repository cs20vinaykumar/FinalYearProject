import React, { useState } from "react";
import "./Terms.css";

const Terms = ({ onClose, onAccept }) => {
  const [agreed, setAgreed] = useState(false);

  const handleAgreeChange = (event) => {
    setAgreed(event.target.checked);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (agreed) {
      onAccept();
    } else {
      alert("Please agree to the terms and conditions");
    }
  };

  return (
    <div className="modal-overlay-term">
      <div className="modal-content-term">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="terms-and-conditions">
          <h2>Terms and Conditions</h2>
          <form onSubmit={handleSubmit}>
            <div className="terms">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
                nisi.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
                nisi.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
                nisi.
              </p>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={handleAgreeChange}
              />
              <label htmlFor="agree">
                I have read and agree to the terms and conditions
              </label>
            </div>
            <button type="submit">Proceed</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Terms;
