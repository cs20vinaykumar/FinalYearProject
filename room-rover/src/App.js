import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/signup/Signup";
import EmailVerify from "./Components/signup/EmailVerify";
import Login from "./Components/Login/Login";
import Homepage from "./Components/Homepage/Homepage";
import About from "./Components/About/About";
import Dashboard from "./Components/Dashboard/Dashboard";
import Forgot from "./Components/Forgot/Forgot";
import Code from "./Components/Forgot/Code";
import Newpass from "./Components/Forgot/Newpass";
import Upload from "./Components/Upload/Upload";
import Detail from "./Components/Details/Detail";
import Post from "../src/Components/OwnerSide/Post/Post"
import { AppProvider } from "./Components/AppContext";
import UpdateForm from "./Components/Dashboard/UpdateForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./Components/UserProfile/UserProfile";
import Agreement from "./Components/Agreement/Agreement";
import Payment from "../src/Components/BookingDetails/Payment/Payment";
import Terms from "./Components/BookingDetails/TermsAndCondition/Terms";
import TenantAgreement from "./Components/BookingDetails/TenantAgreement/TenantAgreement";
import ViewBooking from "./Components/OwnerSide/ViewBooking/ViewBooking";
import RequestVisit from "./Components/RequestVisit/RequestVisit";

function App() {
  return (
    <>
      <AppProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Login/Forgot" element={<Forgot />} />
            <Route exact path="/Code" element={<Code />} />
            <Route exact path="/Newpass" element={<Newpass />} />
            <Route exact path="/Signup" element={<Signup />} />
            <Route exact path="/EmailVerify" element={<EmailVerify />} />
            <Route exact path="/Upload" element={<Upload />} />
            <Route exact path="/Dashboard" element={<Dashboard />} />
            <Route path="/product/:productId" element={<Detail />} />
            <Route exact path="/Post" element={<Post />} />
            <Route exact path="/Update/:id" element={<UpdateForm />} />
            <Route exact path="/UserProfile" element={<UserProfile />} />
            <Route exact path="/Agreement" element={<Agreement />} />
            <Route
              exact
              path="/TenantAgreement"
              element={<TenantAgreement />}
            />
            <Route exact path="/TermsAndCondition" element={<Terms />} />
            <Route exact path="/payment/:productId" element={<Payment />} />
            <Route exact path="/viewBooking" element={<ViewBooking />} />
            <Route exact path="/RequestVisit/:productId" element={<RequestVisit />} />

          </Routes>
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
