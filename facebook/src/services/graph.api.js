const dotenv = require("dotenv");

dotenv.config({
  path: "../.env",
});

const postContent = (content) => {
  fetch(
    `https://graph.facebook.com/v17.0/${process.env.FACEBOOK_PAGE_ID}/feed`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: content,
        access_token: process.env.FACEBOOK_ACCESS_TOKEN,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Post successful:", data);
    })
    .catch((error) => {
      console.error("Error posting:", error);
    });
};

module.exports = { postContent };