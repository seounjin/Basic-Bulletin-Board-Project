const { findByToken, tokenTime, userLogout } = require('../models/User')
const moment = require("moment");


let auth = (req, res, next) => {
    let token = req.cookies.w_auth;
    //로그아웃할때 만료time 
    findByToken(token, (err, user)=> {

        if (err) throw console.log("에러",err);

        if (user.length === 0){
            return res.json({
                isAuth: false,
                error: true
            });
        } 
        
        tokenTime(user[0], (err, time)=> {

            if (err) return res.json({ success: false, err });

            const currentTime = moment().valueOf();

            if (currentTime > time){

                userLogout(user[0].id, (err) =>{
                    
                    if (err) return res.json({ success: false, err });
                   
                    return res.json({ isAuth: false, exp: true });

                });
            } else {
                req.token = token;
                req.user = user[0];
              
                next();
            }

        });
        

        // req.token = token;
        // req.user = user[0];
      
        // next();

    });

};

module.exports = { auth };