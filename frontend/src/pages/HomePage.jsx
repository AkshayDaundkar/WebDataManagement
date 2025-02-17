import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <div className="dashboard-container">
        <h2>Welcome to Your Home Page</h2>
        <div className="dashboard-cards">
          <Link to="/dashboard" className="card">
            <span>📊</span>
            <h3>View Dashboard</h3>
            <p>Check your fitness progress and analytics.</p>
          </Link>

          <Link to="/exercises" className="card">
            <span>💪</span>
            <h3>Browse Exercises</h3>
            <p>Find exercises based on muscle groups.</p>
          </Link>

          <Link to="/nutrition" className="card">
            <span>🥗</span>
            <h3>Check Nutrition</h3>
            <p>Analyze nutrition values for your diet.</p>
          </Link>

          <Link to="/ai-chat" className="card">
            <span>🤖</span>
            <h3>Ask AI</h3>
            <p>Get AI-powered fitness and nutrition advice.</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
