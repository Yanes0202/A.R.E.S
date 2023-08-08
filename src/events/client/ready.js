const { discordChannel } = process.env;
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActivityType,
} = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.commands.delete('ping');
    client.commands.delete('claim');
    client.commands.delete('button');
    client.commands.delete('embed');
    const activity = client.user.setActivity('twoich błagań o wybaczenie', { type: ActivityType.Listening });
    /*
    const channel = client.channels.cache.get(discordChannel);

    const reqButton = new ButtonBuilder()
      .setCustomId("fractionRegister")
      .setLabel("📝 Zarejestruj frakcję")
      .setStyle(ButtonStyle.Success);
    const claimButton = new ButtonBuilder()
      .setCustomId("claimTerytory")
      .setLabel("🚩 Zajmij terytorium")
      .setStyle(ButtonStyle.Primary);
    const warButton = new ButtonBuilder()
      .setCustomId("declareWar")
      .setLabel("⚔️ Wypowiedz wojnę")
      .setStyle(ButtonStyle.Danger);
    const mapButton = new ButtonBuilder()
      .setCustomId("showMap")
      .setLabel("🗺️ Pokaż mapę")
      .setStyle(ButtonStyle.Secondary);

    const embed = new EmbedBuilder()
      .setTitle("PANEL ZARZĄDZANIA FRAKCJĄ")
      .setDescription(
        "Specjalny panel dla liderów frakcji dzięki któremu możliwe jest wykonywanie unikalnych rodzajów aktywności."
      )
      .setColor("#00ff00");
    /*
    channel.messages
      .fetch()
      .then((messages) => {
        const messagesArray = Array.from(messages.values());
        messagesArray.forEach((message) => {
          message.delete().catch((error) => {
            console.error(
              `Nie udało się usunąć wiadomości ${message.id}: ${error}`
            );
          });
        });

        console.log("Wszystkie wiadomości zostały usunięte.");
      })
      .catch((error) => {
        console.error(`Nie udało się pobrać wiadomości: ${error}`);
      })
      .then(
    channel.send({
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(
          reqButton,

          claimButton,
          warButton,
          mapButton
        ),
      ],
    });*/
    //);

    console.log(`Ready!!! ${client.user.tag} is logged in and online.`);
  },
};
