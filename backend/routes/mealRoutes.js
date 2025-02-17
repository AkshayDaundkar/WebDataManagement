const express = require("express");
const Meal = require("../models/Meal");

const router = express.Router();

// ✅ Log a Meal
router.post("/", async (req, res) => {
  try {
    const { userId, mealName, calories } = req.body;

    if (!userId || !mealName || !calories) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const meal = new Meal({ userId, mealName, calories });
    await meal.save();

    res.status(201).json({ msg: "Meal logged", meal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Meals for a User
router.get("/:userId", async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.params.userId }).sort({
      timestamp: -1,
    });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Monthly Calorie Summary
router.get("/:userId/summary", async (req, res) => {
  try {
    const userId = req.params.userId;
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const meals = await Meal.aggregate([
      {
        $match: {
          userId: parseInt(userId),
          timestamp: { $gte: firstDayOfMonth },
        },
      },
      { $group: { _id: "$userId", totalCalories: { $sum: "$calories" } } },
    ]);

    res.json(meals.length > 0 ? meals[0] : { userId, totalCalories: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
