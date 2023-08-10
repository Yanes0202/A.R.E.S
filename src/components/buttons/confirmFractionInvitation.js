const { messageEmbed } = require("../../scripts/sendEmbed.js");
const { failureColor, successColor } = process.env;
const {
  checkUserFraction,
  checkFractionType,
} = require("../../scripts/fractionScripts.js");
const { EmbedBuilder } = require("discord.js");
module.exports = {
  data: {
    name: `confirmFractionInvitation`,
  },
  async execute(interaction, client) {
    const invitedUser = client.userToInvite;

    if (invitedUser == interaction.member.id) {
      const message = interaction.message;
      await message.delete();

      const userRoles = interaction.member.roles.cache;
      const userFraction = await checkUserFraction(userRoles);
      if (userFraction) {
        await messageEmbed(
          "Nędzny szczurze... Nie możesz być w 2 frakcjach jednocześnie!",
          parseInt(failureColor),
          interaction
        );
        return;
      }
      const userRole = client.userRole;
      const fractionType = await checkFractionType(client.invitedUserRoles);

      await interaction.member.roles.add(userRole.id);
      await interaction.member.roles.add(fractionType);

      const embed = new EmbedBuilder()
        .setTitle(
          `Gratulacje zostałeś dodany do frakcji ${userRole.name}. Tylko się tam nie pozabijajcie!`
        )
        .setColor(parseInt(successColor));
      const succesMessage = await interaction.channel.send({
        content: `<@${invitedUser.id}>`,
        embeds: [embed],
      });

      setTimeout(() => {
        succesMessage.delete().catch(console.error);
      }, 10000);
    } else {
      await messageEmbed(
        "Ktoś cię pytał o zdanie?",
        parseInt(failureColor),
        interaction
      );
      return;
    }
  },
};
