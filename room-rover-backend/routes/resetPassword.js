import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const resetPassword = express.Router();

resetPassword.post("/", async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{6,})$/;
  if (!email || !newPassword || !confirmPassword) {
    return res.json({
      message: "Please fill in all fields.",
    });
  }

  if (!passwordRegex.test(newPassword)) {
    return res.json({
      message:
        "Password must be at least 6 characters long and include at least one uppercase letter, one digit, and one special character.",
    });
  }

  try {
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      return res.json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password in the database
      await User.updateOne({ email }, { password: hashedPassword });

      // Optionally, you can delete the OTP record after password reset
      // await OTP.deleteOne({ email });

      return res.json({
        success: true,
        message: "Password reset successfully.",
      });
    } else {
      return res.json({ success: false, message: "Email not found." });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Internal Server Error" });
  }
});

export default resetPassword;
