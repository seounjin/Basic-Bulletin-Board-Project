const express = require('express');
const router = express.Router();
const { userLogin, modifyPrivacy } = require('../models/User');
const pool = require('../config/pool');
const { Page } = require("../pagination/page"); 
const multer = require('multer');
const path = require('path');
const url = require('url');
const fs = require('fs');
const crypto = require("crypto");

const { 
        getProfile, 
        checkPassword, 
        changePrivacy, 
        myReportPost,
        myReportComment, 
        myReportPostCancel,
        myReportCommentCancel

} = require('../controllers/mypage');

router.get("/report/1", myReportPost);
router.get("/report/2", myReportComment);
router.delete("/report/3/:number", myReportPostCancel);
router.delete("/report/4/:number", myReportCommentCancel);

router.post("/profile", getProfile);
router.post("/check", checkPassword);
router.post("/change", changePrivacy);
router.post("/user-post");


// router.post("/profile", async (req, res) => {

//     const userId = req.body.id;

//     // console.log("클라이언트 데이터 출력",req.body)

//     const conn = await pool.getConnection();

//     try {//SELECT date_format(connStartDate, '%Y-%m-%d %H:%i') as dt FROM BulletinBoard.ConnectionRecord where connEndDate is not NULL order by connStartDate desc limit 1;
//         await conn.beginTransaction();

//         const [email] = await conn.query("SELECT email FROM BulletinBoard.User where id = ?", [userId]);
    
//         const [postNum] = await conn.query("SELECT count(*) as pn FROM BulletinBoard.PostInfo where writer = ?", [userId]);

//         const [commentNum] = await conn.query("SELECT count(*) as cn FROM BulletinBoard.Comment where cWriter = ?", [userId]);

//         const [lastLoginDate] = await conn.query("SELECT date_format(connStartDate, '%Y-%m-%d %H:%i') as lastDate FROM BulletinBoard.ConnectionRecord where connID = ? and connEndDate is not NULL order by connStartDate desc limit 1;", [userId]);

//         const [pcNum] = await conn.query("SELECT count(distinct pNum) as cn FROM BulletinBoard.Comment where cWriter = ?", [userId]);

//         const [avatar] = await conn.query("SELECT avatar FROM BulletinBoard.User WHERE id=?", [userId]);

//         //console.log("데이터베이스 결과 출력", email[0].email, postNum[0].pn, commentNum[0].cn, lastLoginDate[0].lastDate)

//         await conn.commit();

//         conn.release();

//         console.log("avatar", avatar)

//         console.log("size", lastLoginDate.length)

//         if(lastLoginDate.length === 0) {
//             return res.status(200).json( {success: true, info: [email[0].email, postNum[0].pn, commentNum[0].cn, 0, pcNum[0].cn , avatar[0].avatar]} );
//         }

//         return res.status(200).json( {success: true, info: [email[0].email, postNum[0].pn, commentNum[0].cn, lastLoginDate[0].lastDate, pcNum[0].cn , avatar[0].avatar]} );           
    
    
//     } catch (err) {

//         console.log("에러출력", err);

//         conn.rollback();

//         conn.release();

//         return res.json( { success: false, err } );
//     }

// });

// router.post("/check", async(req, res) => {

//     const userId = req.body.id;
//     const password = req.body.password;

//     const conn = await pool.getConnection();


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
//             return res.json({ success: false });
//         } 
        
//         await conn.commit();

//         conn.release();

//         return res.status(200).json({ success: true }); 

//     } catch (err) {
        
//         console.log("에러",err);

//         conn.rollback();

//         conn.release();

//         return res.status(400).json( { success: false, err } );
//     }

//     // userLogin(req.body, (err, isMatch) => {

//     //     if (err) return res.json({ success: false });

//     //     if (!isMatch) {
//     //         return res.json({ success: false });
//     //     } else {
//     //         return res.status(200).json({ success: true }); 
//     //     }
//     // })

// });

// router.post("/change", async(req, res) => {

//     const data = [req.body.password, req.body.email, req.body.id];

//     const conn = await pool.getConnection();
    
//     try {
//         await conn.beginTransaction();

//         await conn.query("UPDATE `BulletinBoard`.`User` SET `password` = ?, `email` = ? WHERE (`id` = ?)", data);

//         await conn.commit();

//         conn.release();

//         return res.status(200).json({ success: true });
    
//     } catch (err) {

//         console.log("에러",err);

//         conn.rollback();

//         conn.release();

//         return res.json({ success: false, err });

//     }

// });

