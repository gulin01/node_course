const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

// Connect and Check for errors
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      return console.error("Database connection lost");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      return console.error("Database has too many connection");
    }
    if (err.code === "ECONNREFUSED") {
      return console.error("Database connection was refused");
    }
  }
  if (connection) connection.release();

  return;
});

module.exports = pool;
