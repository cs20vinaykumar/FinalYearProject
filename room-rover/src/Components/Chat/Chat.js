import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:4000");

const Chat = ({ onClose, productId, postedBy }) => {
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { userID } = jwtDecode(token);
          setUserId(userID);
          console.log("User ID:", userID);
          socket.emit("joinRoom", { roomId: productId });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    fetchUserId();
  }, [productId]);

  useEffect(() => {
    const fetchMessages = async () => {
      console.log("firstTime");
      try {
        if (userId) {
          const response = await axios.get(
            `http://localhost:4000/chat/${productId}/${userId}/${postedBy._id}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.data) {
            // setMessages(response.data.messages);
            // console.log("Fetched messages:", response.data.messages);

            const transformedMessages = response.data.messages.map(
              (message) => ({
                sender: message.sender._id,
                receiver: message.receiver._id,
                text: message.text,
                _id: message._id,
                timestamp: message.timestamp,
              })
            );

            setMessages(transformedMessages);
            console.log(
              "Fetched and transformed messages:",
              transformedMessages
            );
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [userId, productId, postedBy._id]);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, []);
  const handleSend = async () => {
    try {
      if (input.trim() !== "") {
        const newMessage = {
          sender: userId,
          receiver: postedBy._id,
          text: input,
          roomId: productId,
        };

        socket.emit("sendMessage", newMessage);
        const response = await axios.post(
          `http://localhost:4000/chat/${productId}`,
          newMessage,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("response.data.messages", response.data.messages);
        setMessages(response.data.messages);
        setInput("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };

  return (
    <div className="chat-modal">
      <div className="chat-header">
        <h3>Chat</h3>
        <button onClick={onClose} className="close-button">
          &times;
        </button>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === userId ? "sent" : "received"
            }`}
          >
            <div className={msg.sender === userId ? "sender" : "receiver"}>
              {msg.text}
            </div>
            <div className="message-time">{formatTime(msg.timestamp)}</div>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