router.post("/user-post", async (req, res) => {// body : currentPage, pageSize, type, id

    const currentPage = parseInt(req.body.currentPage);

    const maxPost = req.body.pageSize;

    let type = false;
    if ( req.body.type === '게시물') {
        type = true;
    }
    try {
        await conn.beginTransaction();

        let totalPost;
        let activityList;

        if (type) { //post를 원하는 경우

            //해당 아이디의 post 수를 받는 쿼리 작성.
            [totalPost] = await conn.query("SELECT count(*) as cnt FROM BulletinBoard.PostInfo where writer = ?", [req.body.id]);
            //해당 아이디의 post의 정보를 가져오는 쿼리 작성.
            [activityList] = await conn.query("SELECT postnum, title, writer, date_format(date, '%y.%m.%d') as d, views, favorite FROM BulletinBoard.PostInfo where writer = ? order by date desc limit ?, ?", [req.body.id, (currentPage - 1) * maxPost, maxPost]);
        }
        else { // comment 관련 post를 원하는 경우.
            
            //해당 아이디의 comment관련 post 수를 받는 쿼리.
            [totalPost] = await conn.query("SELECT count(distinct pNum) as cnt FROM BulletinBoard.Comment where cWriter = ?", [req.body.id]);
            //SELECT count(distinct pNum) as cn FROM BulletinBoard.Comment where cWriter = ?
            [activityList] = await conn.query("SELECT postnum, title, writer, date_format(date, '%y.%m.%d') as d, views, favorite FROM BulletinBoard.PostInfo where postnum = ANY(SELECT pNum FROM BulletinBoard.Comment where cWriter = ? group by pNum) order by date desc limit ?, ?", [req.body.id, (currentPage - 1) * maxPost, maxPost]);
        }

        const pageData = {
            totalPage : totalPost[0].cnt
        }

        console.log("totalPost", pageData);

        console.log("activityList", activityList);

        await conn.commit();

        conn.release();

        // console.log("pageData", pageData);

        return res.status(200).json( {success: true , activityList, pageData}  );
    
    } catch (err) {

        //console.log("에러출력", err);

        conn.rollback();

        conn.release();

        return res.json( { success: false, err } );
    }

});


// router.get("/report/2", async(req, res) => {
        
//     const queryData = url.parse(req.url, true).query;
//     const fromId = queryData.id;
//     const currentPage = queryData.page


//     const maxComment = 10;

//     const countSql = "SELECT COUNT(fromId) as cnt FROM BulletinBoard.ReportComment WHERE fromId=?";

//     //pNum,content,from,to,date
//     const dataSql = "SELECT rNum, pNum, content, rContent, fromId ,toId, date_format(date, '%y.%m.%d. %H:%i:%s') as date, content, cGroupSquence FROM BulletinBoard.ReportComment WHERE fromId=? order by date, date limit ?, ?";

//     const json = await Page(fromId, currentPage,maxComment, countSql, dataSql);

//     if (json.success){
//         return res.status(200).json(json);
//     } else {
//         return res.status(400).json(json);
//     }

// });

// router.get("/report/1", async(req, res) => {
    
//     const queryData = url.parse(req.url, true).query;
//     const fromId = queryData.id;
//     const currentPage = queryData.page
    
//     const maxComment = 10;

//     const countSql = "SELECT COUNT(fromId) as cnt FROM BulletinBoard.ReportPost WHERE fromId=?";

//     //pNum,content,from,to,date
//     const dataSql = "SELECT rNum, pNum, rContent, fromId ,toId, date_format(date, '%y.%m.%d. %H:%i:%s') as date, content FROM BulletinBoard.ReportPost WHERE fromId=? order by date, date limit ?, ?";

//     const json = await Page(fromId, currentPage,maxComment, countSql, dataSql);

//     if (json.success){
//         return res.status(200).json(json);
//     } else {
//         return res.status(400).json(json);
//     }

// });

// router.delete("/report/3/:number", async (req, res) => {

//     console.log("/report/3/:number\n", req.params.number)

//     const rNum = req.params.number;
    
//     const conn = await pool.getConnection();

//     try {

//         await conn.beginTransaction();

//         await conn.query("DELETE FROM `BulletinBoard`.`ReportPost` WHERE (`rNum` = ?)",[rNum]);

//         await conn.commit();

//         conn.release();

//         return res.status(200).json( { success: true } );
    
//     } catch (err) {
        
//         conn.rollback();

//         conn.release();

//         return res.status(400).json( { success: false, err } );
//     }

// });

// router.delete("/report/4/:number", async (req, res) => {

//     console.log("/report/4/:number\n", req.params.number)

//     const rNum = req.params.number;
    
//     const conn = await pool.getConnection();

//     try {

//         await conn.beginTransaction();

//         await conn.query("DELETE FROM `BulletinBoard`.`ReportComment` WHERE (`rNum` = ?)",[rNum]);

//         await conn.commit();

//         conn.release();

//         return res.status(200).json( { success: true } );
    
//     } catch (err) {
        
//         conn.rollback();

//         conn.release();

//         return res.status(400).json( { success: false, err } );
//     }

// });

const storage = multer.diskStorage({
    destination: './public/img/',
    filename: function(req, file, cb) {
        console.log("storage  req", req)
        console.log("storage file", file)
      cb(null, "imgfile" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
});

router.post("/avatar", upload.single('img'), async function(req, res, next) {

    const userId = req.body.id;
    
    const avatar = req.file.filename;

    console.log("이미지",req.file.filename)

    const conn = await pool.getConnection();

    try {

        await conn.beginTransaction();

        await conn.query("UPDATE `BulletinBoard`.`User` SET `avatar` = ? WHERE (`id` = ?)",[avatar, userId]);

        await conn.commit();

        conn.release();

        return res.status(200).json( { success: true, file: avatar } );
    
    } catch (err) {
        
        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }
});

module.exports = router;
