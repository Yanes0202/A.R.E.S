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

module.exports = {
  expansionLimitation,
};
