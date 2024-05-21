const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


const StartDB = require("./DB/MySQL");
const Session = require("./Service/Session")
const RegisterService = require("./Service/Register");
const StudentService = require("./Service/Students");

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
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24
        }
    }))

    const db = StartDB();

    Session(app);
    RegisterService(app,db);
    StudentService(app,db);

    app.listen(8081, () => {
        console.log("listening");
    })

}

StartServer();