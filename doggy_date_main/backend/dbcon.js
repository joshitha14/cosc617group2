const mysql = require('mysql');

const con = mysql.createConnection({
  host: "127.0.0.1",
  port:3306,
  user: "root",
  password: "Joshitha@123",
  database: "doggydate"
});

module.exports = con;