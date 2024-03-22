import express from "express";
import requestVisit from "../models/RequestVisit.js";

const RequestVisit = express.Router();

RequestVisit.post("/", async (req, res) => {
  try {
    const { productId, date, startTime, endTime } = req.body;

    const visitRequest = new requestVisit({
      productId,
      date,
      startTime,
      endTime,
    });

    await visitRequest.save();

    res.status(201).json({ message: "Visit request submitted successfully" });
  } catch (error) {
    console.error("Error submitting visit request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default RequestVisit;
