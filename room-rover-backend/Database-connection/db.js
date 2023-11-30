import mongoose, { model } from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/room-rover");

    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.error("Connection error:", error.message);
  }
};

export default connectToMongoDB;
