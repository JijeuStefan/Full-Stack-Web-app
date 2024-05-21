const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function RegisterService(app, db) {

    app.post("/signin",[
        check('email','The email does not have the correct format').isEmail().normalizeEmail(),
        check('password','The password should be at least 8 caracters long and contain an Upper Case letter and a number').isStrongPassword({minLength: 8,minLowercase:1 ,minUppercase: 1, minNumbers: 1, minSymbols: 0})],
        async (req, res) => {

            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.json(errors);
            }


            try {
                const sql = "SELECT * FROM `credentials` WHERE `Email` = ?";
                db.query(sql , [req.body.email,req.body.password], async (err, data) => {
                    if (err){
                        return res.json("Error");
                    }

                    if (data.length > 0){

                        const user = data[0];
                        
                        if (await bcrypt.compare(req.body.password, user.Password)) {
                            req.session.username = user.Email;
                            return res.json({Login: true});
                        }
                    }
                    return res.json({Login: false});
                    
            
                })}
            catch {
                return res.status(500).json("Error hashing password");
            }
    })
    
    
    app.post("/signup",[
        check('name','The name should be at least 3 letters long').exists().isLength({min: 3}),
        check('email','The email does not have the correct format').isEmail().normalizeEmail(),
        check('password','The password should be at least 8 caracters long and contain an Upper Case letter and a number').isStrongPassword({minLength: 8,minLowercase:1 ,minUppercase: 1, minNumbers: 1, minSymbols: 0})
       ],async (req, res) => {

                const errors = validationResult(req);
                if (!errors.isEmpty()){
                    return res.json(errors);
                }

                try {
                    const hashedPassword = await bcrypt.hash(req.body.password, 5);
                    console.log(hashedPassword);
                    const sql = "INSERT INTO `credentials` (`Name`, `Email`, `Password`) VALUES (?)";
                    const values = [
                        req.body.name,
                        req.body.email,
                        hashedPassword
                    ]
                
                    db.query(sql , [values], (err, data) => {
                        if (err){
                            return res.json("Error");
                        }
                        req.session.username = req.body.email;
                        return res.json("Success");
                    })}

                catch{
                    return res.status(500).json("Error hashing password");
                }
    })
    
}


module.exports = RegisterService;