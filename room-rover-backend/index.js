import express from "express";
import cors from "cors";
import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";

const app = express();
const port = 4000;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/room-rover");

    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.error("Connection error:", error.message);
  }
};

connectToMongoDB();

const userSchema = new mongoose.Schema({
  name: String,
  lname: String,
  email: String,
  number: Number,
  password: String,
  gender: String,
});

const User = new mongoose.model("user", userSchema);

//Routes

app.post("/login", async (req, res) => {
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

app.post("/Signup", async (req, res) => {
  const { name, lname, email, number, password, gender } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
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

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
