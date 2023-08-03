const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("claim")
    .setDescription("Wybieranie terenu do przejęcia!"),
  async execute(interaction, client) {
    const { roles } = interaction.member;
    interaction.member
    if (roles.cache.has('1136366578590560368')) {
        const menu = new StringSelectMenuBuilder()
        .setCustomId(`claim`)
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder("Wybierz kratki które chcesz przejać!!!")
        .setOptions(
          new StringSelectMenuOptionBuilder({
            label: `Kratka: A1`,
            value: `Kratka: A1`,
          }),
          new StringSelectMenuOptionBuilder({
            label: `Kratka: A2`,
            value: `Kratka: A2`,
          })
        );
  
      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(menu)]
      });
      interaction.member.roles.remove('1136366578590560368');
    } else {
        const embed = new EmbedBuilder()
            .setTitle("Nie masz uprawnień by przejmować kratki!!!")
            .setColor(0xcf2929)

            await interaction.reply({
                embeds: [embed]
            });
    
    }
    
  },
};
