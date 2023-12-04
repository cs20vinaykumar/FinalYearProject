import express from "express";
import OTP from "../models/OTP.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const verifycode = express.Router();



  verifycode.post("/", async (req, res) => {
    const { email, enteredOtp } = req.body;
  
    if (!email || !enteredOtp) {
      return res.send({
        message: "Please fill in both email and OTP fields",
      });
    }
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (user) {
        // Find the OTP data from the database
        const otpData = await OTP.findOne({ email, code: enteredOtp });
  
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


  export default verifycode


