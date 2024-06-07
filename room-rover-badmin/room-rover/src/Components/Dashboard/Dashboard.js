import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [statistics, setStatistics] = useState({});
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState("0");
  const [counts, setCounts] = useState(null);

  const handleLinkClick = (link) => {
    console.log("Clicked on link:", link);
    // setActiveLink(link);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/signup/admin/user-statistics")
      .then((response) => {
        setStatistics(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user statistics:", error);
      });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/signup/users/verifed"
        ); // Assuming your backend API endpoint is '/api/users'
        setUsers(response.data);
        setCount(response.data.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    async function fetchPostCounts() {
      try {
        const response = await axios.get(
          "http://localhost:4000/GetPropertyForm/postStatus",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching post counts:", error);
      }
    }

    fetchPostCounts();
  }, []);
  return (
    <div>
      <div className="main-dashboard">
        <div className="sidebar">
          <div className="logo">
            <h1 className="green">Dashboard</h1>
          </div>
          <ul className="menu">
            <li>
              <Link
                to="/Profile"
                onClick={() => handleLinkClick("Profile")}
                className="menu-link"
                activeClassName="active"
              >
                <i class="fa-regular fa-user"></i> Profile
              </Link>
            </li>

            <li>
              <Link
                to="/UserList"
                onClick={() => handleLinkClick("List a Place")}
                className="menu-link"
                activeClassName="active"
              >
                <i class="fa-solid fa-users"></i> User List
              </Link>
            </li>

            <li>
              <Link
                to="/user-block"
                className="menu-link"
                activeClassName="active"
              >
                <i class="fa-solid fa-user-lock"></i> Block User
              </Link>
            </li>
            <li>
              <Link
                to="/Bookings"
                className="menu-link"
                activeClassName="active"
                onClick={() => handleLinkClick("My Post")}
              >
                <i class="fa-solid fa-bookmark"></i> Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/Complaints"
                className="menu-link"
                activeClassName="active"
                onClick={() => handleLinkClick("Complaints")}
              >
                <i class="fa-solid fa-box-tissue"></i> Complaints
              </Link>
            </li>
            <li>
              <Link
                to="/UserPending"
                className="menu-link"
                activeClassName="active"
              >
                <i class="fa-solid fa-clock-rotate-left"></i> User Pending (
                {statistics.unapprovedCount})
              </Link>
            </li>
          </ul>
        </div>

        <div className="main-contnent">
          <div class="box box-2">
            <div className="box-content">
              <div className="box-number-wrapper">
                <span className="box-number">{statistics.bothCount}</span>
                <i class="fa-solid fa-solid-1 fa-user"></i>
              </div>
              <h3 style={{ color: "brown" }}>Both: Tenant and Owner</h3>
            </div>
          </div>
          <div class="box box-1">
            <div className="box-content">
              <div className="box-number-wrapper">
                <span className="box-number">{statistics.tenantCount}</span>
                <i class="fa-solid fa-solid-1 fa-users"></i>
              </div>
              <h3 style={{ color: "brown" }}>Only Tenant</h3>
            </div>
          </div>

          <div class="box box-2">
            <div className="box-content">
              <div className="box-number-wrapper">
                <span className="box-number">{statistics.ownerCount}</span>
                <i class="fa-solid fa-solid-1 fa-user"></i>
              </div>
              <h3 style={{ color: "brown" }}>Only Owner</h3>
            </div>
          </div>

          <div class="box box-3">
            <div className="box-content">
              <div className="box-number-wrapper">
                <span className="box-number">{statistics.maleCount}</span>
                <i class="fa-solid fa-solid-1 fa-person"></i>
              </div>
              <h3 style={{ color: "brown" }}>Male</h3>
            </div>
          </div>

          <div class="box box-4">
            <div className="box-content">
              <div className="box-number-wrapper">
                <span className="box-number">{statistics.femaleCount}</span>
                <i class="fa-solid fa-solid-1 fa-person-dress"></i>
              </div>
              <h3 style={{ color: "brown" }}>Female</h3>
            </div>
          </div>

          <div className="Accounts">
            <div className="content-5">
              {" "}
              <br />
              <h3>Total Users ({count})</h3>
              <ul>
                <span className="name">Name</span>
                <span className="status">Status</span>
                {users?.map((user) => (
                  <li key={user._id}>
                    <span>{user.name}</span>
                    <span className="adminApprove">
                      {user.approvedByAdmin ? "verified" : "unverified"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="post-status">
            <div className="content-5">
              <br />
              <h3>Booking Status</h3>
              {counts ? (
                <ul>
                  <li>
                    <strong>Approved posts:</strong> {counts.approvedCount}
                  </li>
                  <li>
                    <strong>Waiting posts:</strong> {counts.waitingCount}
                  </li>
                  <li>
                    <strong>Rejected posts:</strong> {counts.rejectedCount}
                  </li>
                </ul>
              ) : (
                <p className="loading-message">Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
