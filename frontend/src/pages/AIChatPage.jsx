import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AIChatPage.css"; // CSS for Chat styling

const AIChatPage = () => {
  const userId = localStorage.getItem("userId"); // Get logged-in user ID
  const storageKey = `chatHistory-${userId}`; // Unique key for each user in localStorage
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState(
    JSON.parse(localStorage.getItem(storageKey)) || []
  );

  // Function to send a message and update chat history
  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChatHistory = [...responses, { text: message, isUser: true }];

    try {
      const res = await axios.post(
        "https://webdatamanagement.onrender.com/api/ai/chat",
        { message }
      );

      newChatHistory.push({ text: res.data.response, isUser: false });

      // Store the updated history in localStorage
      localStorage.setItem(storageKey, JSON.stringify(newChatHistory));
      setResponses(newChatHistory);
    } catch (error) {
      console.error("Error fetching AI response", error);
    }
    setMessage("");
  };

  // Clear chat history function
  const clearChatHistory = () => {
    localStorage.removeItem(storageKey);
    setResponses([]);
  };

  return (
    <div className="chat-containerai">
      <h2>🤖 AI Fitness Chatbot</h2>
      <button className="clear-btn" onClick={clearChatHistory}>
        Clear Chat
      </button>
      <div className="chat-boxai">
        {responses.map((msg, index) => (
          <p key={index} className={msg.isUser ? "user-msg" : "bot-msg"}>
            {msg.text}
          </p>
        ))}
      </div>
      <div className="input-boxai">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button style={{ backgroundColor: "#f4a261" }} onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default AIChatPage;
