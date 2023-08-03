const {
  getRowToInsert,
  checkFractionColumn,
} = require("../../excel/readSheet.js");
const { checkUserFraction } = require("../../scripts/checkUserFraction.js");
const { insertCell, insertClaimTimeStamp } = require("../../excel/writeSheet.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `claim`,
  },
  async execute(interaction, client) {
    interaction.message.delete();
    const roles = interaction.member.roles.cache;
    var fraction = await checkUserFraction(roles);
    var column = await checkFractionColumn(fraction);
    var row = await getRowToInsert(column);

    const embed = new EmbedBuilder()
      .setTitle(
        `Gratulacje! Udało ci się podbić teren na kratce: ${interaction.values[0]}`
      )
      .setColor(0x00ff00);
    await insertCell(column + row, interaction.values[0]);
    await insertClaimTimeStamp(column);
    const message = await interaction.channel.send({ embeds: [embed] });

    setTimeout(() => {
      message.delete().catch(console.error);
    }, 10000);
  },
};
