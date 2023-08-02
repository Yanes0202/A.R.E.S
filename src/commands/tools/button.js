const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Przejmowanie terenu'),
    async execute(interaction, client) {
        const button = new ButtonBuilder()
            .setCustomId('claim')
            .setLabel('Przejmij teren!')
            .setStyle(ButtonStyle.Danger);

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(button)]
        });
    }
}