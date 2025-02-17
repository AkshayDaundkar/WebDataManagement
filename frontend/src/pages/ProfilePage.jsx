import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});

  // Fetch User Data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://webdatamanagement.onrender.com//api/users/${userId}`
        );
        setUser(response.data);
        setUpdatedUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUser();
  }, [userId]);

  // Handle Input Change
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://webdatamanagement.onrender.com//api/users/${userId}`,
        updatedUser
      );
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile.");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      {user ? (
        <div className="profile-card">
          <div className="profile-grid">
            {/* Column 1 */}
            <div className="profile-column">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
              />

              <label>Email:</label>
              <input type="email" value={user.email} disabled />
            </div>

            {/* Column 2 */}
            <div className="profile-column">
              <label>Height (cm):</label>
              <input
                type="number"
                name="height"
                value={updatedUser.height}
                onChange={handleChange}
              />

              <label>Weight (kg):</label>
              <input
                type="number"
                name="weight"
                value={updatedUser.weight}
                onChange={handleChange}
              />
            </div>

            {/* Column 3 */}
            <div className="profile-column">
              <label>Daily Exercise:</label>
              <select
                name="dailyExercise"
                value={updatedUser.dailyExercise}
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <label>Daily Calorie Goal:</label>
              <input
                type="number"
                name="dailyCalories"
                value={updatedUser.dailyCalories}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            style={{ backgroundColor: "#f4a261" }}
            onClick={handleUpdate}
            className="update-btn"
          >
            Update Profile
          </button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfilePage;
