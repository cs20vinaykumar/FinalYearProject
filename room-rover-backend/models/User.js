import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  password: String,
  gender: String,
  userType: String,
  file: [
    {
      type: String,
      require: true,
    },
  ],
  blocked: {
    type: Boolean,
    default: false, 
  },
  approvedByAdmin: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "formData" }], 
  bookedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }], 
});

const User = new mongoose.model("user", userSchema);

export default User;
