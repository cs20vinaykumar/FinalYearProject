import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "user", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "user", required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "formData" },
  messages: [messageSchema],
});

export default model("Chat", chatSchema);
