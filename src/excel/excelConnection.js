require("dotenv").config();
const { serviceEmail, servicePrivateKey, spreadsheetId } = process.env;
const { google } = require("googleapis");

const googleAuth = new google.auth.JWT(
  serviceEmail,
  null,
  servicePrivateKey.replace(/\\n/g, "\n"),
  "https://www.googleapis.com/auth/spreadsheets"
);
const sheetInstance = google.sheets({
  version: "v4",
  auth: googleAuth,
});

module.exports = { sheetInstance, googleAuth, spreadsheetId };
