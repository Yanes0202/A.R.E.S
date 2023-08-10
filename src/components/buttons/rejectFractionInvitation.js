const { messageEmbed } = require("../../scripts/sendEmbed.js");
const { failureColor } = process.env;

module.exports = {
  data: {
    name: `rejectFractionInvitation`,
  },
  async execute(interaction, client) {
    const invitedUser = client.userToInvite;
    if (invitedUser == interaction.member.id) {
      const message = interaction.message;
      await message.delete();
      await messageEmbed(
        "Nie chcesz do nich dołączyć? I bardzo dobrze.",
        parseInt(failureColor),
        interaction
      );
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
