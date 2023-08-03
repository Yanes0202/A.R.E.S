const {
  readAllFractions,
  checkFractionColumn,
} = require("../../excel/readSheet.js");
const { kratkiDoPrzejecia } = require("../../crates/crates.js");
const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: `claimTerytory`,
  },
  async execute(interaction, client) {
    const roles = interaction.member.roles.cache;
    const rolesName = [];

    roles.forEach((role) => {
      rolesName.push(role.name);
    });

    if (roles.has("1136436329840902165")) {
      const allFractions = await readAllFractions();
      const fractions = allFractions.flat();
      var playerFraction = "";

      const checkIfValueExists = (value, array) => {
        if (array.includes(value)) {
          playerFraction = value;
        }
      };

      rolesName.forEach((value) => {
        checkIfValueExists(value, fractions);
      });
      const fractionCrates = await checkFractionColumn(playerFraction);

      const availableCrates = kratkiDoPrzejecia(fractionCrates);

      const menu = new StringSelectMenuBuilder()
        .setCustomId(`claim`)
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder("Wybierz kratki które chcesz przejąć!!!");

      // Dodaj opcje do menu na podstawie zawartości tablicy availableCrates
      availableCrates.forEach((crate) => {
        menu.addOptions(
          new StringSelectMenuOptionBuilder({
            label: crate,
            value: crate,
          })
        );
      });

      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(menu)]
    });
    }

    else 
    await interaction.reply({
        content: "Hello"
    })

    
  },
};
