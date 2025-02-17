const mongoose = require("mongoose");

const BurnedCaloriesSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  activity: { type: String, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BurnedCalories", BurnedCaloriesSchema);
