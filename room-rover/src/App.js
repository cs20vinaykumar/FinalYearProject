import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/signup/Signup";
import Login from "./Components/Login/Login";
import Homepage from "./Components/Homepage/Homepage";
import About from "./Components/About/About";
import Dashboard from "./Components/Dashboard/Dashboard";
import profile from "./Components/Profile/profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
function App() {

  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;


