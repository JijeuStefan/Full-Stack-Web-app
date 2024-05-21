const {check, validationResult} = require('express-validator');

function RegisterService(app, db) {

    app.post("/signin",[
        check('email','The email does not have the correct format').isEmail().normalizeEmail(),
        check('password','The password should be at least 8 caracters long and contain an Upper Case letter and a number').isStrongPassword({minLength: 8,minLowercase:1 ,minUppercase: 1, minNumbers: 1, minSymbols: 0})],
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
                    req.session.username = data[0].Email;                    
                    return res.json({Login: true});
                }
                else {
                    return res.json({Login: false});
                }
        
            })
    })
    
    
    app.post("/signup",[
        check('name','The name should be at least 3 letters long').exists().isLength({min: 3}),
        check('email','The email does not have the correct format').isEmail().normalizeEmail(),
        check('password','The password should be at least 8 caracters long and contain an Upper Case letter and a number').isStrongPassword({minLength: 8,minLowercase:1 ,minUppercase: 1, minNumbers: 1, minSymbols: 0})
       ],(req, res) => {

                const errors = validationResult(req);
                if (!errors.isEmpty()){
                    return res.json(errors);
                }

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