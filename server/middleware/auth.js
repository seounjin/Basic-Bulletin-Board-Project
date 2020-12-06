const jwt = require('jsonwebtoken');
const { findId } = require('../controllers/users/helpers');

const auth = async(req, res, next) => {
    
    const token = req.cookies.accessToken;


    try {

        if (!token){
            return res.json({ isAuth: false, error: true });
        }
        
        const decode = await jwt.verify(token,'secret');
        
        const userInfo = await findId(decode.data);

        req.token = token;
        req.user = userInfo;
        next();


    } catch(err) {
        console.log("auth 에러", err);

        if (err.name === 'TokenExpiredError') {
            console.log("토큰time 만료");

            return res.json({ isAuth: true, exp: true });
        }

    }
    

};



module.exports = { auth };


