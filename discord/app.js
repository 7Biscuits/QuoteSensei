// Import necessary modules and classes
const fs = require("node:fs"); // Node.js file system module
const path = require("node:path"); // Node.js path module
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js"); // Import discord.js classes
const dotenv = require("dotenv"); // Library for loading environment variables from .env file

// Load environment variables from .env file
dotenv.config({
  path: '../.env',
});

// Create a new Discord client instance with specified intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

// Create a Collection to store the bot's commands
client.commands = new Collection();

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
      // Add the command to the client's commands Collection with its name as the key
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Event listener for interaction (slash command) creation
client.on(Events.InteractionCreate, async (interaction) => {
  // Check if the interaction is a chat input command (slash command)
  if (!interaction.isChatInputCommand()) return;

  // Get the command object from the client's commands Collection based on the command name
  const command = client.commands.get(interaction.commandName);

  // If the command does not exist, do nothing
  if (!command) return;

  try {
    // Execute the command's "execute" function, passing the interaction object
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    // If the interaction has already been replied to or deferred, use followUp with ephemeral flag
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      // If the interaction has not been replied to or deferred, use reply with ephemeral flag
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

// Event listener for when the client is ready
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Login the client using the provided BOT_TOKEN from the .env file
client.login(process.env.BOT_TOKEN);