const { checkUserFraction } = require("../../scripts/checkUserFraction.js");
const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const { messageEmbed } = require("../../scripts/sendEmbed.js");

module.exports = {
  data: {
    name: `fractionRegister`,
  },
  async execute(interaction, client) {
    const userRoles = interaction.member.roles.cache;

    var playerFraction = await checkUserFraction(userRoles);

    if (playerFraction || userRoles.has("1136436329840902165")) {
      await messageEmbed("Jesteś już we frakcji!!!", 0xcf2929, interaction);
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
      .setLabel("Na jakim sektorze ma się znajdować frakcja?")
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
