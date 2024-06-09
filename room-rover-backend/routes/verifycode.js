import express from "express";
import OTP from "../models/OTP.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const verifycode = express.Router();

verifycode.post("/", async (req, res) => {
  const { email, enteredOtp } = req.body;

  if (!email || !enteredOtp) {
    return res.status(400).json({
      success: false,
      message: "Please fill in both email and OTP fields",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found." });
    }

    const otpData = await OTP.findOne({ email, code: enteredOtp });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    if (new Date().getTime() > otpData.expireIn) {
      return res.status(400).json({
        success: false,
        message: "Expired OTP. Please request a new one.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP matched successfully. Proceed to the next step.",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default verifycode;
