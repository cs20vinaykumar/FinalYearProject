import mongoose from "mongoose";

const chatSchema = new Schema({
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  }],
  
  messages: [{
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
});

const Chat = new mongoose.model('Chat', chatSchema);

export default Chat;
