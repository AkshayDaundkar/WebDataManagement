const express = require("express");
const axios = require("axios");

const router = express.Router();
const API_NINJAS_KEY = "rUfmojtYXARo0lfyK9E+0w==f2ALW2rtlqCozts0"; // Replace with your actual API key

// ✅ Get Nutrition Info by Food Item
router.get("/:foodItem", async (req, res) => {
  try {
    const { foodItem } = req.params;
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/nutrition?query=${foodItem}`,
      {
        headers: { "X-Api-Key": API_NINJAS_KEY },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch nutrition data" });
  }
});

module.exports = router;
