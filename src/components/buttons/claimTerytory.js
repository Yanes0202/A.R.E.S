const {
  checkFractionColumn,
  checkFractionCrates,
  checkFractionType,
  checkFractionTimestamp,
} = require("../../excel/readSheet.js");
const {
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");
const { fractionLeaderRole, fractionOwnerShipRole } = process.env;
const { cratesToClaim } = require("../../scripts/claimSystem.js");
const { checkUserFraction } = require("../../scripts/checkUserFraction.js");
const { messageEmbed, replyEmbed } = require("../../scripts/sendEmbed.js");
const {
  expansionLimitation,
} = require("../../scripts/checkFractionTimestamp.js");

module.exports = {
  data: {
    name: `claimTerytory`,
  },
  async execute(interaction, client) {
    const userRoles = interaction.member.roles.cache;

    await replyEmbed(`Sprawdzę czy wszystko się zgadza...`, 0x00ff00, interaction);

    if (userRoles.has(fractionLeaderRole)) {
      if (!userRoles.has(fractionOwnerShipRole)) {
        await messageEmbed(
          "Tracisz mój czas. Wynocha do sklepu i nie wracaj dopóki nie kupisz Prawa Własności!",
          0xcf2929,
          interaction
        );
        return;
      }

      var playerFraction = await checkUserFraction(userRoles);
      var fractionColumn = await checkFractionColumn(playerFraction);
      const fractionType = await checkFractionType(fractionColumn);
      const fractionTimestamp = await checkFractionTimestamp(fractionColumn);
      const canClaim = expansionLimitation(fractionType, fractionTimestamp);
      if (!canClaim) {
        await messageEmbed(
          "Widzę że jesteś głodny ziem... Nie bądź aż taki zachłanny.. Bo się SPARZYSZ!",
          0xcf2929,
          interaction
        );
        return;
      }

      const fractionCrates = await checkFractionCrates(fractionColumn);
      const fractionCratesFlat = fractionCrates.flat();
      const availableCrates = await cratesToClaim(fractionCratesFlat);
      const menu = new StringSelectMenuBuilder()
        .setCustomId(`claim`)
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder("Wybierz kratki które chcesz przejąć! Byle szybko!");

      availableCrates.forEach((crate) => {
        menu.addOptions(
          new StringSelectMenuOptionBuilder({
            label: crate,
            value: crate,
          })
        );
      });

      await interaction.channel.send({
        components: [new ActionRowBuilder().addComponents(menu)],
      });
    } else {
      await messageEmbed(
        "Nie jesteś godzien mojej uwagi... Musisz być liderem frakcji!!!",
        0xcf2929,
        interaction
      );
    }
  },
};
