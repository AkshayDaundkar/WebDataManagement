import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
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

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://webdatamanagement.onrender.com/api/auth/register",
        user
      );
      setUser(response.data);
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      setError("Error registering user.");
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
              placeholder="Password"
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
        <label>Do you Already have Account?</label>
        <button className="register-btn">
          <NavLink to="/login" className="register-btn">
            Login
          </NavLink>
        </button>
      </div>

      {/* Right Side Illustration */}
      <div className="register-illustration">
        <img
          src="https://fitnessprogramer.com/wp-content/uploads/2021/02/burn-man.png"
          alt="Fitness"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
