const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const channel = client.channels.cache.get("1136653649439883294");

    const reqButton = new ButtonBuilder()
    .setCustomId("fractionRegister")
    .setLabel("📝 Zarejestruj frakcję")
    .setStyle(ButtonStyle.Success);
  const warButton = new ButtonBuilder()
    .setCustomId("declareWar")
    .setLabel("⚔️ Wypowiedz wojnę")
    .setStyle(ButtonStyle.Danger);
  const claimButton = new ButtonBuilder()
    .setCustomId("claimTerytory")
    .setLabel("🚩 Zajmij terytorium")
    .setStyle(ButtonStyle.Primary);

  const embed = new EmbedBuilder()
    .setTitle("PANEL ZARZĄDZANIA FRAKCJĄ")
    .setDescription(
      "Specjalny panel dla liderów frakcji dzięki któremu możliwe jest wykonywanie unikalnych rodzajów aktywności."
    )
    .setColor("#00ff00");


    channel.messages
      .fetch()
      .then((messages) => {
        // Przekształć mapę wiadomości na tablicę wiadomości.
        const messagesArray = Array.from(messages.values());
        // Usuń wszystkie wiadomości przy użyciu pętli.
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
      }).then(channel.send({
        embeds: [embed],
        components: [
          new ActionRowBuilder().addComponents(reqButton, warButton, claimButton),
        ],
      }));

    console.log(`Ready!!! ${client.user.tag} is logged in and online.`);
  },
};
