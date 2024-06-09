import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewBooking.css";

const ViewBookings = () => {
  const { productId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate =  useNavigate()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/booking/product/${productId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Fetched bookings:", response.data);
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [productId]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login");
    }
  }, [navigate]);

  const handleApprove = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:4000/booking/${bookingId}/status`,
        { status: "approved" },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.bookingId === bookingId
            ? { ...booking, status: "approved" }
            : booking
        )
      );
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:4000/booking/${bookingId}/status`,
        { status: "rejected" },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.bookingId === bookingId
            ? { ...booking, status: "rejected" }
            : booking
        )
      );
    } catch (error) {
      console.error("Error rejecting booking:", error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const reason = prompt("Please provide a reason for cancellation:");
    if (!reason) {
      alert("Cancellation reason is required");
      return;
    }

    try {
      await axios.put(
        `http://localhost:4000/booking/${bookingId}/cancel`,
        { reason },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Booking cancelled successfully");
      window.location.reload();
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.bookingId !== bookingId)
      );
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error("Error cancelling booking:", error);
      }
    }
  };

  return (
    <div className="booking-container">
      <h2>Accept or Reject Booking</h2>
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="booking-list">
          {bookings?.map((post) => (
            <div key={post.bookingId} className="booking-card">
              <p>ID: {post._id}</p>
              <p>Name: {post.name}</p>
              <p>Email: {post.email}</p>
              <p>CNIC: {post.cnic}</p>
              <p>Number: {post.number}</p>
              <p className={`status ${post.status}`}>Status: {post.status}</p>
              <div className="button-group">
                {post.status === "waiting" && (
                  <>
                    <button onClick={() => handleApprove(post.bookingId)}>
                      Approve
                    </button>
                    <button onClick={() => handleReject(post.bookingId)}>
                      Reject
                    </button>
                  </>
                )}
                {post.status === "approved" && (
                  <button onClick={() => handleCancelBooking(post.bookingId)}>
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBookings;
