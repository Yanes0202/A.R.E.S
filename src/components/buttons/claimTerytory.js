const {
  checkFractionColumn,
  checkFractionCrates,
} = require("../../excel/readSheet.js");
const { cratesToClaim } = require("../../crates/crates.js");
const { checkUserFraction } = require("../../scripts/checkUserFraction.js");
const {
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: {
    name: `claimTerytory`,
  },
  async execute(interaction, client) {
    const userRoles = interaction.member.roles.cache;

    var playerFraction = await checkUserFraction(userRoles);

    if (userRoles.has("1136436329840902165")) {
      var fractionColumn = await checkFractionColumn(playerFraction);
      const fractionCrates = await checkFractionCrates(fractionColumn);
      const fractionCratesFlat = fractionCrates.flat();
      const availableCrates = await cratesToClaim(fractionCratesFlat);
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
      const embed = new EmbedBuilder()
        .setTitle("Nie jesteś Liderem frakcji!!!")
        .setColor(0xcf2929);
      const message = await interaction.channel.send({ embeds: [embed] });

      setTimeout(() => {
        message.delete().catch(console.error);
      }, 10000);
    }
  },
};
