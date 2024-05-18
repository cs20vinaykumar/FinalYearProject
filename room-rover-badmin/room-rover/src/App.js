import './App.css';
import Navbar from "../src/Components/Navbar/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
// import Signup from './Components/Signup/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import Bookings from "../src/Components/Bookings/Bookings"
import Users from './Components/Users/Users';
import UserPost from './Components/UserPost/UserPost';
import UserBooking from './Components/UserBooking/UserBooking';
import UserPending from './Components/UserPending/UserPending';
import Profile from './Components/Profile/Profile';
import Detail from './Components/Details/Details';
import Complain from './Components/Complain/Complain';

function App() {
  return (
<>
<Router>
          <Navbar />
          <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/Login" element={<Login />} />
          {/* <Route exact path="/Signup" element={<Signup />} /> */}
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route exact path="/Bookings" element={<Bookings />} />
          <Route exact path="/UserList" element={<Users />} />
          <Route exact path="/UserPosts/:userId" element={<UserPost />} />
          <Route exact path="/UserBooking/:userId" element={<UserBooking />} />
          <Route exact path="/UserPending" element={<UserPending />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route path="/product/:productId" element={<Detail />} />
          <Route path="/Complaints" element={<Complain />} />
          </Routes>
        </Router>
</>
  );
}

export default App;
