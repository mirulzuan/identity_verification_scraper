const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'spr_scraper.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('DB connection error:', err.message);
  } else {
    console.log('DB connected');
  }
});

module.exports = db;
