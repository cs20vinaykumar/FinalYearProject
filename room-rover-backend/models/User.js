import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  password: String,
  // cnic: String,
  gender: String,
  userType: String,
  file: [
    {
      type: String,
      require: true,
    },
  ],
  approvedByAdmin: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "formData" }], // Posts made by the user
  bookedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }], // Posts booked by the user
});

const User = new mongoose.model("user", userSchema);

export default User;
