require('dotenv').config({ path: './Service/.env' })
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


const StartDB = require("./DB/MySQL");
const RegisterService = require("./Service/Register");
const StudentService = require("./Service/Students");
const ProfessorService = require("./Service/Professor");

function StartServer(){
    const app = express();
    app.use(cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(bodyParser.json());

    const db = StartDB();

    RegisterService(app,db);
    StudentService(app,db);
    ProfessorService(app,db);

    app.listen(8081, () => {
        console.log("listening");
    })

}

StartServer();