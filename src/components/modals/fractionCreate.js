const {
  getColumnToInsert,
  checkClaimedCrates,
  readAllFractions,
} = require("../../excel/readSheet.js");
const { insertFraction } = require("../../excel/writeSheet.js");
const { replyEmbed } = require("../../scripts/sendEmbed.js");
module.exports = {
  data: {
    name: "fractionCreate",
  },
  async execute(interaction, client) {
    const fractionName = interaction.fields.getTextInputValue("fractionName");
    const fractionTag = interaction.fields.getTextInputValue("fractionTag");
    const fractionColor = interaction.fields.getTextInputValue("fractionColor");
    const fractionType = interaction.fields.getTextInputValue("fractionType");
    const fractionCrate = interaction.fields.getTextInputValue("fractionCrate");
    const claimedCrates = await checkClaimedCrates();
    const fractionNames = await readAllFractions();

    if (fractionNames.flat().includes(fractionName)) {
      await replyEmbed(
        `Istnieje już frakcja o nazwie ${fractionName}!`,
        0xcf2929,
        interaction
      );
      return;
    }
    if (
      fractionType.toLowerCase() !== "neutralna" &&
      fractionType.toLowerCase() !== "agresywna" &&
      fractionType.toLowerCase() !== "pokojowa"
    ) {
      await replyEmbed(
        "Wybierz prawidłowy typ frakcji!",
        0xcf2929,
        interaction
      );
      return;
    }

    if (!claimedCrates.includes(fractionCrate)) {
      const column = await getColumnToInsert();
      const isCompleted = await insertFraction(
        fractionName,
        fractionTag,
        fractionType.toUpperCase(),
        fractionColor,
        fractionCrate,
        column
      );
      if (isCompleted) {
        try {
          const fractionRole = await interaction.guild.roles.create({
            name: `${fractionName}`,
            color: null,
            permissions: [],
            hoist: true,
            mentionable: true,
            reason: "CREATED BY A.R.E.S - Rejestracja Frakcji!",
          });
          await interaction.member.roles.add(fractionRole);
          await interaction.member.roles.add("1136436329840902165");
        } catch (error) {
          console.error("Error on role creating:", error);
        }
        await replyEmbed(
          `Udało się utworzyć frakcję ${fractionName}!`,
          0x00ff00,
          interaction
        );
      } else {
        await replyEmbed(
          "Coś się nie udało przy tworzeniu frakcji",
          0xcf2929,
          interaction
        );
      }
    } else {
      await replyEmbed(
        "Kratka jest już przez kogoś zajęta!",
        0xcf2929,
        interaction
      );
    }
  },
};
