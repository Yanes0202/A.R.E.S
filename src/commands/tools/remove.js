const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");
const { greyColor, failureColor, fractionLeaderRole } = process.env;
const { checkUserFraction } = require("../../scripts/fractionScripts.js");
const { replyEmbed } = require("../../scripts/sendEmbed.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Usuwa użytkownika z frakcji")
    .addUserOption((option) =>
      option.setName("user").setDescription("user").setRequired(true)
    ),
  async autocomplete(interaction, client) {},
  async execute(interaction, client) {
    const chosen = interaction.options.getUser("user");
    const userRoles = interaction.member.roles.cache;
    const chosenUser = interaction.guild.members.cache.get(chosen.id);
    //spawdzenie czy ten user jest z tobą we frakcji
    const fractionRole = await checkUserFraction(userRoles);
    const serverRole = interaction.guild.roles.cache.get(fractionRole.id);
    const filteredRole = serverRole.members.filter(member => member.user.id !== interaction.member.id)
    const foundMember = filteredRole.get(chosenUser.id);

    if (!userRoles.has(fractionLeaderRole)) {
      await replyEmbed(
        "Co ty robisz? Przecież nie jesteś liderem frakcji!",
        parseInt(failureColor),
        interaction
      );
      return;
    }

    if (interaction.member.id==chosen.id) {
      await replyEmbed(
        "Samego siebie chcesz wywalić? Brak mi na ciebie słów...",
        parseInt(failureColor),
        interaction
      );
      return;
    }

    if (!foundMember) {
      await replyEmbed(
        "Nie masz nad tą osobą władzy! Za mało znaczysz by móc to zrobić...",
        parseInt(failureColor),
        interaction
      );
      return;
    } 

    const user = interaction.guild.members.cache.get(chosen.id);
    const commandOwnerId = interaction.member.id;
    client.commandOwnerId = commandOwnerId;
    client.user = user;
    const embed = new EmbedBuilder()
      .setTitle(`Jesteś pewien że chcesz się pozbyć ${user.user.username}?`)
      .setColor(parseInt(greyColor));

    const confirmButton = new ButtonBuilder()
      .setCustomId("confirmKick")
      .setLabel("✅ Potwierdź")
      .setStyle(ButtonStyle.Success);
    const rejectButton = new ButtonBuilder()
      .setCustomId("rejectKick")
      .setLabel("❌ Odrzuć")
      .setStyle(ButtonStyle.Danger);

    const message = await interaction.reply({
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(confirmButton, rejectButton),
      ],
    });
    setTimeout(async () => {
      try {
        if (message && !message.deleted) {
          fetchedMessage.delete().catch(console.error);
        }
      } catch (error) {
        console.error("Error fetching or deleting message:", error);
      }
    }, 6000);
  },
};
