import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css"

export default function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    // Implement the logout process here, e.g., clear session/token

    // After logout, redirect the user to the login page
    navigate('/');

  };
  return (

    <div>
      <h1 className='head1'> Hey this is my Dashboard page</h1>
      <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
    </div>

  )
}
