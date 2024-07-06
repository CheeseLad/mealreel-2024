const sqlite3 = require('sqlite3').verbose();
const dbName = 'meelreal.db';

let db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Connected to the database.');
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, name TEXT, password TEXT, profileVisibility TEXT)', (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
      console.log('Table created or already exists.');
    }
  });
});

module.exports = db;