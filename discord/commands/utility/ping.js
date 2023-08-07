// Import necessary modules from discord.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// Export the command data using SlashCommandBuilder
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping") // Set the name of the slash command to "ping"
    .setDescription("Replies with Pong!"), // Set the description for the "ping" command

  /**
   * Execute function to handle the "ping" command.
   * @param {Object} interaction - The interaction object representing the slash command.
   */
  async execute(interaction) {
    // Create an embed using EmbedBuilder to format the response
    const embed = new EmbedBuilder()
      .setTitle("Pong! 🏓") // Set the title of the embed to "Pong! 🏓"
      .setDescription(`💡 Latency: ${interaction.client.ws.ping}ms`) // Set the description with the bot's latency
      .setTimestamp() // Set the current timestamp as the footer of the embed
      .setFooter({
        text: `requested by ${interaction.user.tag}`, // Set the user tag as the footer text
        iconURL: interaction.user.displayAvatarURL(), // Set the user's avatar as the footer icon
      });

    // Send the embed as a reply to the interaction
    await interaction.reply({ embeds: [embed] });
  },
};