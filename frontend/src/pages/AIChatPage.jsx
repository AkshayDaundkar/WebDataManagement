import React, { useState } from "react";
import axios from "axios";
import "./AIChatPage.css"; // CSS for Chat styling

const AIChatPage = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setResponses([...responses, { text: message, isUser: true }]);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        message,
      });
      setResponses((prev) => [
        ...prev,
        { text: res.data.response, isUser: false },
      ]);
    } catch (error) {
      console.error("Error fetching AI response", error);
    }
    setMessage("");
  };

  return (
    <div className="chat-container">
      <h2>🤖 AI Fitness Chatbot</h2>
      <div className="chat-box">
        {responses.map((msg, index) => (
          <p key={index} className={msg.isUser ? "user-msg" : "bot-msg"}>
            {msg.text}
          </p>
        ))}
      </div>
      <div className="input-box">
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
