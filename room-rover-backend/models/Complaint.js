import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming userId is the ID of the user posting the complaint
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  againstType: {
    type: String,
    enum: ["user", "property"], // Adding enum for againstType
    required: true,
  },
  againstId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "resolved", "closed"], // Adding status field with enum
    default: "pending", // Default value for status
  },
  resolvedAt: {
    type: Date,
    default: null, // Default value for resolvedAt
  },
});

const Complain = mongoose.model("Complaint", complaintSchema);

export default Complain;
