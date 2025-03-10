const express = require("express");
const axios = require("axios");

const router = express.Router();
const OPENAI_API_KEY =
  "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"; // Replace with your actual GPT-4 API key

// ✅ AI Chat for Fitness & Nutrition Advice
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a fitness and nutrition expert.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 600,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ response: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

module.exports = router;
