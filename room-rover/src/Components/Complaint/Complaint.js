import React, { useState } from "react";
import "./Complaint.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function Complaint() {
  const { productId } = useParams();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [againstType, setAgainstType] = useState("user"); // Assuming default is user
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      await axios.post(
        `http://localhost:4000/complaints/${productId}`,
        {
          heading,
          description,
          againstType,
        },
        { headers }
      );
      alert("Complaint submitted successfully!");
      setSubmitted(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again later.");
    }
  };

  return (
    <>
      <div className="container-com">
        <h2>Submit Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group-vin">
            <label className="lables-complain" htmlFor="heading">Heading:</label>
            <input
              type="text"
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              required
              className="input-field-com"
            />
          </div> <br />
          <div className="form-group-vin">
            <label className="lables-complain" htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="input-field-com"
            />
          </div>
          <div className="form-group-vin">
            <label className="lables-complain" htmlFor="againstType">Against:</label>
            <select
              id="againstType"
              value={againstType}
              onChange={(e) => setAgainstType(e.target.value)}
              className="Complain-feild"
            >
              <option value="user">User</option>
              <option value="property">Property</option>
            </select>
          </div>
          <br />
          <button type="submit">Submit</button> <br /> <br />
          {submitted && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="info">
              Your complaint has been submitted and will be verified by an
              admin.
            </Alert>
          )}
        </form>
      </div>
    </>
  );
}
