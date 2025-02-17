import React, { useEffect, useState } from "react";
import axios from "axios";
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

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const userResponse = await axios.get(
        `https://webdatamanagement.onrender.com//api/users/${userId}`
      );
      setUser(userResponse.data);

      const burnedResponse = await axios.get(
        `https://webdatamanagement.onrender.com//api/burned-calories/${userId}`
      );
      setBurnedCalories(burnedResponse.data);

      const foodResponse = await axios.get(
        `https://webdatamanagement.onrender.com//api/food-intake/${userId}`
      );
      setFoodIntake(foodResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const addBurnedCalories = async () => {
    if (!newActivity || isNaN(newCalories) || newCalories <= 0) return;
    await axios.post(
      "https://webdatamanagement.onrender.com//api/burned-calories",
      {
        userId,
        activity: newActivity,
        calories: parseInt(newCalories),
      }
    );
    setNewActivity("");
    setNewCalories("");
    fetchData(); // Re-fetch data to update UI
  };

  const addFoodIntake = async () => {
    if (!newFoodCategory || isNaN(newFoodCalories) || newFoodCalories <= 0)
      return;
    await axios.post(
      "https://webdatamanagement.onrender.com//api/food-intake",
      {
        userId,
        category: newFoodCategory,
        calories: parseInt(newFoodCalories),
      }
    );
    setNewFoodCategory("");
    setNewFoodCalories("");
    fetchData(); // Re-fetch data to update UI
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
    { name: "Goal", value: 1500 },
  ];

  // Line Chart Data for Calories Burned Over Time
  const lineChartData = burnedCalories.map((entry, index) => ({
    name: `Entry ${index + 1}`,
    calories: entry.calories,
  }));

  const intakeChartData = foodIntake.map((entry, index) => ({
    name: `Entry ${index + 1}`,
    calories: entry.calories,
  }));

  return (
    <div className="dashboard-container">
      {user && (
        <h2 className="greeting">Hello, {user.name}! Your Fitness Dashboard</h2>
      )}

      <div className="dashboard-grid">
        {/* Row 1: Calories Burned & Tracking */}
        <div className="chart-container">
          <h3>Calories Burned vs Goal</h3>
          <BarChart width={450} height={450} data={barData}>
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

        <div className="calorie-tracker">
          <h3>Track Calories Burned</h3>
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

          <input
            type="number"
            placeholder="Calories burned"
            value={newCalories}
            onChange={(e) => setNewCalories(e.target.value)}
          />
          <button
            style={{ backgroundColor: "#f4a261" }}
            onClick={addBurnedCalories}
          >
            Add
          </button>

          <ul>
            {burnedCalories.map((entry, index) => (
              <li key={index}>
                {entry.activity}: {entry.calories} kcal
              </li>
            ))}
          </ul>
        </div>

        <div className="chart-container">
          <h3>Calories Burned Over Time</h3>
          <LineChart width={450} height={450} data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="calories" stroke="#0000FF" />
          </LineChart>
        </div>

        {/* Row 2: Calories Consumed & Tracking */}
        <div className="chart-container">
          <h3>Daily Calorie Intake</h3>
          <PieChart width={450} height={450}>
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

        <div className="food-tracker">
          <h3>Track Food Intake</h3>
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

          <input
            type="number"
            placeholder="Calories consumed"
            value={newFoodCalories}
            onChange={(e) => setNewFoodCalories(e.target.value)}
          />
          <button
            style={{ backgroundColor: "#f4a261" }}
            onClick={addFoodIntake}
          >
            Add
          </button>

          <ul>
            {foodIntake.map((entry, index) => (
              <li key={index}>
                {entry.category}: {entry.calories} kcal
              </li>
            ))}
          </ul>
        </div>

        <div className="chart-container">
          <h3>Calories Taken Over Time</h3>
          <LineChart width={450} height={450} data={intakeChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="calories" stroke="#27ae60" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
