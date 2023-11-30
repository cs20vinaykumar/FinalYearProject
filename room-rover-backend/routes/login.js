import express from "express";
import User from "../models/User.js";
const router = express.Router();
import bcrypt from "bcrypt";

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({
      message: "Please fill in both email and password fields",
    });
  }

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (err) {
    console.error(err);
    res.send({ message: "Internal Server Error" });
  }
});

export default router;
