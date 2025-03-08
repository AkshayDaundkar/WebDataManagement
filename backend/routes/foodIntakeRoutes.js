const express = require("express");
const FoodIntake = require("../models/FoodIntake");

const router = express.Router();

// ✅ Add food intake entry
router.post("/", async (req, res) => {
  try {
    const { userId, category, calories } = req.body;
    const foodEntry = new FoodIntake({ userId, category, calories });
    await foodEntry.save();
    res.status(201).json({ msg: "Food intake added", foodEntry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Fetch all food intake for a user
router.get("/:userId", async (req, res) => {
  try {
    const foodIntake = await FoodIntake.find({ userId: req.params.userId });
    res.json(foodIntake);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update a food intake entry
router.put("/:id", async (req, res) => {
  try {
    const updatedEntry = await FoodIntake.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a food intake entry
router.delete("/:id", async (req, res) => {
  try {
    await FoodIntake.findByIdAndDelete(req.params.id);
    res.json({ msg: "Food intake entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
