import express from "express";
import User from "../models/User.js";
import formData from "../routes/PropertyForm.js";
const routers = express.Router();
import bcrypt from "bcrypt";
import EmailOTP from "../models/emailOTP.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
dotenv.config();

const sendOTPEmail = async (email, otpCode) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP code for email verification is: ${otpCode}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully!", info);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});
// POST: Register a new user
routers.post("/", upload.array("file", 3), async (req, res) => {
  const { files } = req;
  const { name, email, number, password, gender, userType } = req.body;
  const fileNames = files.map((file) => file.filename);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{6,})$/;
  const phoneNumberRegex = /^\d{11}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 6 characters long and include at least one uppercase letter, one digit, and one special character.",
    });
  }
  if (!phoneNumberRegex.test(number)) {
    return res
      .status(400)
      .json({ message: "Phone number must be exactly 11 digits long" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      number,
      password: secPass,
      gender,
      userType,
      file: fileNames,
      approvedByAdmin: false,
    });

    await newUser.save();
    console.log(newUser);

    const otpCode = Math.floor(Math.random() * 10000 + 1);
    const otpData = new EmailOTP({
      email,
      code: otpCode,
      expireIn: new Date().getTime() + 300 * 1000,
    });

    await otpData.save();

    await sendOTPEmail(email, otpCode);

    res.status(200).json({ message: "OTP sent to your email", name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// DELETE: Delete a user by ID
routers.delete("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// GET: Fetch all pending users
routers.get("/pending-users", async (req, res) => {
  try {
    const pendingUsers = await User.find({ approvedByAdmin: false });
    res.json(pendingUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Function to send approval email
export const sendApprovalEmail = async (email) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Account Approved",
      text: "Your account has been approved by the admin.",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Approval Email Sent Successfully to:", email);
  } catch (error) {
    console.error("Error sending approval email:", error);
    throw new Error("Error sending approval email");
  }
};

// Function to send rejection email
export const sendRejectionEmail = async (email, rejectMessage) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Account Rejected",
      text: `Your account registration request has been rejected by the admin.
       Reason: ${rejectMessage}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Rejection Email Sent Successfully to:", email);
  } catch (error) {
    console.error("Error sending rejection email:", error);
    throw new Error("Error sending rejection email");
  }
};

// Admin approves a user
routers.put("/approve-user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find the user by ID
    const user = await User.findById(userId);
    const userEmail = user.email;

    // Update approvedByAdmin to true
    await User.findByIdAndUpdate(userId, { approvedByAdmin: true });

    // Send approval email
    await sendApprovalEmail(userEmail);
    res.json({ message: "User approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Admin rejects a user
routers.put("/reject-user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { rejectMessage } = req.body;
    console.log("message", rejectMessage);
    // Find the user by ID
    const user = await User.findById(userId);
    const userEmail = user.email;

    // Send rejection email
    await sendRejectionEmail(userEmail, rejectMessage);

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.json({ message: "User rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET: Admin user statistics
routers.get("/admin/user-statistics", async (req, res) => {
  try {
    const maleCount = await User.countDocuments({
      gender: "male",
      approvedByAdmin: true,
    });
    const femaleCount = await User.countDocuments({
      gender: "female",
      approvedByAdmin: true,
    });
    const ownerCount = await User.countDocuments({
      userType: "owner",
      approvedByAdmin: true,
    });
    const bothCount = await User.countDocuments({
      userType: "both",
      approvedByAdmin: true,
    });
    const tenantCount = await User.countDocuments({
      userType: "tenant",
      approvedByAdmin: true,
    });
    const unapprovedCount = await User.countDocuments({
      approvedByAdmin: false,
    });

    res.json({
      maleCount,
      femaleCount,
      ownerCount,
      bothCount,
      tenantCount,
      unapprovedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET: Fetch users with only name and approvedByAdmin fields
routers.get("/users/verifed", async (req, res) => {
  try {
    // Query all users and select only the name and approvedByAdmin fields
    const users = await User.find({}, "name approvedByAdmin");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// GET: Fetch all approved users
routers.get("/true-users", async (req, res) => {
  try {
    const approvedUsers = await User.find({ approvedByAdmin: true });
    res.json(approvedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default routers;
