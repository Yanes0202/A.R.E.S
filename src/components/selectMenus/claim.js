const {
  getRowToInsert,
  checkFractionColumn,
  checkFractionColor,
} = require("../../excel/readSheet.js");
const {
  insertCell,
  insertClaimTimeStamp,
  insertToMap,
} = require("../../excel/writeSheet.js");
const { checkUserFraction } = require("../../scripts/fractionScripts.js");
const { messageEmbed } = require("../../scripts/sendEmbed.js");
const { columnToNumber } = require("../../scripts/columnToNumber.js");
const { fractionOwnerShipRole, successColor } = process.env;

module.exports = {
  data: {
    name: `claim`,
  },
  async execute(interaction, client) {
    interaction.message.delete();
    const claimedCrate = interaction.values[0];
    const roles = interaction.member.roles.cache;
    var fraction = await checkUserFraction(roles);
    var columnPosition = await checkFractionColumn(fraction);
    var rowPosition = await getRowToInsert(columnPosition);
    const baseX = claimedCrate.match(/[a-zA-Z]+/g).join("");
    const baseY = claimedCrate.match(/\d+/g).join("");
    const columnNumber = columnToNumber(baseX);
    var fractionColor = await checkFractionColor(columnPosition);
    const colorSplited = fractionColor.split(",");
    const red = parseInt(colorSplited[0]) / 255;
    const green = parseInt(colorSplited[1]) / 255;
    const blue = parseInt(colorSplited[2]) / 255;
    const color = {
      red: red,
      green: green,
      blue: blue,
    };
    await insertCell(columnPosition + rowPosition, claimedCrate);
    await insertClaimTimeStamp(columnPosition);
    await insertToMap(baseY, columnNumber, color);
    await interaction.member.roles.remove(fractionOwnerShipRole);
    await messageEmbed(
      `Wszedłeś w posiadanie kratki ${claimedCrate}. Dysponuj terenami mądrze abym nie musiał tam ingerować!`,
      parseInt(successColor),
      interaction
    );
  },
};
