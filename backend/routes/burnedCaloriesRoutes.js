const express = require("express");
const BurnedCalories = require("../models/BurnedCalories");

const router = express.Router();

// ✅ Add burned calories entry
router.post("/", async (req, res) => {
  try {
    const { userId, activity, calories } = req.body;
    const burnedEntry = new BurnedCalories({ userId, activity, calories });
    await burnedEntry.save();
    res.status(201).json({ msg: "Entry added", burnedEntry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Fetch all burned calories for a user
router.get("/:userId", async (req, res) => {
  try {
    const burnedCalories = await BurnedCalories.find({
      userId: req.params.userId,
    });
    res.json(burnedCalories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update a burned calories entry
router.put("/:id", async (req, res) => {
  try {
    const updatedEntry = await BurnedCalories.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a burned calories entry
router.delete("/:id", async (req, res) => {
  try {
    await BurnedCalories.findByIdAndDelete(req.params.id);
    res.json({ msg: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
