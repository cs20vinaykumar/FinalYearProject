import express from "express";
// import User from "../models/User.js";
import dotenv from "dotenv";
import EmailOTP from "../models/emailOTP.js";
dotenv.config();

const EmailVerify = express.Router();

EmailVerify.post("/", async (req, res) => {
  const { enteredOtp } = req.body;

  if (!enteredOtp) {
    return res.send({
      message: "Please fill in both email and OTP fields",
    });
  }

  try {
    if (enteredOtp) {
      const otpData = await EmailOTP.findOne({ code: enteredOtp });

      if (otpData && new Date().getTime() < otpData.expireIn) {
        res.json({
          success: true,
          message: "OTP matched successfully. Proceed to the next step.",
        });
      } else {
        res.json({
          success: false,
          message: "Invalid or expired OTP. Please try again.",
        });
      }
    } else {
      res.send({ message: "Email not found." });
    }
  } catch (error) {
    console.error(error);
    res.send({ message: "Internal Server Error" });
  }
});

export default EmailVerify;
