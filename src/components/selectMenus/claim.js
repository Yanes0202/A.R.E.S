module.exports = {
    data: {
        name: `claim`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `You selected: ${interaction.values[0]}`
        })
    }
}