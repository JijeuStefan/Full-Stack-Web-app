function Session(app){

    app.get("/session",(req, res) => {
        console.log(req.session.username);
        return req.session.username ? res.json({status: true, username: req.session.username}) : res.json({status: false})
        })
}

module.exports = Session;