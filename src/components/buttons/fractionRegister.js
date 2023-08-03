module.exports = {
    data: {
        name: `fractionRegister`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `Rejestrowanie frakcji`
        });
    }
}