import express from "express";
import multer from "multer"; // Middleware for handling file uploads
import Booking from "../models/Booking.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import User from "../models/User.js";

dotenv.config();

const booking = express.Router();

// Multer configuration for handling file uploads
const upload = multer({ dest: "uploads/" }); // Define a destination folder for uploaded files

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

booking.post("/", upload.single("image"), async (req, res) => {
  try {
    const { userId, productId, status } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const booking = await Booking.create({
      userId,
      productId,
      status,
      image: image.path,
    });

    res.status(200).json({ message: "Booking initiated", booking });

    const user = await User.findById(userId);

    const bookingWithProduct = await Booking.findById(booking._id).populate({
      path: "productId",
      populate: {
        path: "postedBy",
        model: "user",
      },
    });

    if (
      !bookingWithProduct ||
      !bookingWithProduct.productId ||
      !bookingWithProduct.productId.postedBy
    ) {
      return res.status(400).json({ message: "Owner details not found" });
    }

    const ownerEmail = bookingWithProduct.productId.postedBy.email;

    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: ownerEmail,
      subject: "New Booking Initiated",
      text: `A new booking has been initiated for your property by ${user.name} ${user.lname}. 

      Details of the booking:
      - Booking ID: ${booking._id}
      - User Name: ${user.name}
      - Email: ${user.email}
      - Phone Number: ${user.number}
      
      Please visit our website to confirm or cancel the booking.`,
    });
  } catch (error) {
    console.error("Error booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

booking.get("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const bookings = await Booking.find({ productId }).populate({
      path: "userId",
      select: " _id name email cnic number", // Include name and lname, exclude _id
    });

    const bookedPosts = bookings.map((booking) => ({
      bookingId: booking._id,
      _id: booking.userId._id,
      name: booking.userId.name,
      email: booking.userId.email,
      number: booking.userId.number,
      cnic: booking.userId.cnic,
      status: booking.status,
    }));
    console.log(bookedPosts);
    res.json(bookedPosts);
  } catch (error) {
    console.error("Error fetching bookings for product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// PUT route to update booking status

booking.put("/:bookingId/status", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId, // No need to wrap in an object
      { status }, // Simplified syntax
      { new: true }
    );

    console.log("Updated Booking:", updatedBooking); // Log for verification

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Respond with the updated booking
    res
      .status(200)
      .json({ message: "Booking status updated", booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

booking.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ userId })
      .populate("productId")
      .select("status");

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
      status: booking.status,
    }));

    res.json(bookedPosts);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

booking.get("/adminGet/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; // Extract user ID from URL
    const bookings = await Booking.find({ userId })
      .populate("productId")
      .select("status");

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
      status: booking.status,
    }));

    res.json(bookedPosts);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

booking.get("/GetStatus/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id; // Extract product ID from request parameters

    // Find bookings with matching userId and productId, and populate the status field
    const bookings = await Booking.find({ userId, productId }).populate(
      "status"
    );

    // If there are no bookings, send a 404 response
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "Bookings not found" });
    }

    // Since productId is unique, there should be only one booking, so we take the first one
    const status = bookings[0].status;

    res.json({ status });
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
