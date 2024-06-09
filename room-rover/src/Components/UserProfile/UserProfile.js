import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/updateProfile",
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
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New password and confirm new password do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:4000/updateProfile/changePassword",
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
      alert(response.data.message);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error updating password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-one vh-100 gradient-custom">
      <h2>User Profile</h2>
      {userProfile && (
        <div>
          <div className="form-group-pro">
            <label>Name:</label>
            <input type="text" value={userProfile.name} disabled />
          </div>
          <div className="form-group-pro">
            <label>Email:</label>
            <input type="email" value={userProfile.email} disabled />
          </div>
          <div className="form-group-pro">
            <label>Number:</label>
            <input type="text" value={userProfile.number} disabled />
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
            <button onClick={handleChangePassword} disabled={loading}>
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
