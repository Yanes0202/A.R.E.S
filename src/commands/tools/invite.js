const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { fractionLeaderRole, successColor, failureColor } =
  process.env;
const { replyEmbed } = require("../../scripts/sendEmbed.js");
const { checkUserFraction } = require("../../scripts/fractionScripts.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Wysyła użytkownikowi zaproszenie do frakcji")
    .addUserOption((option) =>
      option.setName("user").setDescription("user").setRequired(true)
    ),
  async autocomplete(interaction, client) {},
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    client.userToInvite = user;

    const userRoles = interaction.member.roles.cache;

    if (!userRoles.has(fractionLeaderRole)) {
      await replyEmbed(
        "Co ty robisz? Przecież nie jesteś liderem frakcji!",
        parseInt(failureColor),
        interaction
      );
      return;
    }

    const fractionRole = await checkUserFraction(userRoles);
    const serverRole = interaction.guild.roles.cache.get(fractionRole.id);
    const roleMembers = serverRole.members;
    const foundMember = roleMembers.find(
      (member) => member.user.username === user.username
    );
    if (foundMember) {
      await replyEmbed(
        "Ty matole! Ta osoba już jest z tobą we frakcji!!!",
        parseInt(failureColor),
        interaction
      );
      return;
    }

    client.userRole = fractionRole;
    client.invitedUserRoles = userRoles;
    const embed = new EmbedBuilder()
      .setTitle(
        `Śmiertelniku... Dostałeś zaproszenie do frakcji ${fractionRole.name}!`
      )
      .setColor(parseInt(successColor));

    const confirmButton = new ButtonBuilder()
      .setCustomId("confirmFractionInvitation")
      .setLabel("✅ Potwierdź zaproszenie")
      .setStyle(ButtonStyle.Success);
    const rejectButton = new ButtonBuilder()
      .setCustomId("rejectFractionInvitation")
      .setLabel("❌ Odrzuć zaproszenie")
      .setStyle(ButtonStyle.Danger);

    const message = await interaction.reply({
      content: `<@${user.id}>`,
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(confirmButton, rejectButton),
      ],
    });
    setTimeout(() => {
      if (!message.deleted) {
        message.delete().catch(console.error);
      }
    }, 60000);
  },
};
