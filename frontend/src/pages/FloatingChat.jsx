import React, { useState } from "react";
import AIChatPage from "./AIChatPage"; // Import the AI Chat component
import "./FloatingChat.css"; // Custom CSS for styling

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button className="floating-chat-btn" onClick={() => setIsOpen(true)}>
        💬
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="chat-modal-overlay">
          <div className="chat-modal">
            <p
              className="close-btn"
              style={{ textAlign: "right" }}
              onClick={() => setIsOpen(false)}
            >
              ✖
            </p>
            <AIChatPage />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;
