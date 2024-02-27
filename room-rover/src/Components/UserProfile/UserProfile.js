import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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

  const handleInputChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const updateUserProfile = await axios.put(
        "http://localhost:4000/updateProfile",
        userProfile,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = updateUserProfile.data;
      setSubmitMessage(responseData.message);
         setShowAlert(true);
     
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error updating user profile", error);
    }
  };

  return (
    <div>
      {userProfile ? (
        <div className="profile-container">
          <div className="profile-header">
            <img src="" alt="" />
            <h2>
              {userProfile.name} {userProfile.lname}
            </h2>
          </div>
          <div className="profile-content">
            <div className="user-details">User Profile</div>
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              value={userProfile.name}
              onChange={handleInputChange}
            />{" "}
            <br />
            <br />
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              value={userProfile.lname}
              onChange={handleInputChange}
            />{" "}
            <br />
            <br />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={userProfile.email}
              // onChange={handleInputChange}
            />{" "}
            <br />
            <br />
            <label htmlFor="number">Number</label>
            <input
              type="Number"
              id="number"
              value={userProfile.number}
              onChange={handleInputChange}
            />{" "}
            <br />
            <br />
            <label htmlFor="Password">Password</label>
            <input
              type="Password"
              id="Password"
              value={userProfile.password}
              onChange={handleInputChange}
            />{" "}
            <br />
            <br /> <br />
            <div className="gender">
              <label htmlFor="">Gender</label>
              <label htmlFor="male" className="label-gender">
                Male
              </label>
              <input
                type="radio"
                id="male"
                value="male"
                checked={userProfile.gender === "male"}
                onChange={handleInputChange}
              />
              <br />
              <label htmlFor="female" className="label-gender">
                Female
              </label>
              <input
                type="radio"
                id="female"
                value="female"
                checked={userProfile.gender === "female"}
                onChange={handleInputChange}
              />{" "}
              <br />
            </div>
            <button
              className="btn btn-primary btn-profile"
              onClick={handleSubmit}
            >
              Submit changes
            </button>{" "}
            <br />
            {/* {submitMessage && <p>{submitMessage}</p>} */}
            {showAlert && (
              <div className="alert-container">
                <div className="alert-message">
                  <Alert
                    icon={<CheckIcon fontSize="inherit" />}
                    severity="success"
                  >
                    <strong>{submitMessage}</strong>
                  </Alert>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default UserProfile;
