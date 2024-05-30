import express from "express";
const routerChat = express.Router();
import Chat from "../models/Chat.js";

routerChat.get("/:productId/:userId1/:userId2", async (req, res) => {
  const { productId, userId1, userId2 } = req.params;
  try {
    const chat = await Chat.findOne({
      product: productId,
      "messages.sender": { $in: [userId1, userId2] },
      "messages.receiver": { $in: [userId1, userId2] },
    }).populate("messages.sender messages.receiver");
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerChat.post("/:productId", async (req, res) => {
  const { productId } = req.params;
  const { sender, receiver, text } = req.body;
  console.log(sender, receiver, text);
  try {
    let chat = await Chat.findOne({ product: productId });
    if (!chat) {
      chat = new Chat({ product: productId, messages: [] });
    }
    chat.messages.push({ sender, receiver, text });
    await chat.save();
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default routerChat;
