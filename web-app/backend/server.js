const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "university"
})

app.get("/",(req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql , (err, data) => {
        return err ? res.json("Error") : res.json(data);
    })
})

app.post("/add", (req, res) => {
    const sql = "INSERT INTO `students` (`Name`, `Email`, `Groups`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.group,
    ]
    db.query(sql , [values], (err, data) => {
        return err ? res.json("Error") : res.json(data);
    })
})

app.put("/update/:id", (req, res) => {
    const sql = "UPDATE `students` SET `Name` = ?,`Email` = ?,`Groups` = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.group
    ]
    const id = req.params.id;

    db.query(sql , [...values,id], (err, data) => {
        return err ? res.json("Error") : res.json(data);
    })
})

app.listen(8081, () => {
    console.log("listening");
})