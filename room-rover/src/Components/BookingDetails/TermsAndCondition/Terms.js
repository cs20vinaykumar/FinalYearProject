import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Terms.css";

const Terms = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgreeChange = (event) => {
    setAgreed(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (agreed) {
      navigate("/payment");
    } else {
      alert("Please agree to the terms and conditions");
    }
  };

  return (
    <div className="terms-and-conditions">
      <h2>Terms and Conditions</h2>
      <form onSubmit={handleSubmit}>
        <div className="terms">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
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
  );
};

export default Terms;
