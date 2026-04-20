// const {DB_HOST,DBUSERNAME, DB_PASSWORD, DB_NAME} = process.env;

// var mysql = require('mysql');

// let con = mysql.createConnection({
//   host: DB_HOST,
//   user: DBUSERNAME,
//   password: DB_PASSWORD,
//   database: DB_NAME
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log(DB_NAME + " Connected to the database!");
// });

const mysql = require('mysql');
require('dotenv').config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

con.connect((err) => {
  if (err) throw err;
  console.log("✅ Database Connected!");
});

module.exports = con;
