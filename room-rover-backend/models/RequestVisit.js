import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const requestVisit = new mongoose.model("RoomVisit", visitSchema, "RoomVisit");

export default requestVisit;
