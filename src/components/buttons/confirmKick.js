const { replyEmbed, messageEmbed } = require("../../scripts/sendEmbed.js");
const { failureColor, successColor } = process.env;
const { checkFractionType, checkUserFraction } = require("../../scripts/fractionScripts.js");

module.exports = {
  data: {
    name: `confirmKick`,
  },
  async execute(interaction, client) {
    if (client.commandOwnerId == interaction.member.id) {
      const message = interaction.message;
      await message.delete();
      const userRoles = interaction.member.roles.cache;
      const userFraction = await checkUserFraction(userRoles);
      const fractionTypeRoleId = await checkFractionType(userRoles);

      await client.user.roles.remove(userFraction);
      await client.user.roles.remove(fractionTypeRoleId);

      await replyEmbed(
        "Udało ci się pozbyć zbędnego balastu!",
        parseInt(successColor),
        interaction
      );
    } else {
      await messageEmbed(
        "Nie masz co robić? Zaraz znajdę ci zajęcie! Nie tykaj co nie twoje!!!",
        parseInt(failureColor),
        interaction
      );
    }
  },
};
