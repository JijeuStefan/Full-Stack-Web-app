function StartDB(){
    const mysql = require("mysql");

    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    })

    return db;
}

module.exports = StartDB;