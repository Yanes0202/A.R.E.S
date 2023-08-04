const {
  checkFractionColumn,
  checkFractionCrates,
} = require("../../excel/readSheet.js");
const { cratesToClaim } = require("../../scripts/claimSystem.js");
const { checkUserFraction } = require("../../scripts/checkUserFraction.js");
const { messageEmbed } = require("../../scripts/sendEmbed.js");
const {
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `claimTerytory`,
  },
  async execute(interaction, client) {
    const userRoles = interaction.member.roles.cache;
    var playerFraction = await checkUserFraction(userRoles);
    var fractionColumn = await checkFractionColumn(playerFraction);
    const fractionCrates = await checkFractionCrates(fractionColumn);
    const fractionCratesFlat = fractionCrates.flat();
    const availableCrates = await cratesToClaim(fractionCratesFlat);

    if (userRoles.has("1136436329840902165")) {
      const menu = new StringSelectMenuBuilder()
        .setCustomId(`claim`)
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder("Wybierz kratki które chcesz przejąć!!!");

      availableCrates.forEach((crate) => {
        menu.addOptions(
          new StringSelectMenuOptionBuilder({
            label: crate,
            value: crate,
          })
        );
      });

      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(menu)],
      });
    } else {
      await messageEmbed(
        "Nie jesteś Liderem frakcji!!!",
        0xcf2929,
        interaction
      );
    }
  },
};
