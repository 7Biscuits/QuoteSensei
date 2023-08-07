// Import necessary modules
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config({
  path: "../.env",
});

// Create a new configuration instance with the OpenAI API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY, // Replace with your actual OpenAI API key from .env
});

// Initialize the OpenAI API with the provided configuration
const openai = new OpenAIApi(configuration);

/**
 * Function to get a response from the OpenAI API based on the given prompt.
 * @param {string} prompt - The input text prompt to generate a completion.
 * @returns {Promise<string>} - A promise that resolves to the generated response.
 */
const response = async (prompt) => {
  // Create a completion using the Davinci model with specified options
  const res = await openai.createCompletion({
    model: "text-davinci-003", // Replace with the desired language model if needed
    prompt,
    temperature: 0.7, // Controls the randomness of the generated text (higher values make it more random)
    max_tokens: 256, // Limit the response length to 256 tokens
    top_p: 1, // Top-p (nucleus) sampling probability (1 means no filtering)
    frequency_penalty: 0, // Adjust the penalty applied to token frequency (0 means no penalty)
    presence_penalty: 0, // Adjust the penalty for repeating tokens (0 means no penalty)
  });

  // Extract the generated text from the API response and return it
  return res.data.choices[0].text;
};

// Export the response function to be used in other modules
module.exports = {
  response,
};