import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "./Auth.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://webdatamanagement.onrender.com/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>🔑 Login to Your Account</h2>
        {error && <p className="error-msg">{error}</p>}

        <div className="form-grid">
          <div className="left-column">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <label>Don't have Account?</label>
        <button className="register-btn">
          <NavLink to="/login" className="register-btn">
            Login
          </NavLink>
        </button>
      </div>

      {/* Right Side Illustration */}
      <div className="auth-illustration">
        <img
          src="https://fitnessprogramer.com/wp-content/uploads/2021/02/burn-man.png"
          alt="Fitness"
        />
      </div>
    </div>
  );
};

export default LoginPage;
