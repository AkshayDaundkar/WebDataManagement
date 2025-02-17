import React, { useState } from "react";
import axios from "axios";
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
  const [exercises, setExercises] = useState([]);
  const [expandedInstructions, setExpandedInstructions] = useState({});

  const fetchExercises = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/exercises/${muscle}`
      );
      setExercises(response.data);
    } catch (error) {
      console.error("Error fetching exercises", error);
    }
  };

  const toggleExpand = (index) => {
    setExpandedInstructions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="exercise-page">
      <h1>
        🏋️‍♂️ <span style={{ color: "#f4a261" }}>Find Exercises</span> 💪
      </h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter muscle group (e.g., chest, legs)"
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
        />
        <button style={{ backgroundColor: "#f4a261" }} onClick={fetchExercises}>
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
          <p>No exercises found. Try a different muscle group.</p>
        )}
      </div>
    </div>
  );
};

export default ExercisePage;
