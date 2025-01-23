
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 5000;

// Middleware to parse JSON data
app.use(express.json());

// OpenAI API key
const openai_api_key = process.env.OPENAI_API_KEY;

// Function to get the response from OpenAI GPT-3
async function getBotResponse(message) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openai_api_key}`,
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error getting response from OpenAI:", error);
    return "Sorry, I couldn't understand that. Please try again.";
  }
}

// API route to handle user messages
app.post("/chat", async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  const botResponse = await getBotResponse(userMessage);

  return res.json({ botResponse });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
