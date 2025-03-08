import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";

const RegisterPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    height: "",
    weight: "",
    dailyExercise: false,
    dailyCalories: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!user.name.trim()) {
      setError("Name is required.");
      return false;
    }
    if (!user.email.trim()) {
      setError("Email is required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      setError("Please enter a valid email.");
      return false;
    }
    if (user.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (!user.height || user.height <= 0) {
      setError("Please enter a valid height.");
      return false;
    }
    if (!user.weight || user.weight <= 0) {
      setError("Please enter a valid weight.");
      return false;
    }
    if (!user.dailyCalories || user.dailyCalories <= 0) {
      setError("Please enter a valid calorie goal.");
      return false;
    }
    setError(""); // Clear errors if validation passes
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://webdatamanagement.onrender.com/api/auth/register",
        user
      );
      setUser(response.data);
      toast.success("Registration successful! You can now log in.", {
        position: "top-right",
      });
      navigate("/login");
    } catch (err) {
      setError("Error registering user.");
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>🏋️‍♂️ Join the Fitness Tracker</h2>
        {error && <p className="error-msg">{error}</p>}

        <div className="form-grid">
          <div className="left-column">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password (min 6 chars)"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <div className="right-column">
            <input
              type="number"
              placeholder="Height (cm)"
              onChange={(e) => setUser({ ...user, height: e.target.value })}
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              onChange={(e) => setUser({ ...user, weight: e.target.value })}
            />
            <input
              type="number"
              placeholder="Daily Calorie Goal"
              onChange={(e) =>
                setUser({ ...user, dailyCalories: e.target.value })
              }
            />
          </div>
        </div>
        <div className="form-grid">
          <div className="left-column">
            <label>Do you exercise daily?</label>
          </div>
          <div className="right-column">
            <input
              type="checkbox"
              checked={user.dailyExercise}
              onChange={(e) =>
                setUser({ ...user, dailyExercise: e.target.checked })
              }
            />
          </div>
        </div>

        <button className="register-btn" onClick={handleRegister}>
          Register
        </button>
        <label>Already have an account?</label>
        <button className="register-btn">
          <NavLink to="/login" className="register-btn">
            Login
          </NavLink>
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
