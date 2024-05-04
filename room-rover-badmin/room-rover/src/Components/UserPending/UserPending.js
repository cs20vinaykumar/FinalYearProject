import React, { useState, useEffect } from "react";
import axios from "axios";

function UserPending() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [length, setLength] = useState(0);
  const [rejectMessage, setRejectMessage] = useState(""); // State to store reject message

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/Signup/pending-users"
      );
      setPendingUsers(response.data);
      setLength(response.data.length);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApproveUser = async (userId) => {
    try {
      await axios.put(`http://localhost:4000/Signup/approve-user/${userId}`);
      fetchPendingUsers();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectUser = async (userId) => {
    try {
      await axios.put(`http://localhost:4000/Signup/reject-user/${userId}`, {
        rejectMessage,
      });
      fetchPendingUsers();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const confirmRejectUser = (userId) => {
    const message = prompt("Enter reject message:");
    if (message !== null) {
      setRejectMessage(message);
      handleRejectUser(userId);
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
            <p className="total-users " id="book-total-user">
              Total Pending Request: {length}
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
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
              <div className="button-container">
                <button onClick={() => handleApproveUser(user._id)}>
                  Approve
                </button>
                <button
                  className="delete-user-btn"
                  onClick={() => confirmRejectUser(user._id)}
                >
                  Reject
                </button>
              </div>
              {rejectMessage && (
                <div>
                  <strong>Reject Reason:</strong> {rejectMessage}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default UserPending;
