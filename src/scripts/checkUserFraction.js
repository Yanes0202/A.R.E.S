const { readAllFractions } = require("../excel/readSheet.js");

const checkUserFraction = async (userRoles) => {
  const rolesName = [];
  const allFractions = await readAllFractions();
  const fractions = allFractions.flat();
  var playerFraction;

  userRoles.forEach((role) => {
    rolesName.push(role.name);
  });

  const checkIfValueExists = (value, array) => {
    if (array.includes(value)) {
      playerFraction = value;
    }
  };

  rolesName.forEach((value) => {
    checkIfValueExists(value, fractions);
  });
  return playerFraction;
};

module.exports = {
  checkUserFraction,
};
