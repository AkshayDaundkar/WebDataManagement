const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Counter = require("./Counter"); // Import Counter model

const UserSchema = new mongoose.Schema({
  userId: { type: Number, unique: true }, // Use a numeric userId
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  height: Number,
  weight: Number,
  dailyExercise: Boolean,
  dailyCalories: Number,
});

// Auto-increment userId before saving a new user
UserSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "userId" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    this.userId = counter.value;

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", UserSchema);
