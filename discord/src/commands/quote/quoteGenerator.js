// Import necessary modules from discord.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { quote } = require("../../../../utils/getQuote");

module.exports = {
  // Define the command data using SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("sends a quote from inspiring personalities"),

  /**
   * Execute function to handle the "quote" command.
   * @param {Object} interaction - The interaction object representing the slash command.
   */
  async execute(interaction) {
    // Fetch a random quote using the quote function
    const res = await quote();

    // Create an embed using EmbedBuilder to format the quote and additional details
    const embed = new EmbedBuilder()
      .setTitle(res.quote) // Set the quote as the title of the embed
      .setDescription(`~ ${res.personality}`) // Set the personality as the description with a "~" prefix
      .setTimestamp() // Set the current timestamp as the footer of the embed
      .setImage(res.image) // Set the quote image, if available
      .setFooter({
        text: `requested by ${interaction.user.tag}`, // Set the user tag as the footer text
        iconURL: interaction.user.displayAvatarURL(), // Set the user's avatar as the footer icon
      });

    // Send the embed as a reply to the interaction
    await interaction.reply({ embeds: [embed] });
  },
};
