const {
  fractionLeaderRole,
  fractionApplicationRole,
  fractionLicenseRole,
  successColor,
  failureColor,
  privateFractionChannels,
} = process.env;
const {
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `declareWar`,
  },
  async execute(interaction, client) {
    const userRoles = interaction.member.roles.cache;
    if (!userRoles.has(fractionLeaderRole)) {
      await replyEmbed(
        "To nie ty o tym decydujesz! Najpierw zostań liderem.",
        parseInt(failureColor),
        interaction
      );
      return;
    }

    const modal = new ModalBuilder()
      .setCustomId("warDeclaration")
      .setTitle("A więc wojna...");

    const fractionName = new TextInputBuilder()
      .setCustomId("warFractionName")
      .setLabel("Jakiej frakcji chcesz wypowiedzieć wojnę")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const fractionTag = new TextInputBuilder()
      .setCustomId("warType")
      .setLabel("Jaki to jest rodzaj wojny?")
      .setPlaceholder("Terytorialny/Konfliktowy")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const fractionColor = new TextInputBuilder()
      .setCustomId("warReasons")
      .setLabel("Dlaczego chcesz wypowiedzieć im wojnę?")
      .setRequired(false)
      .setPlaceholder(
        "Podaj przynajmniej 3 powody przez które chcesz wypowiedzieć wojnę"
      )
      .setStyle(TextInputStyle.Paragraph);

    modal
      .addComponents(new ActionRowBuilder().addComponents(fractionName))
      .addComponents(new ActionRowBuilder().addComponents(fractionTag))
      .addComponents(new ActionRowBuilder().addComponents(fractionColor));

    await interaction.showModal(modal);
  },
};
