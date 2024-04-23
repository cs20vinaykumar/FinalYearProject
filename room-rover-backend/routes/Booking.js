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

booking.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ userId }).populate("productId");

    const bookedPosts = bookings.map((booking) => ({
      _id: booking.productId._id,
      title: booking.productId.title,
      location: booking.productId.location,
      area: booking.productId.area,
      file: booking.productId.file,
      pricing: booking.productId.pricing
        ? {
            rent: booking.productId.pricing.rent,
            deposite: booking.productId.pricing.deposite,
          }
        : undefined,
      propertyType: booking.productId.propertyType
        ? {
            flat: booking.productId.propertyType.flat,
            room: booking.productId.propertyType.room,
          }
        : undefined,
    }));

    res.json(bookedPosts);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

booking.get("/check", async (req, res) => {
  try {
    const { userId, productId } = req.query;
    const booking = await Booking.findOne({ userId, productId });

    res.json({ bookingExists: !!booking });
  } catch (error) {
    console.error("Error checking for booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

booking.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find the booking
    const booking = await Booking.findOneAndDelete({ userId, productId });

    // Check if booking exists
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully", booking });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default booking;
