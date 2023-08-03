const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Returns embed'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle("This is EMBED!")
            .setDescription("Some intresting description")
            .setColor(0x18e1ee)
            .setImage(client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setAuthor({
                url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.tag
            })
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag
            })
            .setFields()
            .setURL(`https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
            .addFields([
                {
                    name: `Field2`,
                    value: `Field2`,
                    inline: true
                }
            ]);

            await interaction.reply({
                embeds: [embed]
            });
    },
};