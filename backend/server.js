const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Message = require("./models/message"); // Import the Message model
// Load environment variables
dotenv.config();

// ✅ Manually Set Fallback for bcryptjs
bcrypt.setRandomFallback((size) => {
  const crypto = require("crypto");
  return crypto.randomBytes(size);
});

// Initialize Express App
const app = express();

// Middleware
app.use(express.json()); // Enable JSON parsing
app.use(cors()); // Allow cross-origin requests

// Import Routes
const authRoutes = require("./routes/authRoutes");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/meals", require("./routes/mealRoutes"));
app.use("/api/exercises", require("./routes/exerciseRoutes"));
app.use("/api/nutrition", require("./routes/nutritionRoutes"));
app.use("/api/ai", require("./routes/aiChatRoutes"));
app.use("/api/burned-calories", require("./routes/burnedCaloriesRoutes"));
app.use("/api/food-intake", require("./routes/foodIntakeRoutes"));

// Default Route
app.get("/", (req, res) => {
  res.send("✅ Fitness Tracker Backend is Running!");
});

// Set Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

// Get all messages
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }); // oldest first
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new message
app.post("/api/messages", async (req, res) => {
  const { senderName, message } = req.body;
  if (!senderName || !message) {
    return res.status(400).json({ error: "Missing senderName or message" });
  }

  try {
    const newMessage = new Message({ senderName, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
