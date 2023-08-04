const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const quote = async () => {
  const response = await fetch("http://localhost:3000/quote");
  const data = await response.json();
  return data;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("sends a quote from inspiring personalities"),
  async execute(interaction) {
    const res = await quote();
    const embed = new EmbedBuilder()
      .setTitle(res.quote)
      .setDescription(`~ ${res.personality}`)
      .setTimestamp()
      .setImage(res.image)
      .setFooter({
        text: `requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      });
    await interaction.reply({ embeds: [embed] });
  },
};