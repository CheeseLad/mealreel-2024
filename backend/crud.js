const db = require('./database');

// CREATE
const createUser = (username, name, password, profileVisibility, callback) => {
  const sql = `INSERT INTO users (username, name, password, profileVisibility) VALUES (?, ?, ?, ?)`;
  db.run(sql, [username, name, password, profileVisibility], function(err) {
    callback(err, {id: this.lastID});
  })
}

// READ
const getUsers = (callback) => {
  const sql = `SELECT * FROM users`;
  db.all(sql, [], (callback) => {
  });
}

const getSingleUser = (username, callback) => {
  const sql = `SELECT * FROM users WHERE username = ?`;
  db.get(sql, [username], callback);
}

// UPDATE
const updateUser = (id, username, name, password, profileVisibility, callback) => {
  const sql = `UPDATE users SET username = ?, name = ?, password = ?, profileVisibility = ? WHERE id = ?`;
  db.run(sql, [username, name, password, profileVisibility, id], function(err) {
    callback(err);
  })
}

// DELETE
const deleteUser = (id, callback) => {
  const sql = `DELETE FROM users WHERE id = ?`;
  db.run(sql, id, callback);
}

module.exports = { createUser, getUsers, updateUser, deleteUser, getSingleUser };