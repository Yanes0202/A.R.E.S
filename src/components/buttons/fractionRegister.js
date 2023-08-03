const { checkUserFraction } = require("../../scripts/checkUserFraction.js");
const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `fractionRegister`,
  },
  async execute(interaction, client) {
    const userRoles = interaction.member.roles.cache;

    var playerFraction = await checkUserFraction(userRoles);

    if (playerFraction) {
      const embed = new EmbedBuilder()
        .setTitle("Jesteś już we frakcji!!!")
        .setColor(0xcf2929);
      const message = await interaction.channel.send({ embeds: [embed] });

      setTimeout(() => {
        message.delete().catch(console.error);
      }, 10000);
      return;
    }

    const modal = new ModalBuilder()
      .setCustomId("fractionCreate")
      .setTitle("Utwórz frakcję");

    const fractionName = new TextInputBuilder()
      .setCustomId("fractionName")
      .setLabel("Jak się ma nazywać frakcja?")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const fractionTag = new TextInputBuilder()
      .setCustomId("fractionTag")
      .setLabel("Jaki ma być TAG frakcji?")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const fractionColor = new TextInputBuilder()
      .setCustomId("fractionColor")
      .setLabel("Jaki ma być kolor frakcji?")
      .setPlaceholder("Musi być inny niż innej frakcji")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const fractionType = new TextInputBuilder()
      .setCustomId("fractionType")
      .setLabel("Jaki to ma być rodzaj frakcji?")
      .setPlaceholder("Neutralna/Agresywna/Pokojowa")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const fractionCrate = new TextInputBuilder()
      .setCustomId("fractionCrate")
      .setLabel("Na jakiej kratce ma się znajdować frakcja?")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    modal
      .addComponents(new ActionRowBuilder().addComponents(fractionName))
      .addComponents(new ActionRowBuilder().addComponents(fractionTag))
      .addComponents(new ActionRowBuilder().addComponents(fractionColor))
      .addComponents(new ActionRowBuilder().addComponents(fractionType))
      .addComponents(new ActionRowBuilder().addComponents(fractionCrate));

    await interaction.showModal(modal);
  },
};
