import "./ViewBooking.css"
import React, { useEffect, useState } from "react";
import axios from "axios";


export default function ViewBooking() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
      // Fetch bookings associated with the owner's property
      const fetchBookings = async () => {
        try {
          const response = await axios.get("/api/bookings");
          setBookings(response.data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      };
  
      fetchBookings();
    }, []);
  
    const handleConfirmBooking = async (bookingId) => {
      try {
        await axios.put(`/api/bookings/${bookingId}`, { status: "confirmed" });
        // Update booking status locally
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking._id === bookingId ? { ...booking, status: "confirmed" } : booking
          )
        );
      } catch (error) {
        console.error("Error confirming booking:", error);
      }
    };
  
    const handleRejectBooking = async (bookingId) => {
      try {
        await axios.put(`/api/bookings/${bookingId}`, { status: "rejected" });
        // Update booking status locally
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking._id === bookingId ? { ...booking, status: "rejected" } : booking
          )
        );
      } catch (error) {
        console.error("Error rejecting booking:", error);
      }
    };
  return (
<div>
      <h2>View Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            <div>User: {booking.userId}</div>
            <div>Status: {booking.status}</div>
            {booking.status === "waiting" && (
              <div>
                <button onClick={() => handleConfirmBooking(booking._id)}>Confirm</button>
                <button onClick={() => handleRejectBooking(booking._id)}>Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
