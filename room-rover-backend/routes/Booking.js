import express from "express";
import multer from "multer";
import Booking from "../models/Booking.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import formData from "../models/PropertyForm.js";
import moment from "moment";

dotenv.config();

const booking = express.Router();

const upload = multer({ dest: "uploads/" });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});


const sendApprovalEmail = async (booking, user) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: user.email,
      subject: "Booking Approved",
      text: `Your booking with ID ${booking._id} has been approved.`,
    });
    console.log("Approval email sent successfully");
  } catch (error) {
    console.error("Error sending approval email:", error);
    console.error("Error details:", error.message, error.stack);
  }
};

const sendCancellationEmail = async (booking, user, reason) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: user.email,
      subject: "Booking Cancelled",
      text: `Your booking with ID ${booking._id} has been cancelled for the following reason: ${reason}.`,
    });
    console.log("Cancellation email sent successfully");
  } catch (error) {
    console.error("Error sending cancellation email:", error);
    console.error("Error details:", error.message, error.stack);
  }
};

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
      createdAt: new Date(),
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
      select: "_id name email cnic number",
    });

    const bookedPosts = bookings
      .map((booking) => {
        if (!booking.userId) return null;
        return {
          bookingId: booking._id,
          _id: booking.userId._id,
          name: booking.userId.name,
          email: booking.userId.email,
          number: booking.userId.number,
          cnic: booking.userId.cnic,
          status: booking.status,
        };
      })
      .filter((post) => post !== null);
    console.log(bookedPosts);
    res.json(bookedPosts);
  } catch (error) {
    console.error("Error fetching bookings for product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

booking.put("/:bookingId/status", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    ).populate("userId");

    console.log("Updated Booking:", updatedBooking);

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (status === "approved") {
      const user = updatedBooking.userId;
      await sendApprovalEmail(updatedBooking, user);
    }

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

    const bookedPosts = bookings
      .map((booking) => {
        if (!booking.productId) {
          return null;
        }

        return {
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
        };
      })
      .filter((booking) => booking !== null);

    res.json(bookedPosts);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

booking.get("/adminGet/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
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
    const productId = req.params.id;

    const bookings = await Booking.find({ userId, productId }).populate(
      "status"
    );

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "Bookings not found" });
    }

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

    const booking = await Booking.findOneAndDelete({ userId, productId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully", booking });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

booking.put("/:bookingId/cancel", async (req, res) => {
  const { bookingId } = req.params;
  const { reason } = req.body;

  try {
    const booking = await Booking.findById(bookingId).populate({
      path: "productId",
      populate: {
        path: "postedBy",
        model: "user",
      },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const now = moment();
    const bookingTime = moment(booking.createdAt);
    const duration = moment.duration(now.diff(bookingTime));
    const hours = duration.asHours();

    if (hours > 5) {
      return res.status(400).json({
        message:
          "Booking cannot be cancelled after 6 hours",
      });
    }

    await Booking.findByIdAndUpdate(bookingId, {
      $set: { status: "cancelled" },
    });

    await formData.findOneAndUpdate(
      { "booking.user": bookingId },
      { $set: { "booking.status": "waiting" } },
      { new: true }
    );

    const user = await User.findById(booking.userId);
    await sendCancellationEmail(booking, user, reason);

    res.send({ message: "Booking status updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
});

export default booking;
