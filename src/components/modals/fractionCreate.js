const {
  getColumnToInsert,
  checkClaimedCrates,
  readAllFractions,
} = require("../../excel/readSheet.js");
const {
  replyEmbed,
  messageEmbed,
  sendEmbedOnChannel,
} = require("../../scripts/sendEmbed.js");
const { insertFraction, insertToMap } = require("../../excel/writeSheet.js");
const { columnToNumber } = require("../../scripts/columnToNumber.js");
const { rgbToHex, isRGBFormat } = require("../../scripts/colorScripts.js");
const { fractionLeaderRole, fractionLicenseRole } = process.env;
const { PermissionsBitField } = require("discord.js");

module.exports = {
  data: {
    name: "fractionCreate",
  },
  async execute(interaction, client) {
    const fractionName = interaction.fields.getTextInputValue("fractionName");
    const fractionTag = interaction.fields.getTextInputValue("fractionTag");
    const fractionColor = interaction.fields.getTextInputValue("fractionColor");
    const fractionType = interaction.fields.getTextInputValue("fractionType");
    const fractionCrate = interaction.fields.getTextInputValue("fractionCrate");
    const claimedCrates = await checkClaimedCrates();
    const fractionNames = await readAllFractions();

    await replyEmbed(`Pozwól że na to zerknę...`, 0x00ff00, interaction);

    if (fractionNames.flat().includes(fractionName)) {
      await messageEmbed(
        `Ty huncwocie! Chcesz dokonać plagiatu?! Frakcja o nazwie ${fractionName} już istnieje!`,
        0xcf2929,
        interaction
      );
      return;
    }

    if (fractionTag.length > 4) {
      await messageEmbed(
        "Tag frakcji musi być mniejszy bądź równy 4",
        0xcf2929,
        interaction
      );
      return;
    }

    if (
      fractionType.toLowerCase() !== "neutralna" &&
      fractionType.toLowerCase() !== "terytorialna" &&
      fractionType.toLowerCase() !== "pacyfistyczna"
    ) {
      await messageEmbed(
        "Umiesz czytać?! Co to za rodzaj frakcji?! Wybierz prawidłowy!",
        0xcf2929,
        interaction
      );
      return;
    }

    const isRGB = isRGBFormat(fractionColor);
    if (!isRGB) {
      await messageEmbed(
        `Ty gałganie! Kolor frakcji musi być typu RGB!!!`,
        0xcf2929,
        interaction
      );
      return;
    }

    if (!claimedCrates.includes(fractionCrate)) {
      const column = await getColumnToInsert();
      const colorSplited = fractionColor.split(",");
      const hexColor = rgbToHex(fractionColor);
      const red = parseInt(colorSplited[0]) / 255;
      const green = parseInt(colorSplited[1]) / 255;
      const blue = parseInt(colorSplited[2]) / 255;
      const color = {
        red: red,
        green: green,
        blue: blue,
      };
      const baseX = fractionCrate.match(/[a-zA-Z]+/g).join("");
      const baseY = fractionCrate.match(/\d+/g).join("");
      const columnNumber = columnToNumber(baseX);

      //Inserting fraction
      const fractionInsertCompleted = await insertFraction(
        fractionName,
        fractionTag,
        fractionType.toUpperCase(),
        fractionColor,
        fractionCrate,
        column
      );

      const mapInsertCompeted = await insertToMap(baseY, columnNumber, color);

      if (fractionInsertCompleted && mapInsertCompeted) {
        try {
          const leaderFractionRolePosition =
            interaction.guild.roles.cache.get(fractionLeaderRole);
          const fractionRole = await interaction.guild.roles.create({
            name: `${fractionName}`,
            color: hexColor,
            permissions: [],
            hoist: true,
            mentionable: true,
            position: parseInt(leaderFractionRolePosition.position),
            reason: "CREATED BY A.R.E.S - Rejestracja Frakcji!",
          });

          const channel = await interaction.guild.channels.create({
            name: `${fractionName}`,
            type: 0,
            reason: "CREATED BY A.R.E.S - Rejestracja Frakcji!",
            permissionOverwrites: [
              {
                id: interaction.guild.roles.everyone,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: fractionRole.id,
                allow: [
                  PermissionsBitField.Flags.ViewChannel,
                  PermissionsBitField.Flags.SendMessages,
                ],
              },
            ],
          });

          await interaction.member.roles.add(fractionRole);
          await interaction.member.roles.add(fractionLeaderRole);
          await interaction.member.roles.remove(fractionLicenseRole);
          await sendEmbedOnChannel(
            interaction.member.id,
            `Oto kanał tekstowy twojej frakcji. Tylko nie róbcie tu burdelu!`,
            0x00ff00,
            channel
          );
        } catch (error) {
          console.error("Error on role creating:", error);
          await messageEmbed(
            "Nastąpił błąd przy tworzeniu ról i kanałów na discordzie",
            0xcf2929,
            interaction
          );
          return;
        }
        messageEmbed(
          `Witaj w klubie szefunciu! Frakcja ${fractionName} została założona!`,
          0x00ff00,
          interaction
        );
      } else {
        await messageEmbed(
          "Nastąpił błąd przy wpisywaniu do excela",
          0xcf2929,
          interaction
        );
        return;
      }
    } else {
      await messageEmbed(
        "Czyś ty oszalał?! To już jest czyjś teren!",
        0xcf2929,
        interaction
      );
      return;
    }
  },
};
