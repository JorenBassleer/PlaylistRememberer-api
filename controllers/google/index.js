const { google } = require('googleapis');
require('dotenv').config();

const googleAPIKEY = process.env.YOUTUBE_API_KEY;

console.log('google api key:=', googleAPIKEY);