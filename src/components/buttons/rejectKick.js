const { replyEmbed, messageEmbed } = require("../../scripts/sendEmbed.js");
const { failureColor } = process.env;

module.exports = {
  data: {
    name: `rejectKick`,
  },
  async execute(interaction, client) {
    if (client.commandOwnerId == interaction.member.id) {
      const message = interaction.message;
      await message.delete();

      await replyEmbed(
        "Skoro nie chcesz go wywalić, to po co marnujesz mój czas?!",
        parseInt(failureColor),
        interaction
      );
    } else {
      await messageEmbed(
        "I na cholerę to klikasz?! To nie do ciebie!",
        parseInt(failureColor),
        interaction
      );
    }
  },
};
