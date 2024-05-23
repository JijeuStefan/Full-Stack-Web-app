const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function RegisterService(app, db) {

    function generateAccessToken(payload){
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    }
    
    
    // app.post('/token', (req,res)=>{
    //     const refreshToken = req.body.token;
    //     if (refreshToken == null) return res.sendStatus(403);
    //     const sql = "SELECT * FROM `credentials` WHERE `token` = ?";
    //     db.query(sql, [refreshToken], async (err, data) => {
    //         if (err) {
    //             return res.status(500).json("Error");
    //         }

    //         if (data.length === 0) {
    //             return res.status(403);
    //         }

    //         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user) =>{
    //             if(err){
    //                 return res.status(403); }
    //             const accessToken = generateAccessToken({email: user.email});
    //             res.json({accessToken: accessToken});
    //         })
    //     })

    // })

    app.post("/signin", [
        check('email', 'The email does not have the correct format').isEmail().normalizeEmail(),
        check('password', 'The password should be at least 8 characters long and contain an uppercase letter and a number').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
    
        try {
            const sql = "SELECT * FROM `credentials` WHERE `Email` = ?";
            db.query(sql, [req.body.email], async (err, data) => {
                if (err) {
                    return res.status(500).json("Error");
                }
    
                if (data.length === 0) {
                    return res.status(401).json({ Login: false });
                }
    
                const user = data[0];
    
                const passwordMatch = await bcrypt.compare(req.body.password, user.Password);
                if (!passwordMatch) {
                    return res.status(401).json({ Login: false });
                }
    
                const payload = { email: user.Email };
                const accessToken = generateAccessToken(payload);
                const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    
                const updateTokenSql = "UPDATE `credentials` SET `Token`=? WHERE `Email` = ?";
                db.query(updateTokenSql, [refreshToken, user.Email], (err, data) => {
                    if (err) {
                        return res.status(500).json({ Login: false });
                    }
                    return res.status(200).json({ Login: true, accessToken: accessToken, refreshToken: refreshToken });
                });
            });
        } catch (error) {
            return res.status(500).json("Error hashing password");
        }
    });
    
    
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
                        return res.json();
                    })}

                catch{
                    return res.status(500).json("Error hashing password");
                }
    })


    app.post("/logout",(req, res)=>{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) { 
            return res.status(401).json({ message: 'Unauthorized' }); 
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) =>{
            if(err){
                return res.status(403); }

            const updateTokenSql = "UPDATE `credentials` SET `Token`='' WHERE `Email` = ?";
            db.query(updateTokenSql, [user.email], (err, data) => {
                if (err) {
                    return res.status(500).json({ Login: false });
                }
                return res.status(200);
            });
        })
    })
    
}


module.exports = RegisterService;