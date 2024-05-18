const {check, validationResult} = require('express-validator');

function RegisterService(app, db) {

    app.post("/signin",[
        check('email','The email does not have the correct format').isEmail().normalizeEmail(),
        check('password')
        .custom((value) => {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(value)) {
                throw new Error('The password must be at least 8 characters long and contain at least one uppercase letter and one digit');
            }
            return true;
        })],
        (req, res) => {

            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.json(errors);
            }

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
    
}


module.exports = RegisterService;