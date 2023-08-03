var X = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "AA",
  "AB",
  "AC",
  "AD",
  "AE",
  "AF",
  "AG",
  "AH",
  "AI",
  "AJ",
  "AK",
  "AL",
  "AM",
  "AN",
  "AO",
  "AP",
  "AQ",
  "AR",
  "AS",
  "AT",
  "AU",
  "AV",
  "AW",
  "AX",
  "AY",
  "AZ",
];

var Y = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];

var table = [];

const kratkiDoPrzejecia = (teren) => {
  var result = [];

  for (let i = 0; i < teren.length; i++) {
    var odpowiedz = [];

    var gridBazy = teren[i];

    const baseX = gridBazy.match(/[a-zA-Z]+/g).join("");
    const baseY = gridBazy.match(/\d+/g).join("");

    const indexX = X.indexOf(baseX);
    const indexY = Y.indexOf(baseY);

    if (teren.length >= 3) {
      if (X[indexX - 1] && Y[indexY - 1])
        odpowiedz.push(X[indexX - 1] + Y[indexY - 1]);
      if (X[indexX - 1] && Y[indexY + 1])
        odpowiedz.push(X[indexX - 1] + Y[indexY + 1]);
      if (X[indexX + 1] && Y[indexY - 1])
        odpowiedz.push(X[indexX + 1] + Y[indexY - 1]);
      if (X[indexX + 1] && Y[indexY + 1])
        odpowiedz.push(X[indexX + 1] + Y[indexY + 1]);
    }

    if (X[indexX - 1] && Y[indexY]) odpowiedz.push(X[indexX - 1] + Y[indexY]);
    if (X[indexX] && Y[indexY - 1]) odpowiedz.push(X[indexX] + Y[indexY - 1]);
    if (X[indexX] && Y[indexY + 1]) odpowiedz.push(X[indexX] + Y[indexY + 1]);
    if (X[indexX + 1] && Y[indexY]) odpowiedz.push(X[indexX + 1] + Y[indexY]);

    result.push(odpowiedz);
  }

  if (teren.length >= 3) {
    const flatArray = result.flat();
    const elementCountMap = new Map();

    flatArray.forEach((item) => {
      elementCountMap.set(item, (elementCountMap.get(item) || 0) + 1);
    });

    const duplicates = Array.from(elementCountMap.entries())
      .filter(([item, count]) => count > 1)
      .map(([item]) => item);

    var result = duplicates.filter((item) => !teren.includes(item));
  } else {
    var polaczona = [...new Set(result.flat())];

    result = polaczona.filter((item) => !teren.includes(item));
  }

  return result;
};

module.exports = {
  kratkiDoPrzejecia,
};
