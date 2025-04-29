import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NutritionPage.css";
import { toast } from "react-toastify";

const NutritionPage = () => {
  const [foodItem, setFoodItem] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState("All");

  // On load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("nutritionHistory")) || [];
    setHistory(saved);
  }, []);

  const fetchNutrition = async (item = foodItem) => {
    if (!item.trim()) {
      toast.warn("Please enter a food item.");
      return;
    }

    try {
      const res = await axios.get(
        `https://webdatamanagement.onrender.com/api/nutrition/${item}`
      );

      if (!res.data || res.data.length === 0) {
        toast.error("No nutrition data found for that item.");
        return;
      }

      const data = res.data[0];
      setNutrition(data);
      toast.success(`Loaded data for "${data.name}"`);

      const today = new Date().toISOString().split("T")[0];
      const newEntry = { name: data.name, date: today };

      const isDuplicate = history.some(
        (e) =>
          e.name.toLowerCase() === data.name.toLowerCase() && e.date === today
      );

      if (!isDuplicate) {
        const updated = [newEntry, ...history];
        setHistory(updated);
        localStorage.setItem("nutritionHistory", JSON.stringify(updated));
      }
    } catch (err) {
      toast.error("Failed to fetch nutrition info. Try again later.");
      console.error("Fetch failed:", err);
    }
  };

  const handleClear = () => {
    localStorage.removeItem("nutritionHistory");
    setHistory([]);
  };

  const uniqueDates = [...new Set(history.map((item) => item.date))];

  const filteredHistory =
    selectedDate === "All"
      ? history
      : history.filter((item) => item.date === selectedDate);

  return (
    <div className="nutrition-page-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>🗂️ Saved Searches</h3>
          <select
            onChange={(e) => setSelectedDate(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Dates</option>
            {uniqueDates.map((date, idx) => (
              <option key={idx} value={date}>
                {date}
              </option>
            ))}
          </select>
          <button className="clear-btn" onClick={handleClear}>
            🗑 Clear
          </button>
        </div>
        <ul className="history-list">
          {filteredHistory.map((item, index) => (
            <li key={index} className="history-item">
              <div
                className="history-label"
                onClick={() => fetchNutrition(item.name)}
              >
                <strong>{item.name}</strong> <span>{item.date}</span>
              </div>
              <p
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation(); // prevent triggering fetch
                  const updated = history.filter((_, i) => i !== index);
                  setHistory(updated);
                  localStorage.setItem(
                    "nutritionHistory",
                    JSON.stringify(updated)
                  );
                  toast.info("Item removed");
                }}
              >
                ❌
              </p>
            </li>
          ))}
          {filteredHistory.length === 0 && (
            <p style={{ fontSize: "0.9rem", color: "#aaa" }}>No items</p>
          )}
        </ul>
      </aside>

      {/* Main */}
      <main className="nutrition-page">
        <h1>
          <span style={{ color: "#f4a261" }}>
            Nutrition Facts of Food Items
          </span>
        </h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for food (e.g., Apple)"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
          />
          <button onClick={() => fetchNutrition()}>Get Nutrition Info</button>
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
                <span>🧂</span> <strong>Sodium:</strong> {nutrition.sodium_mg}{" "}
                mg
              </div>
              <div className="nutrition-item">
                <span>🍌</span> <strong>Potassium:</strong>{" "}
                {nutrition.potassium_mg} mg
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NutritionPage;
