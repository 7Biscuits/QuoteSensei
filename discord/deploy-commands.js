// Import necessary modules and classes
const { REST, Routes } = require("discord.js");
const fs = require("node:fs"); // Node.js file system module
const path = require("node:path"); // Node.js path module
const dotenv = require("dotenv"); // Library for loading environment variables from .env file

// Load environment variables from .env file
dotenv.config({
  path: "../.env",
});

// Create an empty array to store the command data for deployment
const commands = [];

// Define the path to the "commands" folder
const foldersPath = path.join(__dirname, "commands");

// Read the command folders within the "commands" folder
const commandFolders = fs.readdirSync(foldersPath);

// Loop through each command folder
for (const folder of commandFolders) {
  // Get the path to the command files within the current folder
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  // Loop through each command file in the folder
  for (const file of commandFiles) {
    // Get the full path to the current command file
    const filePath = path.join(commandsPath, file);

    // Require the command file to get the command object
    const command = require(filePath);

    // Check if the command object contains the required "data" and "execute" properties
    if ("data" in command && "execute" in command) {
      // Convert the command data to JSON format and add it to the commands array
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Create a new REST client and set the bot token
const rest = new REST().setToken(process.env.BOT_TOKEN);

// Asynchronous function to deploy the commands to Discord
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // Use the REST client to PUT the commands to Discord using the Routes.applicationCommands endpoint
    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();