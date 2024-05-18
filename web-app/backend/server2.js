const express = require("express");
const cors = require("cors");

const StartDB = require("./DB/MySQL");
const RegisterService = require("./Service/Register");
const StudentService = require("./Service/Students");

function StartServer(){
    const app = express();
    app.use(express.json());
    app.use(cors());

    const db = StartDB();

    RegisterService(app,db);
    StudentService(app, db);

    app.listen(8081, () => {
        console.log("listening");
    })

}

StartServer();