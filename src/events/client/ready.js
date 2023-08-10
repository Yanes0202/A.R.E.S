const { fractionPanelChannel, hadesLoggingChannel } = process.env;
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
    const activity = client.user.setActivity("twoich błagań o wybaczenie", {
      type: ActivityType.Listening,
    });

    //const channel = client.channels.cache.get(fractionPanelChannel);
    //const channel = client.channels.cache.get(hadesLoggingChannel);
/*
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

    const embed = new EmbedBuilder()
      .setTitle("PANEL ZARZĄDZANIA FRAKCJĄ")
      .setDescription(
        "Specjalny panel dla liderów frakcji dzięki któremu możliwe jest wykonywanie unikalnych rodzajów aktywności."
      )
      .setColor("#00ff00");
      /*
    const restartButton = new ButtonBuilder()
      .setCustomId("serverRestart")
      .setLabel("🔄 Wykonaj Restart Serwera")
      .setStyle(ButtonStyle.Secondary);*/


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
      .then(*//*
    channel.send({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(reqButton,claimButton,warButton)],
    });*/
    //);

    console.log(`Ready!!! ${client.user.tag} is logged in and online.`);
  },
};
