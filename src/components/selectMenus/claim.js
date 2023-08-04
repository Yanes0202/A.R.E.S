const {
  getRowToInsert,
  checkFractionColumn,
} = require("../../excel/readSheet.js");
const { checkUserFraction } = require("../../scripts/checkUserFraction.js");
const {
  insertCell,
  insertClaimTimeStamp,
} = require("../../excel/writeSheet.js");
const { messageEmbed } = require("../../scripts/sendEmbed.js");

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

    await insertCell(column + row, interaction.values[0]);
    await insertClaimTimeStamp(column);
    await messageEmbed(
      `Gratulacje! Udało ci się podbić teren na kratce: ${interaction.values[0]}`,
      0x00ff00,
      interaction
    );
  },
};
