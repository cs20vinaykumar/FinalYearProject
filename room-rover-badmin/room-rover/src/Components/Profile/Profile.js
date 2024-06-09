import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/ProfileUpdate",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login");
    }
  }, [navigate]);

  const handleChangePassword = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/ProfileUpdate/changePassword",
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setErrorMessage("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      alert(response.data.message); // or you can show a success message in the UI
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      {" "}
      <br />
      <div className="container-one vh-100 gradient-custom">
        <h2>Admin Profile</h2>
        {userProfile && (
          <div>
            <div className="form-group-pro">
              <label>Name:</label>
              <input type="name" value={userProfile.name} disabled />
            </div>
            <div className="form-group-pro">
              <label>Email:</label>
              <input type="email" value={userProfile.email} disabled />
            </div>
            <div className="form-group-pro">
              <label>Number:</label>
              <input type="number" value={userProfile.number} disabled />
            </div>
            <div className="form-group-pro">
              <label>Current Password:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="form-group-pro">
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group-pro">
              <label>Confirm New Password:</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="form-group-pro">
              <button onClick={handleChangePassword}>Change Password</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
