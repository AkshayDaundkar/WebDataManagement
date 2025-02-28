import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import logo from "../assets/logo2.png"; // Add your custom logo here

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `https://webdatamanagement.onrender.com/api/users/${userId}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };
    fetchUser();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Fitness Tracker Logo" className="logo-img" />
        <h1 className="logo-text">fitness X tracker</h1>
      </div>

      <div className="nav-links">
        <NavLink to="/" activeclassname="active">
          Home
        </NavLink>
        <NavLink to="/dashboard" activeclassname="active">
          Dashboard
        </NavLink>
        <NavLink to="/exercises" activeclassname="active">
          Exercises
        </NavLink>
        <NavLink to="/nutrition" activeclassname="active">
          Nutrition
        </NavLink>
        <NavLink to="/ai-chat" activeclassname="active">
          AI Chat
        </NavLink>
      </div>

      <div className="auth-buttons">
        {user ? <span className="user-greeting">{user.name}!</span> : null}
        {token ? (
          <>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
            <NavLink to="/profile" className="profile-btn">
              Profile
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className="login-btn">
              Login
            </NavLink>
            <NavLink to="/register" className="login-btn">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
