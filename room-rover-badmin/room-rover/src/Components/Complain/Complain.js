import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Complain.css";

const Complain = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:4000/complaints", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setComplaints(response.data);
        setLoading(false);
        setStatus(response.data.length);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleResolve = async (id) => {
    try {
      // Update the complaint status to "resolved" in the backend
      await axios.put(`http://localhost:4000/complaints/${id}/resolve`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Update the UI or fetch complaints again after resolving
      window.location.reload();
    } catch (error) {
      console.error("Error resolving complaint:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete the complaint from the backend
      await axios.delete(`http://localhost:4000/complaints/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Update the UI or fetch complaints again after deleting
      window.location.reload();
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      <div className="dashboard">
        <legend>Dashboard</legend>
        <hr className="lakeer lakeer-media" />
        <div className="headinv">
          <p className="total-users " id="book-total-user">
            Total Complains: {status}
          </p>
        </div>
      </div>{" "}
      <br />
      <br />
      <br />
      <br />
      <div className="complaints-container">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className={`complaint-box ${
              complaint.status === "pending"
                ? "pending"
                : complaint.status === "resolved"
                ? "resolved"
                : ""
            }`}
          >
            <h3>{complaint.heading}</h3>
            <p>{complaint.description}</p>
            <p>Against Type: {complaint.againstType}</p>
            <p>Against ID: {complaint.againstId}</p>
            <p>
              Status:{" "}
              <span className="status-complain">{complaint.status}</span>
            </p>
            <div className="button-container">
              {complaint.status !== "resolved" && (
                <button
                  className="delete-user-btn"
                  onClick={() => handleResolve(complaint._id)}
                >
                  Resolve
                </button>
              )}
              <button
                className="view-posts-btn"
                onClick={() => handleDelete(complaint._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complain;
