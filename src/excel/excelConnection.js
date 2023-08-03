require('dotenv').config();
const { serviceEmail, servicePrivateKey } = process.env
const { google } = require('googleapis');

// authenticate the service account
const googleAuth = new google.auth.JWT(
    serviceEmail,
    null,
    servicePrivateKey.replace(/\\n/g, '\n'),
    'https://www.googleapis.com/auth/spreadsheets'
);

module.exports = {googleAuth};