import express from "express";
import User from "../models/User.js";
const route = express.Router();
import nodemailer from "nodemailer";

route.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.send({
      message: "Please fill in email fields",
    });
  }

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const otpCode = Math.floor(100000 + Math.random() * 900000);
      user.otpCode = otpCode;
      await user.save();

      console.log(otpCode);

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
        to: User.email,
        subject: "Password Reset OTP",
        text: `Your OTP code for password reset is: ${otpCode}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email Sent Successfully!");
        }
      });

      res.send({
        message: "Email found. Proceed to the next step for password reset.",
      });
    } else {
      res.send({ message: "Email not found." });
    }
  } catch (error) {
    console.error(error);
    res.send({ message: "Internal Server Error" });
  }
});

export default route;
