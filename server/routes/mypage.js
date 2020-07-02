const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const { userLogin, modifyPrivacy } = require('../models/User');
const pool = require('../config/pool');
const { Page } = require("../pagination/page"); 
const multer = require('multer');
const fs = require('fs');
const path = require('path');


router.post("/getActionNum", async (req, res) => {

    const userId = req.body.id;

    console.log("클라이언트 데이터 출력",req.body)

    const conn = await pool.getConnection();

    try {//SELECT date_format(connStartDate, '%Y-%m-%d %H:%i') as dt FROM BulletinBoard.ConnectionRecord where connEndDate is not NULL order by connStartDate desc limit 1;
        await conn.beginTransaction();

        const [email] = await conn.query("SELECT email FROM BulletinBoard.User where id = ?", [userId]);
    
        const [postNum] = await conn.query("SELECT count(*) as pn FROM BulletinBoard.PostInfo where writer = ?", [userId]);

        const [commentNum] = await conn.query("SELECT count(*) as cn FROM BulletinBoard.Comment where cWriter = ?", [userId]);

        const [lastLoginDate] = await conn.query("SELECT date_format(connStartDate, '%Y-%m-%d %H:%i') as lastDate FROM BulletinBoard.ConnectionRecord where connID = ? and connEndDate is not NULL order by connStartDate desc limit 1;", [userId]);

        const [pcNum] = await conn.query("SELECT count(distinct pNum) as cn FROM BulletinBoard.Comment where cWriter = ?", [userId]);

        //console.log("데이터베이스 결과 출력", email[0].email, postNum[0].pn, commentNum[0].cn, lastLoginDate[0].lastDate)

        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true, info: [email[0].email, postNum[0].pn, commentNum[0].cn, lastLoginDate[0].lastDate, pcNum[0].cn] } );           
    
    
    } catch (err) {

        console.log("에러출력", err);

        conn.rollback();

        conn.release();

        return res.json( { success: false, err } );
    }

});

router.post("/confirmPassword", (req, res) => {

    userLogin(req.body, (err, isMatch) => {

        if (err) return res.json({ success: false });

        if (!isMatch) {
            return res.json({ success: false });
        } else {
            return res.status(200).json({ success: true }); 
        }
    })

});

router.post("/modifyPrivacy", (req, res) => {

    modifyPrivacy(req.body, (err) => {

        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    });

});

router.post("/getActivity", async (req, res) => {// body : currentPage, pageSize, type, id

    //console.log("클라이언트 데이터 출력",req.body);

    const currentPage = parseInt(req.body.currentPage);

    const maxPost = parseInt(req.body.pageSize);

    let type = false;
    if ( req.body.type === '게시물') {
        type = true;
    }

    const conn = await pool.getConnection();

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
            [totalPost] = await conn.query("SELECT count(*) as cnt FROM BulletinBoard.Comment where cWriter = ?", [req.body.id]);

            [activityList] = await conn.query("SELECT postnum, title, writer, date_format(date, '%y.%m.%d') as d, views, favorite FROM BulletinBoard.PostInfo where postnum = ANY(SELECT pNum FROM BulletinBoard.Comment where cWriter = ? group by pNum) order by date desc limit ?, ?", [req.body.id, (currentPage - 1) * maxPost, maxPost]);
        }

        const pageData = {
            totalPage : totalPost[0].cnt
        }

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


router.post("/getMyReportComment", async(req, res) => {
        
    // pNum,currentPage,maxComment, countSql, dataSql
    const fromId = req.body.id;

    const currentPage = req.body.currentPage;

    const maxComment = 10;

    const countSql = "SELECT COUNT(fromId) as cnt FROM BulletinBoard.ReportComment WHERE fromId=?";

    //pNum,content,from,to,date
    const dataSql = "SELECT rNum, pNum, content, rContent, fromId ,toId, date_format(date, '%y.%m.%d. %H:%i:%s') as date, content cGroupSquence FROM BulletinBoard.ReportComment WHERE fromId=? order by date, date limit ?, ?";

    const json = await Page(fromId, currentPage,maxComment, countSql, dataSql);
    
    if (json.success){
        return res.status(200).json(json);
    } else {
        return res.status(400).json(json);
    }

});

router.post("/getMyReportPost", async(req, res) => {
    
    // pNum,currentPage,maxComment, countSql, dataSql
    const fromId = req.body.id;

    const currentPage = req.body.currentPage;

    const maxComment = 10;

    const countSql = "SELECT COUNT(fromId) as cnt FROM BulletinBoard.ReportPost WHERE fromId=?";

    //pNum,content,from,to,date
    const dataSql = "SELECT rNum, pNum, rContent, fromId ,toId, date_format(date, '%y.%m.%d. %H:%i:%s') as date, content FROM BulletinBoard.ReportPost WHERE fromId=? order by date, date limit ?, ?";

    const json = await Page(fromId, currentPage,maxComment, countSql, dataSql);
    
    if (json.success){
        return res.status(200).json(json);
    } else {
        return res.status(400).json(json);
    }

});

router.post("/cancelmyReportPost", async (req, res) => {

    const rNum = req.body.data;
    
    const conn = await pool.getConnection();

    try {

        await conn.beginTransaction();

        await conn.query("DELETE FROM `BulletinBoard`.`ReportPost` WHERE (`rNum` = ?)",[rNum]);

        await conn.commit();

        conn.release();

        return res.status(200).json( { success: true } );
    
    } catch (err) {
        
        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});

router.post("/cancelmyReportComment", async (req, res) => {

    const rNum = req.body.data;
    
    const conn = await pool.getConnection();

    try {

        await conn.beginTransaction();

        await conn.query("DELETE FROM `BulletinBoard`.`ReportComment` WHERE (`rNum` = ?)",[rNum]);

        await conn.commit();

        conn.release();

        return res.status(200).json( { success: true } );
    
    } catch (err) {
        
        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});

router.post("/imageUpload2", async (req, res) => {

    const image = req;

    console.log("image", image)

    return res.status(400)
    
    //const conn = await pool.getConnection();

    // try {

    //     await conn.beginTransaction();

    //     await conn.query("DELETE FROM `BulletinBoard`.`ReportComment` WHERE (`rNum` = ?)",[rNum]);

    //     await conn.commit();

    //     conn.release();

    //     return res.status(200).json( { success: true } );
    
    // } catch (err) {
        
    //     conn.rollback();

    //     conn.release();

    //     return res.status(400).json( { success: false, err } );
    // }

});

// fs.readdir('uploads', (error) => {
//     // uploads 폴더 없으면 생성
//     if (error) {
//         fs.mkdirSync('uploads');
//     }
// })

// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, cb) {
//             cb(null, 'uploads/');
//         },
//         filename(req, file, cb) {
//             console.log("파일",file)
//             const ext = path.extname(file.originalname);
//             cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//         },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 },
// })
// // 이미지 업로드를 위한 API
// // upload의 single 메서드는 하나의 이미지를 업로드할 때 사용
// router.post('/imageUpload', upload.single('img'), (req, res) => {
//     console.log("데이터",req.body.img);
//     res.json({ url : `/img/${req.body.img}`});
// })


const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb) {
      cb(null, "imgfile" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
});

router.post("/imageUpload", upload.single('img'), function(req, res, next) {

    console.log("이미지",req.body)
    res.send({
      fileName: req.body.img
    });
});

module.exports = router;
