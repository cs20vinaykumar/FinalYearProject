import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ViewBooking.css";

const ViewBookings = () => {
  const { productId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

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
        console.log("Fetched bookings:", response.data); // Debugging: Log fetched bookings
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [productId]);

  const handleApprove = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:4000/booking/${bookingId}/status`,
        { status: "approved" }, // Change status to "accepted"
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Refresh bookings after approval
      setBookings();
      window.location.reload();
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

      setBookings();
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting booking:", error);
    }
  };
  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:4000/booking/${bookingId}/cancel`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await axios.put(
        `http://localhost:4000/PropertyForm/${productId}/booking`,
        { status: "waiting" }, // Update status directly to "waiting"
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
      window.location.reload();
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <div className="booking-container">
      <h2>Accept it or Reject Booking</h2> <br />
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
                    </button>{" "}
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
