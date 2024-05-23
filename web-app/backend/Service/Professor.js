const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

function ProfessorService(app,db) {

    function isAuthenticated(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) { 
            return res.status(401).json({ message: 'Unauthorized' }); 
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) =>{
            if(err){
                return res.status(401).json({ message: 'Invalid Token' }); }
            next();
        })}
    
    app.get("/professors",isAuthenticated,(req, res) => {
        const sql = "SELECT * FROM `proffesors`";
        db.query(sql , (err, data) => {
            return err ? res.json("Error") : res.json(data);
        })
    })

    app.get("/professor/:id", isAuthenticated,(req, res) => {
        const sql = "SELECT * FROM `proffesors` WHERE ID = ?";
    
        const id = req.params.id;
    
        db.query(sql , [id], (err, data) => {
            return err ? res.json("Error") : res.json(data);
        })
    })

    app.post("/professor/add",isAuthenticated,[
        check('name','The name should be at least 3 letters long').exists().isLength({min: 3}),
        check('course','The course should be at least 3 letters long').exists().isLength({min: 3})] ,
        (req, res) => {

            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.json(errors);
            }
            
            const sql = "INSERT INTO `proffesors` (`Name`, `Cours`) VALUES (?)";
            const values = [
                req.body.name,
                req.body.course
            ]
            db.query(sql , [values], (err, data) => {
                return err ? res.json("Error") : res.json(data);
            })
    })

    app.put("/professor/update/:id",isAuthenticated,[
        check('name','The name should be at least 3 letters long').exists().isLength({min: 3}),
        check('course','The course should be at least 3 letters long').exists().isLength({min: 3})] ,
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.json(errors);
            }

            const sql = "UPDATE `proffesors` SET `Name` = ?,`Cours` = ? WHERE ID = ?";
            const values = [
                req.body.name,
                req.body.course
            ]
            const id = req.params.id;
        
            db.query(sql , [...values,id], (err, data) => {
                return err ? res.json("Error") : res.json(data);
            })
    })


    app.delete("/professor/delete/:id", isAuthenticated,(req, res) => {
        const sql = "DELETE FROM `proffesors` WHERE ID = ?";
    
        const id = req.params.id;

        console.log(id);
    
        db.query(sql , [id], (err, data) => {
            return err ? res.json("Error") : res.json(data);
        })
    })
}

module.exports = ProfessorService;