import React from "react";
import "./Dashboard.css";


export default function Dashboard() {
  return (
    <div>
        <div className="admin-container">
      <header className="admin-header">
        <h1>Welcome to Admin Portal</h1>
      </header>
      <nav className="admin-nav">
        <ul className="admin-nav-menu">
          <li className="admin-nav-item">Dashboard</li>
          <li className="admin-nav-item">Users</li>
          <li className="admin-nav-item">Products</li>
          <li className="admin-nav-item">Settings</li>
        </ul>
      </nav>
      <main className="admin-main">
        {/* Your main content goes here */}
        <h2>Main Content Area</h2>
        <p>This is where you'll display your main content, such as statistics, user data, etc.</p>
      </main>
      <footer className="admin-footer">
        <p>&copy; 2024 Admin Portal. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
}
