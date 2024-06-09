import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";
import { Link, useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/Signup/true-users"
        );
        setUsers(response.data);
        setTotalUsers(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login");
    }
  }, [navigate]);

  const deleteUser = async (userId) => {
    try {
      // Ask for confirmation before deleting
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );

      if (confirmDelete) {
        // Make a DELETE request to the backend API to block or delete the user
        await axios.delete(`http://localhost:4000/Signup/users/${userId}`);
        alert("User Deleted successfully"); // Show a success message
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later."); // Show an error message
    }
  };

  return (
    <>
      {" "}
      <br />
      <div>
        <div className="dashboard">
          <legend>Dashboard</legend>
          <hr className="lakeer lakeer-media" />
          <div className="headinv">
            {" "}
            <p className="total-users " id="book-total-user">
            verified Users: {totalUsers}
            </p>
          </div>
        </div>{" "}
        <br />
        <br /> <br />
        <br />
        <div className="user-box">
          {users.map((user) => (
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
                <button
                  className="delete-user-btn"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete User
                </button>
                <Link to={`/UserPosts/${user._id}`}>
                  <button className="view-posts-btn">View User's Posts</button>
                </Link>
                <Link to={`/UserBooking/${user._id}`}>
                  <button className="view-bookings-btn">
                    View User's Booked Post
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
