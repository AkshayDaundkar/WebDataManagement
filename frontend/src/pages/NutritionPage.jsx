import React, { useState } from "react";
import axios from "axios";
import "./NutritionPage.css";

const NutritionPage = () => {
  const [foodItem, setFoodItem] = useState("");
  const [nutrition, setNutrition] = useState(null);

  const fetchNutrition = async () => {
    try {
      const response = await axios.get(
        `https://webdatamanagement.onrender.com/api/nutrition/${foodItem}`
      );
      setNutrition(response.data[0]); // Assuming API returns an array
    } catch (error) {
      console.error("Error fetching nutrition info", error);
    }
  };

  return (
    <div className="nutrition-page">
      <h1>
        <span style={{ color: "#f4a261" }}>Nutrition Facts</span>
      </h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for food (e.g., Apple)"
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
        />
        <button style={{ backgroundColor: "#f4a261" }} onClick={fetchNutrition}>
          Get Nutrition Info
        </button>
      </div>

      {nutrition && (
        <div className="nutrition-container">
          <h2 className="nutrition-title">
            {nutrition.name} <span>🥗</span>
          </h2>
          <div className="nutrition-grid">
            <div className="nutrition-item">
              <span>🍞</span> <strong>Carbs:</strong>{" "}
              {nutrition.carbohydrates_total_g} g
            </div>
            <div className="nutrition-item">
              <span>🌾</span> <strong>Fiber:</strong> {nutrition.fiber_g} g
            </div>
            <div className="nutrition-item">
              <span>🍬</span> <strong>Sugar:</strong> {nutrition.sugar_g} g
            </div>
            <div className="nutrition-item">
              <span>🧈</span> <strong>Total Fat:</strong>{" "}
              {nutrition.fat_total_g} g
            </div>
            <div className="nutrition-item">
              <span>🥩</span> <strong>Saturated Fat:</strong>{" "}
              {nutrition.fat_saturated_g} g
            </div>
            <div className="nutrition-item">
              <span>🩸</span> <strong>Cholesterol:</strong>{" "}
              {nutrition.cholesterol_mg} mg
            </div>
            <div className="nutrition-item">
              <span>🧂</span> <strong>Sodium:</strong> {nutrition.sodium_mg} mg
            </div>
            <div className="nutrition-item">
              <span>🍌</span> <strong>Potassium:</strong>{" "}
              {nutrition.potassium_mg} mg
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionPage;
