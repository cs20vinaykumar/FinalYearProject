import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  lname: String,
  email: String,
  number: Number,
  password: String,
  gender: String,
  userType: String
});

const User = new mongoose.model("user", userSchema);

export default User;
