const jwt = require('jsonwebtoken');
const pool = require('../config/pool');


const auth = async(req, res, next) => {
    
    const token = req.cookies.accessToken;


    try {

        if (!token){
            return res.json({ isAuth: false, error: true });
        }
        
        const decode = await jwt.verify(token,'secret');
        
        const userInfo = await findUserInfo(decode.data);

        req.token = token;
        req.user = userInfo[0];
        next();


    } catch(err) {
        console.log("auth 에러", err);

        if (err.name === 'TokenExpiredError') {
            console.log("토큰time 만료");

            return res.json({ isAuth: true, exp: true });
        }

    }
    

};


const findUserInfo = async id => {

    const conn = await pool.getConnection();
    
    try {
        await conn.beginTransaction();

        const [result] = await conn.query("SELECT * FROM User WHERE id=?",[id]);

        await conn.commit();

        conn.release();

        return result;
    
    } catch (err) {

        console.log("에러",err);

        conn.rollback();

        conn.release();
    }

}


module.exports = { auth };


