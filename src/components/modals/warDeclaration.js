const {
  rolePlayParentChannel,
  staffRole,
  moderatorRole,
  communityRole,
  failureColor,
} = process.env;
const { checkUserFraction } = require("../../scripts/fractionScripts.js");
const { replyEmbed } = require("../../scripts/sendEmbed.js");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "warDeclaration",
  },
  async execute(interaction, client) {
    await replyEmbed(`A więc wojna...`, parseInt(failureColor), interaction);
    const fractionName =
      interaction.fields.getTextInputValue("warFractionName");
    const warType = interaction.fields.getTextInputValue("warType");
    const warReasons = interaction.fields.getTextInputValue("warReasons");
    const userFractionName = await checkUserFraction(interaction.member.roles.cache);
    const parent = interaction.guild.channels.cache.get(rolePlayParentChannel);
    const channel = await interaction.guild.channels.create({
      name: `wojna${userFractionName.name} - ${fractionName}`,
      type: 0,
      parent: parent,
      reason: "CREATED BY A.R.E.S - Wypowiedzenie wojny!",
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: interaction.member.user.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
          ],
        },
      ],
    });
    const embed = new EmbedBuilder()
      .setTitle(
        `Frakcja ${userFractionName.name} ma zamiar wypowiedzieć wojnę frakcji ${fractionName}`
      )
      .setDescription(
        `Będzie to wojna typu:
      ***${warType}***
      Takie powody jej wypowiedzenia deklarują:
      ***${warReasons}***`
      )
      .setColor(parseInt(failureColor));
    await channel.send(
      `<@&${staffRole}><@&${moderatorRole}><@&${communityRole}><@${interaction.member.user.id}>`
    );
    await channel.send({ embeds: [embed] });
  },
};
