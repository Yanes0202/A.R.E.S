const { terytorialFractionRole, neutralFractionRole, pacifistFractionRole } =
  process.env;
const { readAllFractions } = require("../excel/readSheet.js");

const expansionLimitation = (fractionType, fractionTimestamp) => {
  switch (fractionType) {
    case "TERYTORIALNA":
      return haveDaysPassed(fractionTimestamp, 1);

    case "NEUTRALNA":
      return haveDaysPassed(fractionTimestamp, 2);

    case "PACYFISTYCZNA":
      return haveDaysPassed(fractionTimestamp, 3);

    default:
      break;
  }
};

const haveDaysPassed = (startDate, days) => {
  const claimDate = new Date(startDate);
  const now = new Date();
  const elapsedMilliseconds = now - claimDate;
  const elapsedDays = elapsedMilliseconds / (1000 * 60 * 60 * 24);

  return elapsedDays >= days;
};

const addFractionTypeRole = async (fractionType, interaction) => {
  switch (fractionType) {
    case "TERYTORIALNA":
      await interaction.member.roles.add(terytorialFractionRole);
      break;

    case "NEUTRALNA":
      await interaction.member.roles.add(neutralFractionRole);
      break;

    case "PACYFISTYCZNA":
      await interaction.member.roles.add(pacifistFractionRole);
      break;

    default:
      break;
  }
};

const checkFractionType = async (userRoles) => {
  const validRoleIds = [terytorialFractionRole, neutralFractionRole, pacifistFractionRole];

  for (const role of userRoles.values()) {
    if (validRoleIds.includes(role.id)) {
      return role.id;
    }
  }

  return false;
};

const checkUserFraction = async (userRoles) => {
  const allFractions = await readAllFractions();
  const fractions = allFractions.flat();

  const playerFraction = userRoles.find((role) => fractions.includes(role.name));

  return playerFraction ? playerFraction : false;
};

module.exports = {
  expansionLimitation,
  addFractionTypeRole,
  checkUserFraction,
  checkFractionType,
};
