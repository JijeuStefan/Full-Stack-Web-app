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

app.post("/signin", (req, res) => {
    const sql = "SELECT * FROM `credentials` WHERE `Email` = ? AND `Password` = ?";
    db.query(sql , [req.body.email,req.body.password], (err, data) => {
        if (err){
            return res.json("Error");
        }
        if (data.length > 0){
            return res.json("Success");
        }
        else {
            return res.json("Fail");
        }

    })
})


app.post("/signup", (req, res) => {
    const sql = "INSERT INTO `credentials` (`Name`, `Email`, `Password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
    ]

    db.query(sql , [values], (err, data) => {
        return err ? res.json("Error") : res.json(data);
    })
})

app.get("/students",(req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql , (err, data) => {
        return err ? res.json("Error") : res.json(data);
    })
})

app.get("/student/:id", (req, res) => {
    const sql = "SELECT * FROM `students` WHERE ID = ?";

    const id = req.params.id;

    db.query(sql , [id], (err, data) => {
        return err ? res.json("Error") : res.json(data);
    })
})

app.post("/student/add", (req, res) => {
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

app.put("/student/update/:id", (req, res) => {
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

app.delete("/student/delete/:id", (req, res) => {
    const sql = "DELETE FROM `students` WHERE ID = ?";

    const id = req.params.id;

    db.query(sql , [id], (err, data) => {
        return err ? res.json("Error") : res.json(data);
    })
})

app.listen(8081, () => {
    console.log("listening");
})