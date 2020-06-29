const express = require('express');
const bcrypt = require('bcrypt');
const { userRegister, userLogin, generateToken, userLogout, recordUserLoginDate, getLoginTime, setLogoutTime } = require('../models/User');
const router = express.Router();
const { auth } = require("../middleware/auth");
const pool = require('../config/pool');


router.post("/register", (req, res) => {

    userRegister(req.body, (err) => {

        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    });
});

// router.post("/login2", async (req, res) => { //body = {id, password, loginDate}

//     const ld = req.body.loginDate;
//     const conn = await pool.getConnection();

//     try {
//         await conn.beginTransaction();

//         const [rows] = await conn.query('SELECT password, id FROM BulletinBoard.User where id=?', [req.body.id]);
//         console.log("rows 출력:     ", rows);

//         bcrypt.compare(req.body.password, rows[0].password, function(err, isMatch){
//             if(isMatch) {
//                 break;
//             }
//             else {

//                 conn.rollback();

//                 conn.release();

//                 if (err) return res.status(400).json( { loginSuccess: false } );
//             }
//         })

//         await conn.query('INSERT INTO `BulletinBoard`.`ConnectionRecord` (`connID`, `connDate`) VALUES (?, ?)', [req.body.id, req.body.loginDate]);

//         await conn.commit();

//         conn.release();

//         return res.status(200).json( { loginSuccess: true } );

//     } catch (err) {
//         //console.log("에러가 발생했어요~~!!", err);
//         conn.rollback();

//         conn.release();

//         if (err) return res.status(400).json( { loginSuccess: false } );
//     }

// });

router.post("/login", (req, res) => {

    userLogin(req.body, (err, isMatch) => {
        if (err) return res.json({ 
            loginSuccess: false
        });
        if (!isMatch) {
            return res.json({ 
                loginSuccess: false
            });
        }

        recordUserLoginDate(req.body, (err) => {
            if (err) return res.json({ 
                loginSuccess: false
            });

            generateToken(req.body,(err,token) => {

                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", "1111");
                res
                    .cookie("w_auth", token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: req.body.id
                    });
            })//
        })
    });
});

router.get("/logout", auth, (req, res)=> {

    userLogout(req.user.id, (err) =>{
        
        if (err) return res.json({ success: false, err });

        var moment = require('moment');
        var logoutDate = moment().format('YYYY-MM-DD HH:mm:ss');
        
        getLoginTime(req.user.id, (err, login_Time) => {
            if(err) return res.json({ success: false, err });

            const data = {
                logoutTime : logoutDate,
                userId: req.user.id,
                loginTime : login_Time
            }

            setLogoutTime(data, (err) => {
                if(err) 
                    return res.json({ success: false, err });
                else
                    return res.status(200).send({ success: true })
            })
        })
        //얻은time으로 로그아웃 time 넣기
    });
});


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
