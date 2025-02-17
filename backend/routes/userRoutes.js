const express = require("express");
const User = require("../models/User");

const router = express.Router();

// ✅ Get User Profile by userId
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }).select(
      "-password"
    );
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update User Profile
router.put("/:userId", async (req, res) => {
  try {
    const { name, height, weight, dailyExercise, dailyCalories } = req.body;
    let user = await User.findOne({ userId: req.params.userId });

    if (!user) return res.status(404).json({ msg: "User not found" });
    user.name = name || user.name;
    user.height = height || user.height;
    user.weight = weight || user.weight;
    user.dailyExercise =
      dailyExercise !== undefined ? dailyExercise : user.dailyExercise;
    user.dailyCalories = dailyCalories || user.dailyCalories;

    await user.save();
    res.json({ msg: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
