const { sheetInstance, spreadsheetId } = require("./excelConnection.js");
const {  } = require("./readSheet.js")

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const todayDate = `${day}-${month}-${year}`;

const insertCell = async (cell, values) => {
  try {
    const response = sheetInstance.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: `Frakcje!${cell}`,
      valueInputOption: "RAW",
      resource: {
        values: [[`${values}`]],
      },
    });

    console.log(`${response.data} cell has been updated.`);
  } catch (error) {
    console.error(error);
  }
};

const insertClaimTimeStamp = async (column) => {
  try {
    const response = sheetInstance.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: `Frakcje!${column}5`,
      valueInputOption: "RAW",
      resource: {
        values: [[`${todayDate}`]],
      },
    });

    console.log(`${response.data} cell has been updated.`);
  } catch (error) {
    console.error(error);
  }
};

const insertFraction = async (fractionName, fractionTag, fractionType, fractionColor, fractionCrate, column) => {
  try {
    
    const response = sheetInstance.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: `Frakcje!${column}1:${column}6`,
      valueInputOption: "RAW",
      resource: {
        values: [[`${fractionName}`],[`${fractionTag}`],[`${fractionType}`],[`${fractionColor}`],[`${todayDate}`],[`${fractionCrate}`]],
      },
    });
      return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  insertCell,
  insertClaimTimeStamp,
  insertFraction
};
