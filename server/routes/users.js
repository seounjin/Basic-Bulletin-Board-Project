const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/users')
const { auth } = require("../middleware/auth");
const fs = require('fs');

router.post("/register", registerUser);

// const express = require('express');
// const { userLogout, getLoginTime, setLogoutTime } = require('../models/User');
// const router = express.Router();
// const { auth } = require("../middleware/auth");
// const fs = require('fs');
// const pool = require('../config/pool');
// const jwt = require('jsonwebtoken');
// const crypto = require("crypto");
// const moment = require("moment");


// router.get("/tokenRequest", async(req, res) => {

//     const conn = await pool.getConnection();
    
//     const refreshToken = req.cookies.refreshToken;
    

//     try {

//         await conn.beginTransaction();

//         const [result] = await conn.query("SELECT * FROM User WHERE token=?", [refreshToken]);

//         if (!result){
//             console.log("refreshToken이 일치하지 않음");
//             return res.status.json( { success: false, err } );
//         }


//         const decode = await jwt.verify(refreshToken,'example');

//         const token =  await jwt.sign( {data: decode.data}, 'secret', { expiresIn: 30 });


//         await conn.commit();

//         conn.release();


//         return res.cookie("accessToken", token)
//                 .status(200).json( { success: true } );
        
    
//     } catch (err) {
        
//         conn.rollback();

//         conn.release();

//         console.log("토큰 요청 에러",err);

//         return res.status(400).json( { success: false, err } );
//     }


// });

// router.post("/register", async(req, res) => {

//     const conn = await pool.getConnection();
    
//     const userInfo = [req.body.id, req.body.password, req.body.email, 0];

//     try {

//         await conn.beginTransaction();

//         await conn.query("INSERT INTO `User` (`id`, `password`, `email`, `role`) VALUES (?, ?, ?, ?)", userInfo);

//         await conn.commit();

//         conn.release();

//         return res.status(200).json( { success: true } );
    
//     } catch (err) {
        
//         conn.rollback();

//         conn.release();

//         console.log("에러",err);

//         return res.status(400).json( { success: false, err } );
//     }


// });


router.get("/publickey", (req, res) => {

    fs.readFile('./keys/public.pem', 'utf8', (err, publicKey) => {

        if (err) return res.status(400).json({ success: false, err });

        return res.status(200).json({ success: true, publicKey });
    });

});


// router.post("/login", async(req, res) => {

//     const conn = await pool.getConnection();
    
//     const userId = req.body.id;
//     const password = req.body.password;
//     const loginDate = req.body.loginDate;


//     try {

//         await conn.beginTransaction();

//         const [result] = await conn.query("SELECT password, id FROM BulletinBoard.User where id=?",[userId]);

//         // 해당 ID가 없을 경우
//         if (result.length === 0){

//             return res.json({ loginSuccess: false });
//         }

//         const privateKey = await fs.promises.readFile('./keys/private.pem', 'utf8');

//         const dbPassword = crypto.privateDecrypt(privateKey, Buffer.from(result[0].password, "base64")).toString('utf8');

//         const userPassword = crypto.privateDecrypt(privateKey, Buffer.from(password, "base64")).toString('utf8');

//         // 사용자가 보낸 password 복호한것과 데이터베이스에있는 password 복호화해서 비교
//         if (dbPassword !== userPassword){
//             return res.json({ loginSuccess: false });
//         } 

//         // 로그인 로그
//         await conn.query("INSERT INTO `BulletinBoard`.`ConnectionRecord` (`connID`, `connStartDate`, `connEndDate`) VALUES (?, ?, NULL)",[userId, loginDate]);
        
//         // 토큰생성
//         const token =  jwt.sign( {data: userId}, 'secret', { expiresIn: '120m' });
//         const refreshToken =  jwt.sign( {data: userId}, 'example', { expiresIn: '14d' });


//         const tokenExp  = moment().add(2, 'hours').valueOf();
//         await conn.query("UPDATE `User` SET `token` = ?, `tokenExp` = ? WHERE (`id` = ?)",[refreshToken, tokenExp, userId]);

//         await conn.commit();

//         conn.release();

//         res.cookie('refreshToken', refreshToken, {
//             expires: new Date(Date.now() + 604800),
//             secure: false, // https 사용할 때 True
//             httpOnly: true,
//           });
//         res.cookie('accessToken ', token, {
//             expires: new Date(Date.now() + 604800),
//             secure: false, // https 사용할 때 True
//             httpOnly: true,
//           })
//             .status(200)
//             .json({ loginSuccess: true, userId: userId });
          
        
//     } catch (err) {
        
//         console.log("로그인에러",err);
//         conn.rollback();

//         conn.release();

//         return res.status(400).json( { loginSuccess: false, err } );
//     }

// });


// router.get("/logout", auth, (req, res)=> {

//     userLogout(req.user.id, (err) =>{
    
//         if (err) return res.json({ success: false, err });

//         var moment = require('moment');
//         var logoutDate = moment().format('YYYY-MM-DD HH:mm:ss');
        
//         getLoginTime(req.user.id, (err, login_Time) => {
//             if(err) return res.json({ success: false, err });

//             const data = {
//                 logoutTime : logoutDate,
//                 userId: req.user.id,
//                 loginTime : login_Time
//             }

//             setLogoutTime(data, (err) => {
//                 if(err) {
//                     return res.json({ success: false, err });
//                 }
//                 res.clearCookie('accessToken')
//                 res.clearCookie('refreshToken')
//                    .status(200).send({ success: true })
//             })
//         })
//         //얻은time으로 로그아웃 time 넣기
//     });
// });



router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        id: req.user.id,
        isAdmin: req.user.role === 1 ? true : false,
        isAuth: true,
        email: req.user.email,
        role: req.user.role
    });
});



module.exports = router;
