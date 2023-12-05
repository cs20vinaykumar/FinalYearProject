import express from "express";
import OTP from "../models/OTP.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const password = express.Router();

password.post("/", async (req, res) => {});

export default password;
