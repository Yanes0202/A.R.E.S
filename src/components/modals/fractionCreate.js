const {
  getColumnToInsert,
  checkClaimedCrates,
  readAllFractions,
} = require("../../excel/readSheet.js");
const { insertFraction } = require("../../excel/writeSheet.js");
const { EmbedBuilder } = require("discord.js");
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
      const embed = new EmbedBuilder()
        .setTitle(`Istnieje już frakcja o nazwie ${fractionName}!`)
        .setColor(0xcf2929);

      const message = await interaction.reply({ embeds: [embed] });

      setTimeout(() => {
        message.delete().catch(console.error);
      }, 10000);
      return;
    }
    if (
      fractionType.toLowerCase() !== "neutralna" &&
      fractionType.toLowerCase() !== "agresywna" &&
      fractionType.toLowerCase() !== "pokojowa"
    ) {
      const embed = new EmbedBuilder()
        .setTitle(`Wybierz prawidłowy typ frakcji!`)
        .setColor(0xcf2929);

      const message = await interaction.reply({ embeds: [embed] });

      setTimeout(() => {
        message.delete().catch(console.error);
      }, 10000);
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

        const embed = new EmbedBuilder()
          .setTitle(`Udało się utworzyć frakcję ${fractionName}!`)
          .setColor(0x00ff00);

        const message = await interaction.reply({ embeds: [embed] });

        setTimeout(() => {
          message.delete().catch(console.error);
        }, 10000);
      } else {
        const embed = new EmbedBuilder()
          .setTitle("Coś się nie udało przy tworzeniu frakcji")
          .setColor(0xcf2929);

        const message = await interaction.reply({ embeds: [embed] });

        setTimeout(() => {
          message.delete().catch(console.error);
        }, 10000);
      }
    } else {
      const embed = new EmbedBuilder()
        .setTitle("Kratka jest już przez kogoś zajęta!")
        .setColor(0xcf2929);

      const message = await interaction.reply({ embeds: [embed] });

      setTimeout(() => {
        message.delete().catch(console.error);
      }, 10000);
    }
  },
};
