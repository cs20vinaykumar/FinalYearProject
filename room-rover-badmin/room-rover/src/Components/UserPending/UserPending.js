// UserPending.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserPending.css";

function UserPending() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rejectMessages, setRejectMessages] = useState({});
  const [showImagesMap, setShowImagesMap] = useState({}); // State to track image visibility for each user

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/Signup/pending-users");
      setPendingUsers(response.data);
      setLength(response.data.length);
      setLoading(false);
      // Initialize the showImagesMap with default visibility as false for each user
      setShowImagesMap(Object.fromEntries(response.data.map(user => [user._id, false])));
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const toggleImageVisibility = (userId) => {
    setShowImagesMap((prevMap) => ({
      ...prevMap,
      [userId]: !prevMap[userId], // Toggle image visibility for the clicked user
    }));
  };

  const handleApproveUser = async (userId) => {
    try {
      await axios.put(`http://localhost:4000/Signup/approve-user/${userId}`);
      setPendingUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      setLength((prevLength) => prevLength - 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectUser = async (userId, message) => {
    try {
      await axios.put(`http://localhost:4000/Signup/reject-user/${userId}`, {
        rejectMessage: message,
      });
      setPendingUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      setLength((prevLength) => prevLength - 1);
      setRejectMessages((prevMessages) => ({
        ...prevMessages,
        [userId]: message,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const confirmRejectUser = (userId) => {
    const message = prompt("Enter reject message:");
    if (message !== null) {
      handleRejectUser(userId, message);
    }
  };

  return (
    <div>
      <br />
      <div>
        <div className="dashboard">
          <legend>Dashboard</legend>
          <hr className="lakeer lakeer-media" />
          <div className="headinv">
            <p className="total-users" id="book-total-user">
              Total Pending Request: {length}
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="user-box">
            {pendingUsers.map((user) => (
              <div className="user-row" key={user._id}>
                <div>
                  <strong>ID:</strong> {user._id}
                </div>
                <div>
                  <strong>Name:</strong> {user.name}
                </div>
                <div>
                  <strong>Email:</strong> {user.email}
                </div>
                <div>
                  <strong>Phone Number:</strong> +92-{user.number}
                </div>
                <div>
                  <strong>CNIC:</strong> {user.cnic}
                </div>
                <div>
                  <strong>Gender:</strong> {user.gender}
                </div>
                <div>
                  <strong>User Type:</strong> {user.userType}
                </div>
                <div>
                  <strong>CNIC Photos:</strong>
                  <button onClick={() => toggleImageVisibility(user._id)}>
                    {showImagesMap[user._id] ? "Hide Images" : "Show Images"}
                  </button>
                  {showImagesMap[user._id] && (
                    <div className="cnic-photos-container">
                      {user?.file &&
                        user?.file.map((photo, index) => (
                          <img
                            key={index}
                            src={`http://localhost:4000/assets/${photo}`}
                            alt={`CNIC ${index}`}
                            className="cnic-photo"
                            onClick={() => window.open(`http://localhost:4000/assets/${photo}`, "_blank")}
                          />
                        ))}
                    </div>
                  )}
                </div>
                <div className="button-container">
                  <button onClick={() => handleApproveUser(user._id)}>Approve</button>
                 
                  <button className="delete-user-btn" onClick={() => confirmRejectUser(user._id)}>
                    Reject
                  </button>
                </div>
                {rejectMessages[user._id] && (
                  <div>
                    <strong>Reject Reason:</strong> {rejectMessages[user._id]}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPending;
