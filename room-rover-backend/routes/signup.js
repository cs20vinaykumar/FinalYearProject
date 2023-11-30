import express from "express";
import User from "../models/User.js";
const routers = express.Router()
import bcrypt from "bcrypt";


routers.post("/", async (req, res) => {
    const { name, lname, email, number, password, gender } = req.body;
    try {
      const existingUser = await User.findOne({ email: email});
      if (existingUser) {
        res.send({ message: "User already registered" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
  
        const newUser = new User({
          name,
          lname,
          email,
          number,
          password: secPass,
          gender,
        });
  
        await newUser.save();
        res.send({ message: "Successfully Registered" });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  export default routers