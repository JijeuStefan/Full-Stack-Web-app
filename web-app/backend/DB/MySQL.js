require('dotenv').config();

function StartDB(){
    const mysql = require("mysql");

    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })

    return db;
}

module.exports = StartDB;