import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const updateProfile = express.Router();

updateProfile.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await User.findById(userId);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Record Not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
});

updateProfile.put("/changePassword", async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword, confrimPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", error });
  }
});

export default updateProfile;
