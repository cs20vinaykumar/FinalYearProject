import express from "express";
import formData from "../models/PropertyForm.js";

const GetForm = express.Router();

GetForm.get("/", async (req, res) => {
  try {
    const data = await formData
      .find()
      .populate("postedBy", "_id name lname email number")
      .sort("-createdAt");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

GetForm.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await formData.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Property form entry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

GetForm.get("/postStatus", async (req, res) => {
  try {
    // Count documents based on booking status
    const approvedCount = await formData.countDocuments({
      "booking.status": "approved",
    });
    const waitingCount = await formData.countDocuments({
      "booking.status": "waiting",
    });
    const rejectedCount = await formData.countDocuments({
      "booking.status": "rejected",
    });
    // Alternatively, you can return these counts and use them in your React component
    res.status(201).json({ approvedCount, waitingCount, rejectedCount });
  } catch (error) {
    console.error("Error fetching post counts:", error);
    return { error: "Error fetching post counts" };
  }
});
export default GetForm;
