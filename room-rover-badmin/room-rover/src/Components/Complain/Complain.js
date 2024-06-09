import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Complain.css";
import { useNavigate } from "react-router-dom";

const Complain = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:4000/complaints", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const complaintsData = response.data;
        setComplaints(complaintsData);
        setLoading(false);
        setStatus(complaintsData.length);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login");
    }
  }, [navigate]);

  useEffect(() => {
    const checkAndUpdateBlockStatus = async (userId) => {
      try {
        const response = await axios.put(
          `http://localhost:4000/complaints/check-block-status/${userId}`,
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.user && response.data.user.blocked) {
          alert(
            `User ${response.data.user.name} has been blocked due to multiple complaints.`
          );
        }
      } catch (error) {
        console.error("Error checking and updating block status:", error);
      }
    };

    if (complaints.length > 0) {
      const usersToCheck = [...new Set(complaints.map((c) => c.againstId))];
      usersToCheck.forEach((userId) => {
        checkAndUpdateBlockStatus(userId);
      });
    }
  }, [complaints]);

  const handleResolve = async (id, againstId) => {
    try {
      const message = prompt("Enter a message for resolution:");
      if (!message) {
        return;
      }

      await axios.put(
        `http://localhost:4000/complaints/${id}/resolve`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedComplaints = complaints.map((complaint) =>
        complaint._id === id
          ? { ...complaint, status: "resolved", resolutionMessage: message }
          : complaint
      );
      setComplaints(updatedComplaints);

      // Check and update the block status of the user
      // eslint-disable-next-line no-undef
      await checkAndUpdateBlockStatus(againstId);

      alert("Complaint resolved successfully!");
    } catch (error) {
      console.error("Error resolving complaint:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/complaints/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint._id !== id)
      );

      alert("Complaint deleted successfully!");
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
            Total Complaints: {status}
          </p>
        </div>
      </div>
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
            {complaint.status === "resolved" && (
              <p>Resolution Message: {complaint.resolutionMessage}</p>
            )}
            <div className="button-container">
              {complaint.status !== "resolved" && (
                <button
                  className="delete-user-btn"
                  onClick={() =>
                    handleResolve(complaint._id, complaint.againstId)
                  }
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
