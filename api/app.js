const express = require("express");
const app = express();
const ai = require("./Ai.js");

const personalities = [
  "Martin Luther King Jr.",
  "Swami Vivekanand",
  "Nelson Mandela",
  "Rabindranath Tagore",
];

const personalityImage = [
  "https://upload.wikimedia.org/wikipedia/commons/0/05/Martin_Luther_King%2C_Jr..jpg",
  "https://dishabharat.org/wp-content/uploads/2013/01/Swami-ji.jpg",
  "https://karsh.org/wordpress/wp-content/uploads/2017/06/Yousuf-Karsh-Nelson-Mandela-1990-1523x1960.jpg",
  "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQriZJJgUvDvjxtBDign1m_iNqAjflnPoceV8b_jxuMD8Ak2caGbkpRmFqMNk2WFFx-nzcgTmBVLchrAH4",
];

app.get("/quote", async (req, res) => {
  const personality = Math.floor(Math.random() * personalities.length);
  const quote = await ai.response(`
    Generate a quote from ${personalities[personality]} and the format should be: "quote", don't mention anything else other than the quote.
    `);
  res.json({
    quote: quote,
    personality: personalities[personality],
    image: personalityImage[personality],
  });
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000/");
});