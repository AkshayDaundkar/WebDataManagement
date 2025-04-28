import React from "react";
import "./AboutUs.css";

const teamMembers = [
  {
    name: "Akshay Daundkar",
    role: "Personalized Nutrition & AI Meal Recommendations",
  },
  {
    name: "Arun Sabarish Krishnaswamy Ganesan",
    role: "Workout Management & Tracking",
  },
  {
    name: "Pallavi Chowdary Gogineni",
    role: "AI-Powered Fitness Insights & Predictions",
  },
  {
    name: "Kevin Gomez",
    role: "User Registration, Management & Authentication",
  },
  {
    name: "Sanket Rajendrakumar More",
    role: "Smart Fitness Plans & Goal Tracking",
  },
];

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About FitnessXTracker</h1>

      <section className="intro-section">
        <p>
          FitnessXTracker is an AI-powered fitness tracking platform designed to
          help users monitor workouts, log nutrition, set fitness goals, and
          receive personalized recommendations. Built with modern web
          technologies and backed by AI, it provides real-time insights,
          predictive analytics, and a seamless experience across devices. Our
          mission is to make fitness management smarter, more engaging, and
          highly personalized for everyone.
        </p>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-cards">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">{member.name.charAt(0)}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="guidance-section">
        <h2>Guidance</h2>
        <p>
          With guidance from Prof. Dr. Elizabeth D Diaz and Aliu Akinwale, we
          collaboratively developed this platform, focusing on web data
          management principles and AI integration.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
