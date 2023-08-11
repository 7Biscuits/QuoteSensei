// Import the dotenv module to load environment variables from a .env file
const dotenv = require("dotenv");

// Load environment variables from the .env file located in the parent directory
dotenv.config({
  path: "../.env",
});

/**
 * Function to post content to a Facebook page using the Graph API.
 * @param {string} content - The content (message) to be posted.
 */
const postContent = (content) => {
  // Make a POST request to the Facebook Graph API's feed endpoint
  fetch(
    `https://graph.facebook.com/v17.0/${process.env.FACEBOOK_PAGE_ID}/feed`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: content, // Set the message content to the provided content
        access_token: process.env.FACEBOOK_ACCESS_TOKEN, // Use the Facebook access token from environment variables
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Post successful:", data); // Log successful post data to the console
    })
    .catch((error) => {
      console.error("Error posting:", error); // Log error information if the post fails
    });
};

// Export the postContent function for use in other modules
module.exports = { postContent };