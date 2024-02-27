import express from "express";
import User from "../models/User.js";

const updateProfile = express.Router();

updateProfile.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await User.findById(userId);
    if (result) {
      res.send(result);
    } else {
      res.send({ message: "Record Not founnd" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});

updateProfile.put("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, lname, email, number, password, gender } = req.body;

    // Update user profile in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, lname, email, number, password, gender },
      { new: true }
    );

    if (updatedUser) {
      res
        .status(200)
        .json({
          message: "User profile updated successfully",
          user: updatedUser,
        });
    } else {
      res.status(404).json({ message: "User not found  or no changes made" });
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", err: error.message });
  }
});

export default updateProfile;
