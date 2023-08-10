/**
 * Function to fetch a random quote from the specified API endpoint.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the fetched quote data.
 */
const quote = async () => {
  const response = await fetch("http://localhost:3000/api/quote"); // Replace the URL with the actual API endpoint. As of now the api is running on localhost:3000
  const data = await response.json();
  return data;
};

module.exports = { quote };