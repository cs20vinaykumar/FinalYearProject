import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: Number, required: true },
  expireIn: { type: Number, required: true },
});

const OTP = new mongoose.model("OTP", OTPSchema, "OTP");

export default OTP;
