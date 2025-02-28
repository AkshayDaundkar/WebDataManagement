import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          © {new Date().getFullYear()} Fitness X Tracker | All rights reserved
          2025.
        </p>

        <div className="footer-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/exercises">Exercises</Link>
          <Link to="/nutrition">Nutrition</Link>
          <Link to="/ai-chat">AI Chat</Link>
        </div>

        <div className="social-links">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
