import express from "express";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const blocked = express.Router();

blocked.get("/", async (req, res) => {
  try {
    const blockedUsers = await User.find({ blocked: true }).select(
      "_id name email gender userType createdAt number cnic file"
    );
    res.json(blockedUsers);
  } catch (error) {
    console.error("Error fetching blocked users:", error);
    return [];
  }
});

blocked.put("/:id/unblock", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { blocked: false },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating block status:", error);
    res.status(500).json({ error: "Error updating block status" });
  }
});

export default blocked;
