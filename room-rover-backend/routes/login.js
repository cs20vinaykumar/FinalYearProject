import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();


router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill in both email and password fields",
    });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Password didn't match" });
    }

    if(user.blocked === true){
      return res.status(901).json({message: "Your account is blocked by admin. Contact Admin at vinaychoithani223@gmail.com"})
    }

    if (!user.approvedByAdmin) {
      return res.status(403).json({ message: "Your account is pending approval by admin" });
    }
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Login Successful", user: user, token: token });
    console.log(user)
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
