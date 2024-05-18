function RegisterService(app, db) {
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
    
}


module.exports = RegisterService;