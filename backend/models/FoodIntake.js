const mongoose = require("mongoose");

const FoodIntakeSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  category: { type: String, required: true }, // Breakfast, Lunch, Snacks, etc.
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FoodIntake", FoodIntakeSchema);
