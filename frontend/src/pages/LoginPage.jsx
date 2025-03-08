import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required.");
      toast.error("Email is required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      toast.error("Please enter a valid email.");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required.");
      toast.error("Password is required.");
      return false;
    }
    setError(""); // Clear errors if validation passes
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://webdatamanagement.onrender.com/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      toast.success("Login successful!", { position: "top-right" });
      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
      toast.error("Login failed. Please check your credentials.");
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

        <label>Don't have an account?</label>
        <button className="register-btn">
          <NavLink to="/register" className="register-btn">
            Register
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
