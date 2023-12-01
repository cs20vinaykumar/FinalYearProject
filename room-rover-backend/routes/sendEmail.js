import express, { json } from "express";
import User from "../models/User.js";
import OTP from "../models/OTP.js";
import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config(); // connect a env file to inex.js

const otpVerify = express.Router();

otpVerify.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.send({
      message: "Please fill in email fields",
    });
  }

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const otpCode = Math.floor(Math.random() * 10000 + 1);
      let otpData = new OTP({
        email: req.body.email,
        code: otpCode,
        expireIn: new Date().getTime() + 300 * 1000,
      });

      await otpData.save();

      console.log(otpCode);

      res.send({
        message: "Email found. Proceed to the next step for password reset.",
      });

      await sendOTPEmail(user.email, otpCode);
    } else {
      res.send({ message: "Email not found." });
    }
  } catch (error) {
    console.error(error);
    res.send({ message: "Internal Server Error" });
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
    subject: "Password Reset OTP",
    text: `Your OTP code for password reset is: ${otpCode}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully!", info);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};
export default otpVerify;
