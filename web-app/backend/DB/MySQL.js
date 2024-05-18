function StartDB(){
    const mysql = require("mysql");

    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "university"
    })

    return db;
}

module.exports = StartDB;