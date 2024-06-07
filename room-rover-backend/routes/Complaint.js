import express from "express";
import Complain from "../models/Complaint.js";
import formData from "../models/PropertyForm.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";

const Complaint = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

Complaint.post("/:productId", async (req, res) => {
  try {
    const { heading, description, againstType } = req.body;
    const productId = req.params.productId;
    const userId = req.user.id;

    if (againstType === "user") {
      // Fetch the user ID from the productId's postedBy field
      const product = await formData.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const againstId = product.postedBy;

      const userComplaintsCount = await Complain.countDocuments({
        againstType: "user",
        againstId,
        status: { $ne: "resolved" }, // Exclude resolved complaints
      });

      const newComplaint = new Complain({
        userId,
        heading,
        description,
        againstType,
        againstId,
      });
      await newComplaint.save();
      return res
        .status(201)
        .json({ message: "Complaint submitted successfully" });
    } else if (againstType === "property") {
      // If the complaint is against a product, directly use productId
      const newComplaint = new Complain({
        userId,
        heading,
        description,
        againstType,
        againstId: productId,
      });
      await newComplaint.save();
      return res
        .status(201)
        .json({ message: "Complaint submitted successfully" });
    } else {
      return res.status(400).json({ message: "Invalid againstType" });
    }
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ message: "Failed to submit complaint" });
  }
});

Complaint.get("/", async (req, res) => {
  try {
    const complaints = await Complain.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
});
Complaint.put("/:id/resolve", async (req, res) => {
  try {
    const { message } = req.body;
    const complaint = await Complain.findByIdAndUpdate(
      req.params.id,
      { status: "resolved" },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const user = await User.findById(complaint.userId);
    if (user && user.email) {
      const mailOptions = {
        from: "your-email@example.com",
        to: user.email,
        subject: "Your complaint has been resolved",
        text: `Your complaint has been resolved.\nMessage from admin: ${message}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }

    res
      .status(200)
      .json({ message: "Complaint resolved successfully", complaint });
  } catch (error) {
    console.error("Error resolving complaint:", error);
    res.status(500).json({ message: "Failed to resolve complaint" });
  }
});

Complaint.delete("/:id", async (req, res) => {
  try {
    const complaint = await Complain.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({ message: "Failed to delete complaint" });
  }
});

Complaint.put("/check-block-status/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Count unresolved complaints against the user
    const unresolvedComplaintsCount = await Complain.countDocuments({
      againstType: "user",
      againstId: userId,
      status: { $ne: "resolved" },
    });

    if (unresolvedComplaintsCount > 3) {
      // Update the user's blocked status to true
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { blocked: true },
        { new: true }
      );

      return res.status(200).json({
        message: "User blocked due to excessive complaints",
        user: updatedUser,
      });
    } else {
      return res.status(200).json({
        message: "User has less than 3 unresolved complaints",
      });
    }
  } catch (error) {
    console.error("Error checking user block status:", error);
    res.status(500).json({ message: "Failed to check user block status" });
  }
});

export default Complaint;
