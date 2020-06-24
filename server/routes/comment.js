const express = require('express');
const router = express.Router();
const { saveComment, getComment, deleteComment, modifyComment } = require("../models/Comment");
const pool = require('../config/pool');



router.post("/saveComment",(req, res) =>{
    
    saveComment(req.body, (cGroupSquence, err) => {
        
        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true, cGroupSquence });
    });


});


router.post("/getComment",(req, res) =>{

    getComment(req.body.postNum, (comment, err) => {

        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true, comment });
    });
});

router.post("/deleteComment",(req, res) =>{

    console.log("req.body",req.body)

    deleteComment(req.body.cGroupSquence, (err) => {
        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    });


});

router.post("/modifyComment",(req, res) =>{

    console.log("aa", req.body)
    modifyComment(req.body, (err) => {
        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    });


});

router.post("/deleteComment2", async (req, res) =>{

    const cGroupSquence = req.body.cGroupSquence;
    const conn = await pool.getConnection();
    var e = false;

    try {
        await conn.beginTransaction();

        await conn.query('UPDATE `BulletinBoard`.`Comment` SET `pComment` = NULL WHERE (`cGroupSquence` = ?)', [cGroupSquence]);

        await conn.commit();

    } catch {

        e = true;
        conn.rollback();

    } finally {

        conn.release();

        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    }
});



// 루트 코멘트
router.post("/saveComment2", async (req, res) => {


    const commentData = [req.body.pNum, req.body.cWriter, req.body.pComment, req.body.date, req.body.gDepth ] 

    const currentPage = req.body.commentPage; // 클라이언트가 요청하는 페이지

    const pNum = req.body.pNum;

    const maxComment = 10; // 10개 고정

    const conn = await pool.getConnection();


    try {
        await conn.beginTransaction();
        
        const [cGroupsquence] = await conn.query("INSERT INTO `BulletinBoard`.`Comment` (`pNum`, `cWriter`, `pComment`, `date`, `gDepth`) VALUES (?, ?, ?, ?, ?)", commentData);
        
        await conn.query('UPDATE `BulletinBoard`.`Comment` SET `gNum` = ? WHERE (`cGroupSquence` = ?)', [cGroupsquence.insertId, cGroupsquence.insertId]);

        const [comment] = await conn.query("SELECT pNum, cWriter, pComment, gNum, date_format(date, '%y.%m.%d. %h:%i:%s') as date, cGroupSquence,gDepth, cID FROM BulletinBoard.Comment WHERE pNum = ? order by gNum, date limit ?, ?", 
                                           [pNum, (currentPage - 1) * maxComment, maxComment]);

        await conn.commit();

        conn.release();

        return res.status(200).json( { success: true, cGroupsquence: cGroupsquence.insertId, comment} );            
    
    
    } catch (err) {

        console.log("에에러",err)
        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});


// 대댓글
router.post("/saveComment3", async (req, res) => {


    const commentData = [req.body.pNum, req.body.cWriter, req.body.pComment, req.body.gNum, req.body.date, req.body.gDepth, req.body.cID] 

    const pNum = req.body.pNum;

    const currentPage = req.body.commentPage; // 클라이언트가 요청하는 페이지

    const maxComment = 10; // 10개 고정
    
    const conn = await pool.getConnection();
    
    try {
        await conn.beginTransaction();
        
        const [cGroupsquence] = await conn.query("INSERT INTO `BulletinBoard`.`Comment` (`pNum`, `cWriter`, `pComment`, `gNum`, `date`, `gDepth`, `cID`) VALUES (?, ?, ?, ?, ?, ?, ?)", commentData);
        
        const [comment] = await conn.query("SELECT pNum, cWriter, pComment, gNum, date_format(date, '%y.%m.%d. %h:%i:%s') as date, cGroupSquence,gDepth, cID FROM BulletinBoard.Comment WHERE pNum = ? order by gNum, date limit ?, ?", 
                                                [pNum, (currentPage - 1) * maxComment, maxComment]);
        await conn.commit();

        conn.release();

        return res.status(200).json( { success: true, cGroupsquence: cGroupsquence.insertId, comment} );            
    
    
    } catch (err) {

        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});

router.post("/getComment2", async (req, res) => {

    const pNum = req.body.postNum;

    const conn = await pool.getConnection();

    
    try {
        await conn.beginTransaction();
        
        const [comment] = await conn.query("SELECT pNum, cWriter, pComment, gNum, date_format(date, '%y.%m.%d. %h:%i:%s') as date, cGroupSquence,gDepth, cID FROM BulletinBoard.Comment WHERE pNum = ? order by gNum, date", [pNum]);
        
        await conn.commit();

        conn.release();

        return res.status(200).json( { success: true, comment } );            
    
    
    } catch (err) {

        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});

// 댓글 페이지네이션
router.post("/getCommentPage", async (req, res) => {
    
    const pNum = req.body.postNum;

    const currentPage = req.body.commentPage; // 클라이언트가 요청하는 페이지

    const maxComment = 10; // 10개 고정

    const conn = await pool.getConnection();
    
    try {
        await conn.beginTransaction();

        const [totalComment] = await conn.query("SELECT COUNT(pNum) AS cnt FROM BulletinBoard.Comment WHERE pNum=?",[pNum]);

        const [comment] = await conn.query("SELECT pNum, cWriter, pComment, gNum, date_format(date, '%y.%m.%d. %h:%i:%s') as date, cGroupSquence,gDepth, cID FROM BulletinBoard.Comment WHERE pNum = ? order by gNum, date limit ?, ?", 
                                                [pNum, (currentPage - 1) * maxComment, maxComment]);

        const commentCnt = {
            totalComment : totalComment[0].cnt
        }

        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true , comment, commentCnt } );
    
    } catch (err) {

        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});

router.post("/getLatestComment", async (req, res) => {
    
    const pNum = req.body.postNum;

    const currentPage = req.body.commentPage; // 클라이언트가 요청하는 페이지

    const maxComment = 10; // 10개 고정

    const conn = await pool.getConnection();
    
    try {
        await conn.beginTransaction();

        const [totalComment] = await conn.query("SELECT COUNT(pNum) AS cnt FROM BulletinBoard.Comment WHERE pNum=?",[pNum]);

        const [comment] = await conn.query("SELECT pNum, cWriter, pComment, gNum, date_format(date, '%y.%m.%d. %h:%i:%s') as date, cGroupSquence,gDepth, cID FROM BulletinBoard.Comment where pNum = ? order by gNum desc, date limit ?, ?", 
                                                [pNum, (currentPage - 1) * maxComment, maxComment]);

        const commentCnt = {
            totalComment : totalComment[0].cnt
        }

        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true , comment, commentCnt } );
    
    } catch (err) {

        console.log("에에러", err)
        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});



module.exports = router;    