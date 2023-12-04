import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  email: String,
  code: Number,
  expireIn: Number,
});

const OTP = new mongoose.model("OTP", OTPSchema, 'OTP');

export default OTP;
