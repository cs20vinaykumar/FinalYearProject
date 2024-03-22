import express from "express";
import Booking from "../models/Booking.js";

const booking = express.Router();

booking.post("/", async (req, res) => {
  try {
    const { userId, productId, status } = req.body;
    const booking = await Booking.create({ userId, productId, status });
    res.status(200).json({ message: "Booking initiated", booking });
  } catch (error) {
    console.error("Error booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


booking.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extracting the booking ID from the request parameters
    const { status } = req.body; // Extracting the new status from the request body

    // Updating the booking status in the database using findByIdAndUpdate
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    // Sending a successful response with the updated booking
    res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    // Handling errors and sending an error response
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




export default booking;
