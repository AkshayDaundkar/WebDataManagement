import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GroupChat.css";

export default function GroupChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      if (userId && token) {
        try {
          const response = await axios.get(
            `https://webdatamanagement.onrender.com/api/users/${userId}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };
    fetchUser();
  }, [userId, token]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // refresh every 3s
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleSend = async () => {
    if (!newMessage || !user) return;

    try {
      await axios.post("http://localhost:5000/api/messages", {
        senderName: user.name,
        message: newMessage,
      });
      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <h2 className="chat-title">Chat With FitnessXTracker Members</h2>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`message-wrapper ${
                msg.senderName === user?.name ? "own" : ""
              }`}
            >
              <div
                className={`chat-bubble ${
                  msg.senderName === user?.name ? "own" : ""
                }`}
              >
                <div className="chat-sender">{msg.senderName}</div>
                <div className="chat-text">{msg.message}</div>
                <div className="chat-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="chat-input"
          />
        </div>
        <button onClick={handleSend} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
  );
}
