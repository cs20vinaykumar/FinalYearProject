import express from "express";
import multer from "multer"; // Middleware for handling file uploads
import Booking from "../models/Booking.js";

const booking = express.Router();

// Multer configuration for handling file uploads
const upload = multer({ dest: "uploads/" }); // Define a destination folder for uploaded files

booking.post("/", upload.single("image"), async (req, res) => {
  try {
    const { userId, productId, status } = req.body;
    const image = req.file; // Get the uploaded image file

    // Check if an image was uploaded
    if (!image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Create a new booking record in the database with the image file path
    const booking = await Booking.create({
      userId,
      productId,
      status,
      image: image.path,
    });

    // Respond with a success message and the newly created booking
    res.status(200).json({ message: "Booking initiated", booking });
  } catch (error) {
    console.error("Error booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

booking.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Update the booking status in the database
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    // Respond with a success message and the updated booking
    res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default booking;
