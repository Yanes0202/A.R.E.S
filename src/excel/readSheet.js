require("dotenv").config();
const { spreadsheetId } = process.env;
const { googleAuth } = require("./excelConnection.js");
const { google } = require("googleapis");

const checkFractionColumn = async (fraction) => {
  try {
    // google sheet instance
    const sheetInstance = await google.sheets({
      version: "v4",
      auth: googleAuth,
    });
    // read data in the range in a sheet
    const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
      auth: googleAuth,
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

    return checkFractionCrates(columnLetter);
  } catch (err) {
    console.log("readSheet func() error", err);
  }
};

const checkFractionCrates = async (column) => {
  try {
    // google sheet instance
    const sheetInstance = await google.sheets({
      version: "v4",
      auth: googleAuth,
    });
    // read data in the range in a sheet
    const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
      auth: googleAuth,
      spreadsheetId: spreadsheetId,
      range: `Frakcje!${column}4:${column}20`,
    });

    const sheetresult = infoObjectFromSheet.data.values;
    return sheetresult.flat();
  } catch (err) {
    console.log("readSheet func() error", err);
  }
};

const readAllFractions = async () => {
  try {
    const sheetInstance = await google.sheets({
      version: "v4",
      auth: googleAuth,
    });

    const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
      auth: googleAuth,
      spreadsheetId: spreadsheetId,
      range: "Frakcje!B1:R1",
    });

    const valuesFromSheet = infoObjectFromSheet.data.values;
    return valuesFromSheet;
  } catch (err) {
    console.log("readSheet func() error", err);
  }
};

module.exports = {
  checkFractionColumn,
  readAllFractions,
  checkFractionCrates,
};
