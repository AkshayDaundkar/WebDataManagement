import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
    if (!newPassword.trim()) {
      setError("New password is required.");
      toast.error("New password is required.");
      return false;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    setError("");
    return true;
  };

  const handleReset = async () => {
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
        newPassword,
      });

      toast.success("Password reset successful!", { position: "top-right" });
      navigate("/login");
    } catch (err) {
      setError("Failed to reset password. Please check your email.");
      toast.error("Reset failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>🔒 Reset Your Password</h2>
        {error && <p className="error-msg">{error}</p>}

        <div className="form-grid">
          <div className="left-column">
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="auth-btn" onClick={handleReset}>
          Reset Password
        </button>

        <label>Remembered your password?</label>
        <button className="register-btn">
          <NavLink to="/login" className="register-btn">
            Back to Login
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
