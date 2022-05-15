// this connects to our database
const mysql = require('mysql2');

require("dotenv").config();

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "employee_tracker",
    },
    console.log('connected to the employee_tracker database.')
);

module.exports = db;