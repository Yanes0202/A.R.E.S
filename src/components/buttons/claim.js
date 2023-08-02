module.exports = {
    data: {
        name: `claim`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `Zdobyłeś teren`
        });
    }
}