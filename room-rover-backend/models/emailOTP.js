import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
  email: String,
  code: Number,
  expireIn: Number,
});

const EmailOTP = new mongoose.model("EmailOTP", signupSchema, "EmailOTP");

export default EmailOTP;
