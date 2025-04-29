import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ExercisePage.css";

const exerciseImages = {
  "Dumbbell Bench Press":
    "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press-1.gif",
  Pushups:
    "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif",
  "Close-grip bench press":
    "https://fitnessprogramer.com/wp-content/uploads/2021/02/Close-Grip-Bench-Press.gif",
  "Dumbbell Flyes":
    "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Fly.gif",
  "Incline dumbbell bench press":
    "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press-1.gif",
  "Low-cable cross-over":
    "https://fitnessprogramer.com/wp-content/uploads/2021/02/Low-Cable-Crossover.gif",
  "Barbell Bench Press - Medium Grip":
    "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif",
  "Chest dip":
    "https://fitnessprogramer.com/wp-content/uploads/2021/06/Chest-Dips.gif",
  "Decline Dumbbell Flyes":
    "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bench-Press-Muscle-work-300x300.png",
  "Bodyweight Flyes":
    "https://fitnessprogramer.com/wp-content/uploads/2023/06/Incline-Chest-Fly-Machine.gif",
};

const ExercisePage = () => {
  const [muscle, setMuscle] = useState("");
  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [exercises, setExercises] = useState([]);
  const [expandedInstructions, setExpandedInstructions] = useState({});
  const [history, setHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState("All");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("exerciseHistory")) || [];
    setHistory(saved);
  }, []);

  const fetchExercises = async (
    muscleInput = muscle,
    typeInput = type,
    difficultyInput = difficulty
  ) => {
    if (!muscleInput.trim()) {
      toast.warn("Please enter a muscle group.");
      return;
    }

    try {
      const params = new URLSearchParams();
      if (muscleInput) params.append("muscle", muscleInput);
      if (typeInput) params.append("type", typeInput);
      if (difficultyInput) params.append("difficulty", difficultyInput);

      const url = `https://api.api-ninjas.com/v1/exercises?${params.toString()}`;
      const response = await axios.get(url, {
        headers: { "X-Api-Key": "rUfmojtYXARo0lfyK9E+0w==f2ALW2rtlqCozts0" }, // Replace with your actual API key
      });

      if (!response.data || response.data.length === 0) {
        toast.error("No exercises found with those filters.");
        setExercises([]);
        return;
      }

      setExercises(response.data);
      toast.success(`Found ${response.data.length} exercises`);

      const today = new Date().toISOString().split("T")[0];
      const newEntry = {
        muscle: muscleInput,
        type: typeInput,
        difficulty: difficultyInput,
        date: today,
      };

      const isDuplicate = history.some(
        (e) =>
          e.muscle === muscleInput &&
          e.type === typeInput &&
          e.difficulty === difficultyInput &&
          e.date === today
      );

      if (!isDuplicate) {
        const updated = [newEntry, ...history];
        setHistory(updated);
        localStorage.setItem("exerciseHistory", JSON.stringify(updated));
      }
    } catch (error) {
      toast.error("Failed to fetch exercises. Try again later.");
      console.error(error);
    }
  };

  const handleClear = () => {
    localStorage.removeItem("exerciseHistory");
    setHistory([]);
    toast.info("Search history cleared.");
  };

  const uniqueDates = [...new Set(history.map((item) => item.date))];
  const filteredHistory =
    selectedDate === "All"
      ? history
      : history.filter((item) => item.date === selectedDate);

  const toggleExpand = (index) => {
    setExpandedInstructions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="exercise-page-wrapper">
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
                onClick={() =>
                  fetchExercises(item.muscle, item.type, item.difficulty)
                }
                className="history-label"
              >
                <strong>{item.muscle}</strong> <span>{item.date}</span>
              </div>
              <p
                className="delete-btn"
                onClick={() => {
                  const updated = history.filter((_, i) => i !== index);
                  setHistory(updated);
                  localStorage.setItem(
                    "exerciseHistory",
                    JSON.stringify(updated)
                  );
                  toast.info("Search removed");
                }}
              >
                ❌
              </p>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Page */}
      <main className="exercise-page">
        <h1>
          <span style={{ color: "#f4a261" }}>Find Exercises</span>
        </h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Enter muscle group (e.g., chest, legs)"
            value={muscle}
            onChange={(e) => setMuscle(e.target.value)}
          />
          <select
            className="filter-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="cardio">Cardio</option>
            <option value="olympic_weightlifting">Olympic Weightlifting</option>
            <option value="plyometrics">Plyometrics</option>
            <option value="powerlifting">Powerlifting</option>
            <option value="strength">Strength</option>
            <option value="stretching">Stretching</option>
            <option value="strongman">Strongman</option>
          </select>
          <select
            className="filter-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
          <button
            onClick={() => fetchExercises()}
            style={{ backgroundColor: "#f4a261" }}
          >
            Get Exercises
          </button>
        </div>

        <div className="exercise-grid">
          {exercises.length > 0 ? (
            exercises.map((exercise, index) => {
              const hasImage = exerciseImages[exercise.name];
              const instructions = exercise.instructions.split(" ");
              const shortInstructions = instructions.slice(0, 30).join(" ");
              const isExpanded = expandedInstructions[index];

              return (
                <div className="exercise-card" key={index}>
                  {hasImage && (
                    <img
                      src={exerciseImages[exercise.name]}
                      alt={exercise.name}
                    />
                  )}
                  <h3>{exercise.name}</h3>
                  <p>
                    <strong>Type:</strong> {exercise.type}
                  </p>
                  <p>
                    <strong>Difficulty:</strong> {exercise.difficulty}
                  </p>
                  <p>
                    <strong>Equipment:</strong> {exercise.equipment}
                  </p>
                  <p>
                    <strong>Instructions:</strong>{" "}
                    {isExpanded ? exercise.instructions : shortInstructions}
                    {instructions.length > 50 && (
                      <button
                        onClick={() => toggleExpand(index)}
                        style={{ backgroundColor: "#f4a261" }}
                        className="view-more"
                      >
                        {isExpanded ? "View Less" : "View More"}
                      </button>
                    )}
                  </p>
                </div>
              );
            })
          ) : (
            <p>No exercises found. Try a different muscle group or filters.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExercisePage;
