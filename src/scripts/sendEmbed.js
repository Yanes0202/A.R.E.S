const { EmbedBuilder } = require("discord.js");

const replyEmbed = async (text, color, interaction) => {
  const embed = new EmbedBuilder().setTitle(text).setColor(color);
  const message = await interaction.reply({ embeds: [embed] });

  setTimeout(() => {
    message.delete().catch(console.error);
  }, 5000);
};

const messageEmbed = async (text, color, interaction) => {
  const embed = new EmbedBuilder().setTitle(text).setColor(color);
  const message = await interaction.channel.send({ embeds: [embed] });

  setTimeout(() => {
    message.delete().catch(console.error);
  }, 10000);
};

const sendEmbedOnChannel = async (userID, embedText, color, channel) => {
  const embed = new EmbedBuilder().setTitle(`${embedText}`).setColor(color);
  await channel.send(`<@${userID}>`);
  await channel.send({ embeds: [embed] });
};



module.exports = {
  replyEmbed,
  messageEmbed,
  sendEmbedOnChannel,
};
