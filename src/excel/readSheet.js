const { sheetInstance, spreadsheetId } = require("./excelConnection.js");

const checkFractionColumn = async (fraction) => {
  try {
    const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: "Frakcje!A1:R1",
    });
    const sheetresult = infoObjectFromSheet.data.values;
    const values = sheetresult.flat();

    const getColumnLetter = (col) => {
      let letter = "";
      while (col > 0) {
        const remainder = (col - 1) % 26;
        letter = String.fromCharCode(65 + remainder) + letter;
        col = Math.floor((col - 1) / 26);
      }
      return letter;
    };
    var columnLetter = "";
    for (let col = 0; col < values.length; col++) {
      if (values[col] === fraction) {
        columnLetter = getColumnLetter(col + 1);
      }
    }

    return columnLetter;
  } catch (error) {
    console.error(error);
  }
};

const checkFractionCrates = async (column) => {
  try {
    const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: `Frakcje!${column}6:${column}50`,
    });

    const sheetresult = infoObjectFromSheet.data.values;
    return sheetresult;
  } catch (error) {
    console.error(error);
  }
};

const readAllFractions = async () => {
  try {
    const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: "Frakcje!B1:R1",
    });

    const valuesFromSheet = infoObjectFromSheet.data.values;
    return valuesFromSheet;
  } catch (error) {
    console.error(error);
  }
};

const getColumnToInsert = async () => {
  try {
    const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: "Frakcje!A1:R1",
    });
    var column;
    const valuesFromSheet = infoObjectFromSheet.data.values;
    for (var i = 0; i < valuesFromSheet[0].length; i++) {
      if (!valuesFromSheet[0][i]) {
        column = i + 1;
        break;
      } else {
        column = i + 2;
      }
    }
    const columnLetter = String.fromCharCode(64 + column);
    return columnLetter;
  } catch (error) {
    console.error(error);
  }
}

const checkClaimedCrates = async () => {
  try {
    const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: "Frakcje!B6:R50",
    });

    const sheetresult = infoObjectFromSheet.data.values;
    return sheetresult.flat();
  } catch (error) {
    console.error(error);
  }
};

const getRowToInsert = async (column) => {
  try {
    const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: `Frakcje!${column}6:${column}50`,
    });

    const sheetresult = infoObjectFromSheet.data.values;
    var row;
    if (sheetresult && sheetresult.length > 0) {
      for (var i = 0; i < sheetresult.length; i++) {
        if (!sheetresult[i][0]) {
          row = i + 6;
          break;
        } else {
          row = i + 7;
        }
      }
      return row;
    } else {
      console.error("Frakcja ma pusty łeb");
    }

    return sheetresult.flat();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  checkFractionColumn,
  readAllFractions,
  checkClaimedCrates,
  getRowToInsert,
  checkFractionCrates,
  getColumnToInsert
};
