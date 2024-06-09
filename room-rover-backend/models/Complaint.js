import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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
    enum: ["user", "property"],
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
    enum: ["pending", "resolved", "closed"],
    default: "pending",
  },
  resolvedAt: {
    type: Date,
    default: null,
  },
});

const Complain = mongoose.model("Complaint", complaintSchema);

export default Complain;
