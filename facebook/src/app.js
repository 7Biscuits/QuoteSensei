// Import necessary modules and functions
const { postContent } = require("./services/graph.api"); // Importing the postContent function from the "graph.api" service
const { getQuote } = require("../../utils/getQuote"); // Importing the getQuote function from the "getQuote" utility

// Define an asynchronous function named "post"
const post = async () => {
    // Use the getQuote function to fetch a quote and then post it using postContent
    await getQuote().then(response => postContent(`${response.quote} ~${response.personality}`));
};

// Set up an interval to call the "post" function every 20 seconds (20000 milliseconds)
setInterval(post, 20000);
