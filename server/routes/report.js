const express = require('express');
const router = express.Router();
const pool = require('../config/pool');
const { Page } = require("../pagination/page"); 

router.post("/saveReport", async (req, res) => {
    
    // 신고자가 이 글에 신고를 하엿는지 검사 해야함 (글번호, 신고자)

    // 글번호, 신고사유, 신고한 아이디,신고당한 아이디, 신고 시간

    const pNum = req.body.pNum;

    const rContent = req.body.rContent;

    const fromId = req.body.fromId;

    const toId = req.body.toId;

    const date = req.body.date;

    const content = req.body.pContent;

    const data = [pNum, rContent, fromId, toId, date, content];

    const conn = await pool.getConnection();
    //  // 신고 횟수 카운트
    //  const [count] = await conn.query("SELECT COUNT(pNum) as cnt FROM BulletinBoard.ReportPost WHERE pNum=?",[pNum]);

    try {

        await conn.beginTransaction();

        const [count] = await conn.query("SELECT COUNT(*) as cnt FROM BulletinBoard.ReportPost WHERE pNum=? and fromId = ?", [pNum,fromId]);

        if (count[0].cnt){ // 이미 신고한 게시물

            await conn.commit();

            conn.release();

            return res.status(200).json( {success: true, report: true} );
        }

        await conn.query("INSERT INTO `BulletinBoard`.`ReportPost` (`pNum`, `rContent`, `fromId`, `toId`, `date`, `content`) VALUES (?, ?, ?, ?, ?, ?)", data);
        
        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true, report: false } );
    
    } catch (err) {

        console.log("에에러", err)

        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});


router.post("/getReportPost", async(req, res) => {
        
    // pNum,currentPage,maxComment, countSql, dataSql
    const currentPage = req.body.currentPage;

    const maxComment = 10;

    const countSql = "SELECT COUNT(*) as cnt FROM BulletinBoard.ReportPost";

    //pNum,content,from,to,date
    const dataSql = "SELECT pNum, rContent, fromId ,toId, date_format(date, '%y.%m.%d. %H:%i:%s') as date FROM BulletinBoard.ReportPost order by date, date limit ?, ?";

    const json = await Page(null, currentPage,maxComment, countSql, dataSql);
    
    if (json.success){
        return res.status(200).json(json);
    } else {
        return res.status(400).json(json);
    }

});


router.post("/deleteReportPost", async (req, res) => {

    const pNum = req.body.data;
    
    // 해당 게시판 삭제
    // 해당 게시물 내용 삭제
    // 신고 게시판 삭제
    
    const conn = await pool.getConnection();

    try {

        await conn.beginTransaction();

        await conn.query("DELETE FROM `BulletinBoard`.`PostContents` WHERE (`pNum` = ?)",[pNum]);

        await conn.query("DELETE FROM `BulletinBoard`.`PostInfo` WHERE (`postnum` = ?)",[pNum]);
        
        await conn.query("DELETE FROM `BulletinBoard`.`ReportPost` WHERE (`pNum` = ?)",[pNum]);

        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true } );
    
    } catch (err) {
        
        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});


router.post("/saveReportComment", async (req, res) => {
    
    // 글번호, 댓글내용, 신고사유, 신고한 아이디,신고당한 아이디, 신고 시간 ,고유 넘버

    const pNum = req.body.pNum;

    const content = req.body.content;

    const rContent = req.body.rContent;

    const fromId = req.body.fromId;

    const toId = req.body.toId;

    const date = req.body.date;

    const cGroupSquence = req.body.cGroupSquence

    const data = [pNum, content, rContent, fromId, toId, date, cGroupSquence];

    const conn = await pool.getConnection();


    try {

        await conn.beginTransaction();

        const [count] = await conn.query("SELECT COUNT(*) as cnt FROM BulletinBoard.ReportComment WHERE cGroupSquence=?", [cGroupSquence]);

        if (count[0].cnt){ // 이미 신고한 게시물

            await conn.commit();

            conn.release();

            return res.status(200).json( {success: true, report: true} );
        }

        await conn.query("INSERT INTO `BulletinBoard`.`ReportComment` (`pNum`, `content`, `rContent`, `fromId`, `toId`, `date`, `cGroupSquence`) VALUES (?, ?, ?, ?, ?, ?, ?)", data);
        
        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true, report: false } );
    
    } catch (err) {

        console.log("에에러", err)

        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});

router.post("/getReportComment", async(req, res) => {
        
    // pNum,currentPage,maxComment, countSql, dataSql
    const currentPage = req.body.currentPage;

    const maxComment = 10;

    const countSql = "SELECT COUNT(*) as cnt FROM BulletinBoard.ReportComment";

    //pNum,content,from,to,date
    const dataSql = "SELECT pNum, content, rContent, fromId ,toId, date_format(date, '%y.%m.%d. %H:%i:%s') as date, cGroupSquence FROM BulletinBoard.ReportComment order by date, date limit ?, ?";

    const json = await Page(null, currentPage,maxComment, countSql, dataSql);
    
    if (json.success){
        return res.status(200).json(json);
    } else {
        return res.status(400).json(json);
    }

});



router.post("/deleteReportComment", async (req, res) => {

    const cGroupSquence = req.body.data;
    
    // 해당 댓글 null 업데이트
    
    const conn = await pool.getConnection();

    try {

        await conn.beginTransaction();

        await conn.query("UPDATE `BulletinBoard`.`Comment` SET `pComment` = NULL WHERE (`cGroupSquence` = ?)",[cGroupSquence]);

        await conn.query("DELETE FROM `BulletinBoard`.`ReportComment` WHERE (`cGroupSquence` = ?)",[cGroupSquence]);

        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true } );
    
    } catch (err) {
        

        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});



module.exports = router;    