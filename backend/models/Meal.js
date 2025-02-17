const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  mealName: { type: String, required: true },
  calories: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Meal", MealSchema);
