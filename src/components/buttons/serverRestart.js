module.exports = {
  data: {
    name: `serverRestart`,
  },
  async execute(interaction, client) {
    const message = await interaction.reply({
        content: "kliknięte"
    });
    message.delete();

    await interaction.channel.send({
      content: ">H.A.D.E.S. quit",
    });
    
  },
};
