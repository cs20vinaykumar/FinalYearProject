import express from "express";
import User from "../models/User.js";
const routers = express.Router();
import bcrypt from "bcrypt";

routers.post("/", async (req, res) => {
  const {name, email, number, password } = req.body;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{6,})$/;

  if (!name || !email || !number || !password) {
    return res.send({
      message: "Fill all the input feilds.",
    });
  }
  if (!passwordRegex.test(password)) {
    return res.send({
      message:
        "Password must be at least 6 characters long and include at least one uppercase letter, one digit, and one special character.",
    });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.send({ message: "User already registered" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        name,
        email,
        number,
        password: secPass,
      });

      await newUser.save();

      res.send({ message: "User registered successfully" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default routers;
