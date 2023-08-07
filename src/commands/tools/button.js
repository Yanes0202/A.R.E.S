const { SlashCommandBuilder } = require('discord.js');
const { changeCellBackgroundColor } = require("../../excel/writeSheet.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Przejmowanie terenu'),
    async execute(interaction, client) {
        
    }
}