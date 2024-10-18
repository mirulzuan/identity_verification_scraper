const db = require('./db');

db.serialize(() => {
  db.run(
    `
      CREATE TABLE IF NOT EXISTS verifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        identifier TEXT NOT NULL,
        result TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
    if (err) {
      console.error('verifications table creation error:', err.message);
    } else {
      console.log('Verifications table created');
    }
  });
});

db.close();
