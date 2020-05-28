const { findByToken } = require('../models/User')


let auth = (req, res, next) => {
    let token = req.cookies.w_auth;

    findByToken(token, (err, user)=> {

        if (err) throw err;
        if (user.length === 0){
            return res.json({
                isAuth: false,
                error: true
            });
        }

        req.token = token;
        req.user = user[0];//여기
        console.log("user[0]", user[0]);
        console.log("user[02]", user);
        next();

    });

};

module.exports = { auth };