import express from "express";
import User from "../models/User.js";
const routers = express.Router();
import bcrypt from "bcrypt";
import EmailOTP from "../models/emailOTP.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

routers.post("/", async (req, res) => {
  const { name, email, number, password, cnic, gender, userType } = req.body;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{6,})$/;

  if (!passwordRegex.test(password)) {
    return res.send({
      message:
        "Password must be at least 6 characters long and include at least one uppercase letter, one digit, and one special character.",
    });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.send({ message: "User already registered" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        name,
        email,
        number,
        password: secPass,
        cnic,
        gender,
        userType,
      });

      await newUser.save();

      const otpCode = Math.floor(Math.random() * 10000 + 1);
      let otpData = new EmailOTP({
        email: req.body.email,
        code: otpCode,
        expireIn: new Date().getTime() + 300 * 1000,
      });

      await otpData.save();

      res.send({ message: "OTP Sent TO Your Email", name: name });
      await sendOTPEmail(email, otpCode);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const sendOTPEmail = async (email, otpCode) => {
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

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully!", info);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

routers.get("/", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Send the users as a response
    res.json(users);
  } catch (error) {
    console.error(error);
    // Send an error response if something goes wrong
    res.status(500).json({ message: "Internal server error" });
  }
});

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

export default routers;
