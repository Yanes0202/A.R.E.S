const { sheetInstance, spreadsheetId } = require("./excelConnection.js");
const {} = require("./readSheet.js");

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const todayDate = `${day}-${month}-${year}`;

const insertCell = async (cell, values) => {
  try {
    sheetInstance.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: `Frakcje!${cell}`,
      valueInputOption: "RAW",
      resource: {
        values: [[`${values}`]],
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const insertClaimTimeStamp = async (column) => {
  try {
    sheetInstance.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: `Frakcje!${column}5`,
      valueInputOption: "RAW",
      resource: {
        values: [[`${todayDate}`]],
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const insertFraction = async (
  fractionName,
  fractionTag,
  fractionType,
  fractionColor,
  fractionCrate,
  column
) => {
  try {
    sheetInstance.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: `Frakcje!${column}1:${column}6`,
      valueInputOption: "RAW",
      resource: {
        values: [
          [`${fractionName}`],
          [`${fractionTag}`],
          [`${fractionType}`],
          [`${fractionColor}`],
          [`${todayDate}`],
          [`${fractionCrate}`],
        ],
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const insertToMap = async (row, column, color) => {
  const request = {
    spreadsheetId: spreadsheetId,
    resource: {
      requests: [
        {
          repeatCell: {
            range: {
              sheetId: 0,
              startRowIndex: parseInt(row) - 1,
              endRowIndex: row,
              startColumnIndex: column - 1,
              endColumnIndex: column,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: color,
              },
            },
            fields: "userEnteredFormat(backgroundColor,textFormat)",
          },
        },
      ],
    },
  };

  try {
    await sheetInstance.spreadsheets.batchUpdate(request);
    return true;
  } catch (error) {
    console.error("Error changing background color:", error);
    return false;
  }
}

const insertTagToMap = async (cell, value) => {
  try {
    sheetInstance.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: `Mapa!${cell}`,
      valueInputOption: "RAW",
      resource: {
        values: [[`${value}`]],
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
  insertFraction,
  insertToMap,
  insertTagToMap,
};
