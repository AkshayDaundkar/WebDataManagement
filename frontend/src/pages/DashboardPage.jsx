import React, { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import { FiDownload, FiMaximize2 } from "react-icons/fi"; // import React Icons (optional)

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import "./DashboardPage.css";

const DashboardPage = () => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);
  const [burnedCalories, setBurnedCalories] = useState([]);
  const [foodIntake, setFoodIntake] = useState([]);
  const [newActivity, setNewActivity] = useState("");
  const [newCalories, setNewCalories] = useState("");
  const [newFoodCategory, setNewFoodCategory] = useState("");
  const [newFoodCalories, setNewFoodCalories] = useState("");
  const [insights, setInsights] = useState(""); // AI-Powered Insights

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [manualActivity, setManualActivity] = useState("");
  const [manualFoodCategory, setManualFoodCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userResponse = await axios.get(
        `https://webdatamanagement.onrender.com/api/users/${userId}`
      );
      setUser(userResponse.data);

      const burnedResponse = await axios.get(
        `https://webdatamanagement.onrender.com/api/burned-calories/${userId}`
      );
      setBurnedCalories(burnedResponse.data);

      const foodResponse = await axios.get(
        `https://webdatamanagement.onrender.com/api/food-intake/${userId}`
      );
      setFoodIntake(foodResponse.data);
      generateInsights(burnedResponse.data, foodResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const addBurnedCalories = async () => {
    const activityName =
      manualActivity.trim() !== "" ? manualActivity : newActivity;
    if (!activityName || isNaN(newCalories) || newCalories <= 0) return;

    await axios.post(
      "https://webdatamanagement.onrender.com/api/burned-calories",
      {
        userId,
        activity: activityName,
        calories: parseInt(newCalories),
        date: new Date(),
      }
    );

    setNewActivity("");
    setManualActivity("");
    setNewCalories("");
    fetchData(); // Re-fetch data
  };

  const addFoodIntake = async () => {
    const categoryName =
      manualFoodCategory.trim() !== "" ? manualFoodCategory : newFoodCategory;
    if (!categoryName || isNaN(newFoodCalories) || newFoodCalories <= 0) return;

    await axios.post("https://webdatamanagement.onrender.com/api/food-intake", {
      userId,
      category: categoryName,
      calories: parseInt(newFoodCalories),
      date: new Date(),
    });

    setNewFoodCategory("");
    setManualFoodCategory("");
    setNewFoodCalories("");
    fetchData(); // Re-fetch data
  };

  const deleteBurnedCalories = async (id) => {
    await axios.delete(
      `https://webdatamanagement.onrender.com/api/burned-calories/${id}`
    );
    fetchData();
  };

  const deleteFoodIntake = async (id) => {
    await axios.delete(
      `https://webdatamanagement.onrender.com/api/food-intake/${id}`
    );
    fetchData();
  };

  const totalBurned = burnedCalories.reduce(
    (acc, entry) => acc + entry.calories,
    0
  );
  const totalConsumed = foodIntake.reduce(
    (acc, entry) => acc + entry.calories,
    0
  );
  const calorieGoal = 2400; // Static goal

  // Update Pie Chart for Calories Consumed
  const pieData = [
    { name: "Calories Consumed", value: totalConsumed },
    { name: "Remaining", value: Math.max(calorieGoal - totalConsumed, 0) },
  ];

  // Update Bar Chart for Calories Burned
  const barData = [
    { name: "Burned", value: totalBurned },
    { name: "Goal", value: 2400 },
  ];

  // Line Chart Data for Calories Burned Over Time
  const lineChartData = burnedCalories.map((entry) => {
    const d = new Date(entry.date);
    return {
      date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`, // 👉 yyyy-mm-dd format
      rawDate: d, // full Date object
      calories: entry.calories,
    };
  });

  const intakeChartData = foodIntake.map((entry) => {
    const d = new Date(entry.date);
    return {
      date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`,
      rawDate: d,
      calories: entry.calories,
    };
  });

  const filteredBurnedData = lineChartData.filter((entry) => {
    const entryDate = new Date(entry.rawDate);
    const entryOnlyDate = new Date(
      entryDate.getFullYear(),
      entryDate.getMonth(),
      entryDate.getDate()
    );
    return (
      (!startDate || entryOnlyDate >= new Date(startDate)) &&
      (!endDate || entryOnlyDate <= new Date(endDate))
    );
  });

  const filteredIntakeData = intakeChartData.filter((entry) => {
    const entryDate = new Date(entry.rawDate);
    const entryOnlyDate = new Date(
      entryDate.getFullYear(),
      entryDate.getMonth(),
      entryDate.getDate()
    ); // 👈 remove time portion!

    return (
      (!startDate || entryOnlyDate >= new Date(startDate)) &&
      (!endDate || entryOnlyDate <= new Date(endDate))
    );
  });

  const generateInsights = (burnedCalories, foodIntake) => {
    const totalBurned = burnedCalories.reduce(
      (acc, entry) => acc + entry.calories,
      0
    );
    const totalConsumed = foodIntake.reduce(
      (acc, entry) => acc + entry.calories,
      0
    );
    const calorieGoal = 2400; // Static goal for now

    let message = "";

    if (totalConsumed > totalBurned) {
      message =
        "⚠️ You are consuming more calories than you're burning! Consider reducing sugar intake and opting for high-protein, low-carb meals.";
      message +=
        " 🥦 Include more leafy greens, lean protein (chicken, fish, tofu), and whole grains in your diet.";
      message +=
        " 🏃 Try incorporating cardio exercises like running, cycling, or HIIT for better calorie balance.";
    } else if (totalBurned > totalConsumed) {
      message =
        "✅ Great job! You're burning more calories than you're consuming. Keep up the good work!";
      message +=
        " 🍌 Consider adding healthy fats (avocado, nuts) and protein-rich meals to maintain muscle mass.";
      message +=
        " 🏋️‍♂️ Strength training can help you retain muscle while losing fat.";
    } else {
      message =
        "⚖️ Your calorie intake and burn are balanced. Maintain this to sustain your fitness level.";
      message +=
        " 🍉 Stay hydrated and include fiber-rich foods to keep your metabolism in check.";
    }

    if (totalBurned >= calorieGoal) {
      message += " 🎯 You've reached your daily calorie burn goal!";
      message +=
        " 🥗 Continue eating a balanced diet and adjust based on your activity levels.";
    } else {
      message += ` 🔥 You need to burn ${
        calorieGoal - totalBurned
      } more calories to meet your goal.`;
      message +=
        " 💡 Try increasing your daily steps to 10,000 or adding a quick 30-minute workout.";
    }

    if (totalConsumed > 3000) {
      message +=
        " ⚠️ You’ve consumed over 3000 calories today. Avoid sugary drinks and processed foods.";
    }

    setInsights(message);
  };

  const downloadChart = (id, filename) => {
    const chartElement = document.getElementById(id);
    html2canvas(chartElement).then((canvas) => {
      const link = document.createElement("a");
      link.download = filename;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const openFullscreen = (id) => {
    const elem = document.getElementById(id);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage <= 30) {
      return "#e74c3c"; // Red
    } else if (percentage <= 70) {
      return "#f39c12"; // Yellow
    } else {
      return "#2ecc71"; // Green
    }
  };

  return (
    <div className="dashboard-container">
      {user && (
        <h2 className="greeting">Hello, {user.name}! Your Fitness Dashboard</h2>
      )}

      {/* 🔥 AI-Powered Insights Section */}
      <div className="insights-container">
        <h3>📊 AI-Powered Insights</h3>
        <p>{insights}</p>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{
            width: `${Math.min((totalBurned / calorieGoal) * 100, 100)}%`,
            background: getProgressColor((totalBurned / calorieGoal) * 100),
          }}
        >
          {Math.min((totalBurned / calorieGoal) * 100, 100).toFixed(0)}%
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Row 1: Calories Burned & Tracking */}
        <div className="chart-container">
          <h3>Calories Burned vs Goal</h3>
          <div className="chart-wrapper" id="burnedGoalChart">
            <div className="floating-icons">
              <FiDownload
                size={20}
                title="Download Chart"
                onClick={() =>
                  downloadChart("burnedGoalChart", "CaloriesBurnedGoal.png")
                }
              />
              <FiMaximize2
                size={20}
                title="Fullscreen"
                onClick={() => openFullscreen("burnedGoalChart")}
              />
            </div>
            <BarChart width={400} height={400} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {" "}
                {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.name === "Burned" ? "#27ae60" : "#e74c3c"}
                  />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>

        <div className="calorie-tracker">
          <h3>Track Calories Burned</h3>

          {/* Select from dropdown */}
          <select
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
          >
            <option value="">Select Activity</option>
            <option value="Running">🏃 Running</option>
            <option value="Cycling">🚴 Cycling</option>
            <option value="Swimming">🏊 Swimming</option>
            <option value="Weightlifting">🏋️‍♂️ Weightlifting</option>
          </select>

          {/* OR manually type */}
          <input
            type="text"
            placeholder="Or type activity manually"
            value={manualActivity}
            onChange={(e) => setManualActivity(e.target.value)}
            style={{ padding: "5px" }}
          />

          <input
            type="number"
            placeholder="Calories burned"
            value={newCalories}
            onChange={(e) => setNewCalories(e.target.value)}
            style={{ padding: "5px" }}
          />

          <button
            style={{ backgroundColor: "#f4a261" }}
            onClick={addBurnedCalories}
          >
            Add
          </button>

          <ul className="burned-list">
            {burnedCalories.map((entry) => (
              <li key={entry._id} className="burned-item">
                {entry.activity}: {entry.calories} kcal
                <p onClick={() => deleteBurnedCalories(entry._id)}>❌</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="chart-container">
          <div className="date-filter-container">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
            >
              Clear
            </button>
          </div>
          <h3>Calories Burned Over Time</h3>
          <LineChart width={400} height={400} data={filteredBurnedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9 }}
              label={{
                value: "Date",
                angle: 0,
                position: "insideBottom",
                dy: 10,
              }}
            />
            <YAxis
              label={{
                value: "Calories",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="calories" stroke="#0000FF" />
          </LineChart>
        </div>

        {/* Row 2: Calories Consumed & Tracking */}
        <div className="chart-container">
          <h3>Daily Calorie Intake</h3>
          <div className="chart-wrapper" id="calorieIntakeChart">
            {/* Floating Icon Buttons */}
            <div className="floating-icons">
              <FiDownload
                size={20}
                title="Download Chart"
                onClick={() =>
                  downloadChart("calorieIntakeChart", "CaloriesIntake.png")
                }
              />
              <FiMaximize2
                size={20}
                title="Fullscreen"
                onClick={() => openFullscreen("calorieIntakeChart")}
              />
            </div>

            {/* PieChart inside */}
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#ff7f50", "#87CEEB"][index]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        <div className="food-tracker">
          <h3>Track Food Intake</h3>

          {/* Select from dropdown */}
          <select
            value={newFoodCategory}
            onChange={(e) => setNewFoodCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Breakfast">🍳 Breakfast</option>
            <option value="Lunch">🥗 Lunch</option>
            <option value="Dinner">🍛 Dinner</option>
            <option value="Snacks">🍪 Snacks</option>
            <option value="Drinks">🥤 Drinks</option>
          </select>

          {/* OR manually type */}
          <input
            type="text"
            placeholder="Or type food manually"
            value={manualFoodCategory}
            onChange={(e) => setManualFoodCategory(e.target.value)}
            style={{ padding: "5px" }}
          />

          <input
            type="number"
            placeholder="Calories consumed"
            value={newFoodCalories}
            onChange={(e) => setNewFoodCalories(e.target.value)}
            style={{ padding: "5px" }}
          />

          <button
            style={{ backgroundColor: "#f4a261" }}
            onClick={addFoodIntake}
          >
            Add
          </button>

          <ul className="burned-list">
            {foodIntake.map((entry, index) => (
              <li key={index} className="burned-item">
                {entry.category}: {entry.calories} kcal
                <p onClick={() => deleteFoodIntake(entry._id)}>❌</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="chart-container">
          <h3>Calories Taken Over Time</h3>
          <div className="date-filter-container">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
            >
              Clear
            </button>
          </div>
          <LineChart width={400} height={400} data={filteredIntakeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9 }}
              label={{
                value: "Date",
                angle: 0,
                position: "insideBottom",
                dy: 10,
              }}
            />
            <YAxis
              label={{ value: "Calories", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="calories" stroke="#27ae60" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
