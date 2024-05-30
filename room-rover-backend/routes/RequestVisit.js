import express from "express";
import requestVisit from "../models/RequestVisit.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

const RequestVisit = express.Router();

RequestVisit.post("/", async (req, res) => {
  try {
    const { productId, date, startTime, endTime } = req.body;
    const product = await mongoose
      .model("formData")
      .findById(productId)
      .populate("postedBy");

    const ownerEmail = product.postedBy.email;
    const visitRequest = new requestVisit({
      productId,
      date,
      startTime,
      endTime,
    });
    console.log(productId);

    await sendEmail(ownerEmail, { date, startTime, endTime });
    await visitRequest.save();

    res.status(201).json({ message: "Visit request submitted successfully" });
  } catch (error) {
    console.error("Error submitting visit request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const sendEmail = async (email, visitDetails) => {
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
    subject: "Visit Request Notification",
    text: `A tenant has requested to visit the property at the following time:\n
           Date: ${visitDetails.date}\n
           Time: ${visitDetails.startTime} to ${visitDetails.endTime}\n
           Please take necessary actions.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully!", info);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

export default RequestVisit;
