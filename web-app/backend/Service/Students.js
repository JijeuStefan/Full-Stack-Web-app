const {check, validationResult} = require('express-validator');

function StudentService(app,db) {
    
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
    
    app.post("/student/add",[
        check('name','The name should be at least 3 letters long').exists().isLength({min: 3}),
        check('email','The email does not match the correct format').isEmail().normalizeEmail(),
        check('group','The group should be between 700 and 900').isInt({ min: 700, max: 900 })] ,
        (req, res) => {

            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.json(errors);
            }
            
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
    
    app.put("/student/update/:id",[
        check('name','The name should be at least 3 letters long').exists().isLength({min: 3}),
        check('email','The email does not match the correct format').isEmail().normalizeEmail(),
        check('group','The group should be between 700 and 900').isInt({ min: 700, max: 900 })] ,
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.json(errors);
            }

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

}

module.exports = StudentService;