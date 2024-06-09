import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserBlock.css";
import { useNavigate } from "react-router-dom";

const UserBlock = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Blocked-user", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlockedUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blocked users:", error);
        setIsLoading(false);
      }
    };

    fetchBlockedUsers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login");
    }
  }, [navigate]);

  const handleUnblock = (id) => {
    setSelectedUserId(id);
    setShowConfirmation(true);
  };

  const confirmUnblock = async () => {
    try {
      await axios.put(
        `http://localhost:4000/Blocked-user/${selectedUserId}/unblock`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedUsers = blockedUsers.filter(
        (user) => user._id !== selectedUserId
      );
      setBlockedUsers(updatedUsers);
      setShowConfirmation(false);
      setSelectedUserId(null);
      showSuccessMessage();
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const cancelUnblock = () => {
    setShowConfirmation(false);
    setSelectedUserId(null);
  };

  const showSuccessMessage = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {" "}
      <br />
      <div className="dashboard">
        <legend>Dashboard</legend>
        <hr className="lakeer lakeer-media" />
        <div className="headinv">
          <p className="total-users" id="book-total-user">
            Blocked Users
          </p>
        </div>
      </div>{" "}
      <br /> <br />
      <div className="container">
        {successMessage && (
          <div className="success-message show">
            User unblocked successfully!
          </div>
        )}
        {blockedUsers.length === 0 ? (
          <p className="no-users">No blocked users found.</p>
        ) : (
          <ul className="blocked-users">
            {blockedUsers.map((user) => (
              <li key={user._id} className="blocked-user">
                <div>Name: {user.name}</div>
                <div>Email: {user.email}</div>
                <div>Gender: {user.gender}</div>
                <div>User Type: {user.userType}</div>
                <div>Phone Number: {user.number}</div>
                <div>
                  Blocked:{" "}
                  <span className="blocked-status">
                    {user.blocked ? "No" : "Yes"}
                  </span>
                </div>
                <button onClick={() => handleUnblock(user._id)}>Unblock</button>
              </li>
            ))}
          </ul>
        )}

        {showConfirmation && (
          <div className="confirmation">
            <div className="confirmation-box">
              <p>Are you sure you want to unblock this user?</p>
              <div className="confirmation-buttons">
                <button
                  className="confirmation-button confirm"
                  onClick={confirmUnblock}
                >
                  Yes
                </button>
                <button
                  className="confirmation-button cancel"
                  onClick={cancelUnblock}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserBlock;
