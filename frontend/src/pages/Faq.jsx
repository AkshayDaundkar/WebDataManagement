import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "What is FitnessXTracker?",
    answer:
      "FitnessXTracker is an AI-powered fitness platform that allows users to track workouts, monitor nutrition, set fitness goals, and receive personalized recommendations to optimize their fitness journey.",
  },
  {
    question: "How do I log my workouts?",
    answer:
      "You can log workouts directly from the Dashboard. Just select the type of workout, duration, and calories burned, and the system will update your progress automatically.",
  },
  {
    question: "Can I track my daily calorie intake?",
    answer:
      "Yes! Our Nutrition Tracking module lets you log all your meals. You can categorize them (breakfast, lunch, snacks, dinner) and view detailed calorie charts over time.",
  },
  {
    question: "How does the AI provide personalized insights?",
    answer:
      "The AI analyzes your workout logs, calorie intake, and fitness goals to suggest personalized workouts, diet tips, and motivational advice to improve your overall fitness journey.",
  },
  {
    question: "Is my fitness data secure?",
    answer:
      "Absolutely. We use JWT-based authentication, secure password encryption, and follow strict data protection protocols to ensure your information stays private and safe.",
  },
  {
    question: "Can I find exercises for specific muscle groups?",
    answer:
      "Yes! Our Exercise Finder lets you search exercises by muscle group, equipment needed, or difficulty level, helping you customize your workouts easily.",
  },
  {
    question: "What if I have questions about my fitness plan?",
    answer:
      "You can use our AI Fitness Chatbot to ask any fitness-related questions and get instant, intelligent responses tailored to your needs — 24/7!",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-toggle-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
