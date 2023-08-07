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

const scriptAuth = () => {
  try {
    return script = google.script({ version: "v1", auth: googleAuth });
  } catch (error) {
    console.error("Błąd przy autoryzacji skryptu:", error);
  }
} 

module.exports = { sheetInstance, googleAuth, spreadsheetId, scriptAuth, google };
