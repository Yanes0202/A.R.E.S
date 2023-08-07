const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `showMap`,
  },
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("Tu masz mapę świata. Wybieraj mądrze!")
      .setColor(0x2375b3)
      .setDescription(
        `https://docs.google.com/spreadsheets/d/14atAsYXq60ibju9dyW3uAmnwjTB-Fcwj2ktJ-Knw36I/edit#gid=0`
      );
    const message = await interaction.reply({ embeds: [embed] });

    setTimeout(() => {
      message.delete().catch(console.error);
    }, 60000);
  },
};
