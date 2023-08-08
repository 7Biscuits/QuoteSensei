// Import necessary modules
const express = require("express");
const app = express();
const ai = require("./Ai.js"); // Import the module containing the AI response function
const cors = require("cors");

app.use(cors());

// Define an array of personalities
const personalities = [
  "Martin Luther King Jr.",
  "Swami Vivekanand",
  "Nelson Mandela",
  "Rabindranath Tagore",
];

// Define an array of personality images corresponding to the personalities array
const personalityImage = [
  "https://upload.wikimedia.org/wikipedia/commons/0/05/Martin_Luther_King%2C_Jr..jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/80/Swami_Vivekananda_1893_Scanned_Image.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/02/Nelson_Mandela_1994.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d1/Rabindranath_Tagore.jpg",
];

// Endpoint to get a random quote from a random personality using the AI response function
app.get("/api/quote", async (req, res) => {
  // Generate a random index to select a personality from the array
  const personality = Math.floor(Math.random() * personalities.length);

  // Use the AI response function to generate a quote for the selected personality
  const quote = await ai.response(`
    Generate a quote from ${personalities[personality]} and the format should be: "quote", don't mention anything else other than the quote.
    `);

  // Respond with the generated quote, personality, and corresponding image as JSON
  res.json({
    quote: quote,
    personality: personalities[personality],
    image: personalityImage[personality],
  });
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("listening on http://localhost:3000/");
});