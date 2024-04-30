import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  number: Number,
  password: String,
});

const User = new mongoose.model("Admin-user", userSchema, "Admin-user");

export default User;
