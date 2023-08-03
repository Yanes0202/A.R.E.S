const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const pencil = '\:pencil:';
        const channel = client.channels.cache.get('373162586000195585');
        const reqButton = new ButtonBuilder()
        .setCustomId('fractionRegister')
        .setLabel("📝 Zarejestruj frakcję")
        .setStyle(ButtonStyle.Success);
        const warButton = new ButtonBuilder()
        .setCustomId('declareWar')
        .setLabel("⚔️ Wypowiedz wojnę")
        .setStyle(ButtonStyle.Danger);
        const claimButton = new ButtonBuilder()
        .setCustomId('claimTerytory')
        .setLabel("🚩 Zajmij terytorium")
        .setStyle(ButtonStyle.Primary);

        const embed = new EmbedBuilder()
            .setTitle('PANEL ZARZĄDZANIA FRAKCJĄ')
            .setDescription('Specjalny panel dla liderów frakcji dzięki któremu możliwe jest wykonywanie unikalnych rodzajów aktywności.')
            .setColor('#00ff00');

        channel.send({ embeds: [embed], components: [new ActionRowBuilder().addComponents(reqButton,warButton,claimButton)]})
        
        console.log(`Ready!!! ${client.user.tag} is logged in and online.`);
    }
}