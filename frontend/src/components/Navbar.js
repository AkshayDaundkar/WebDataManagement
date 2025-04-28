import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import logo from "../assets/logo2.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const token = localStorage.getItem("token"); // fetch fresh every render
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      if (userId && token) {
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
  }, [userId, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    alert("Logged out successfully!");
    navigate("/login");
    window.location.reload(); // <- force navbar refresh
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Fitness Tracker Logo" className="logo-img" />
        <h1 className="logo-text">Fitness X Tracker</h1>
      </div>

      {/* Mobile Menu Icon */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>

        {/* Only show when logged in */}
        {token && (
          <>
            <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/exercises" onClick={() => setMenuOpen(false)}>
              Exercises
            </NavLink>
            <NavLink to="/nutrition" onClick={() => setMenuOpen(false)}>
              Nutrition
            </NavLink>
            <NavLink to="/ai-chat" onClick={() => setMenuOpen(false)}>
              AI Chat
            </NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
              Contact Us
            </NavLink>
          </>
        )}
      </div>

      <div className="auth-buttons">
        {token ? (
          <div className="user-dropdown">
            <div
              className="user-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUserCircle size={24} /> {user?.name}
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <NavLink to="/profile" onClick={() => setDropdownOpen(false)}>
                  Profile
                </NavLink>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink to="/login" className="register-btn">
              Login
            </NavLink>
            <NavLink to="/register" className="register-btn">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
