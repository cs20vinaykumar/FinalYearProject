import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/signup/Signup";
import Login from "./Components/Login/Login";
import Homepage from "./Components/Homepage/Homepage";
import About from "./Components/About/About";
import Dashboard from "./Components/Dashboard/Dashboard";
import Forgot from "./Components/Forgot/Forgot";
import Code from "./Components/Forgot/Code"
import Newpass from "./Components/Forgot/Newpass"
import Upload from "./Components/Upload/Upload";
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
            <Route exact path="/Login/Forgot" element={<Forgot/>} />  
            <Route exact path="/Code" element={<Code/>} />  
            <Route exact path="/Newpass" element={<Newpass/>} /> 
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route exact path="/Upload" element={<Upload />} />


        </Routes>
      </Router>
    </>
  );
}

export default App;


