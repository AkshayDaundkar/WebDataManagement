import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const heroImage =
  "https://images.unsplash.com/photo-1554284126-aa88f22d8b73?fit=crop&w=1200&q=80";
const workoutIcon = "https://cdn-icons-png.flaticon.com/512/1041/1041916.png";
const nutritionIcon = "https://cdn-icons-png.flaticon.com/512/3075/3075977.png";
const insightsIcon = "https://cdn-icons-png.flaticon.com/512/1828/1828937.png";
const chatbotIcon = "https://cdn-icons-png.flaticon.com/512/2463/2463510.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to FitnessXTracker</h1>
          <p>
            Your Smart Companion for Fitness Tracking, Nutrition & AI-powered
            Insights.
          </p>
          <button className="cta-button" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
        <div className="hero-image">
          <img
            src="https://www.myfitnesspal.com/_next/image?url=%2Fpages%2Fhome%2Flogged-out-v2%2Fhero-phone-large.png&w=512&q=75"
            alt="Fitness Hero"
            style={{
              width: "20%",
              height: "10%",
              borderRadius: "10px",
              marginLeft: "20%",
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose FitnessXTracker?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src={workoutIcon} alt="Workout Tracking" />
            <h3>Workout Tracking</h3>
            <p>
              Log your exercises, track calories burned, and monitor your
              progress over time with ease.
            </p>
          </div>
          <div className="feature-card">
            <img src={nutritionIcon} alt="Nutrition Logging" />
            <h3>Nutrition Management</h3>
            <p>
              Track your daily meals, calorie intake, and view detailed
              nutritional insights easily.
            </p>
          </div>
          <div className="feature-card">
            <img src={insightsIcon} alt="AI Insights" />
            <h3>AI-Powered Insights</h3>
            <p>
              Receive dynamic fitness suggestions, goal tracking advice, and
              personalized recommendations.
            </p>
          </div>
          <div className="feature-card">
            <img src={chatbotIcon} alt="Fitness Chatbot" />
            <h3>Fitness Chatbot</h3>
            <p>
              Ask fitness questions anytime and get instant AI-generated smart
              responses, 24/7.
            </p>
          </div>
        </div>
      </section>

      <section className="core-features-section">
        <h2>Our Core Features</h2>
        <div className="core-features-grid">
          <ul className="core-features-list">
            <li>User Registration & Secure Authentication (JWT)</li>
            <li>Personalized Dashboard with Fitness Goals</li>
            <li>Real-time Workout Logging & Calories Burned Visualization</li>
            <li>Nutrition Tracking with Daily Calorie Intake Monitoring</li>
          </ul>
          <ul className="core-features-list">
            <li>AI Insights for Personalized Workout and Diet Suggestions</li>
            <li>Exercise Finder by Muscle Groups or Difficulty Level</li>
            <li>Nutrition Facts Lookup for Smarter Food Choices</li>
            <li>24/7 AI Fitness Chatbot for Personalized Support</li>
          </ul>
        </div>
      </section>

      {/* Call to Action Bottom */}
      <section className="cta-bottom-section">
        <h2>Ready to Transform Your Fitness Journey?</h2>
        <p>
          Sign up today and take the first step towards a smarter, healthier
          you.
        </p>
        <button className="cta-button" onClick={() => navigate("/register")}>
          Join Now
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
