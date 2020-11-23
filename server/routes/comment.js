const express = require('express');
const router = express.Router();
const { deleteComment, modifyComment } = require("../models/Comment");
const pool = require('../config/pool');


router.delete("/1/:cNum",(req, res) => {
    
    const cGroupSquence = req.params.cNum;

    deleteComment(cGroupSquence, (err) => {
        if (err) return res.status(400).json({ success: false, err });

        return res.status(200).json({ success: true });
    });

});

// 댓글 수정
router.post("/change",(req, res) => { 

    console.log("aa", req.body)
    modifyComment(req.body, (err) => {
        if (err) return res.status(400).json({ success: false, err });

        return res.status(200).json({ success: true });
    });

});

// 부모 댓글 저장
router.post("/parent", async (req, res) => {

    const commentData = [req.body.pNum, req.body.cWriter, req.body.pComment, req.body.date, req.body.gDepth ] 

    const currentPage = req.body.commentPage; // 클라이언트가 요청하는 페이지

    const pNum = req.body.pNum;

    const maxComment = 10; // 10개 고정

    const conn = await pool.getConnection();


    try {
        await conn.beginTransaction();
        
        const [cGroupsquence] = await conn.query("INSERT INTO `BulletinBoard`.`Comment` (`pNum`, `cWriter`, `pComment`, `date`, `gDepth`) VALUES (?, ?, ?, ?, ?)", commentData);
        
        await conn.query('UPDATE `BulletinBoard`.`Comment` SET `gNum` = ? WHERE (`cGroupSquence` = ?)', [cGroupsquence.insertId, cGroupsquence.insertId]);

        const [comment] = await conn.query("SELECT avatar, pNum, cWriter, pComment, gNum, date_format(date, '%y.%m.%d. %h:%i:%s') as date, cGroupSquence,gDepth, cID FROM BulletinBoard.Comment, BulletinBoard.User WHERE pNum = ? and cWriter = id order by gNum, date limit ?, ?", 
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


// 자식 댓글 저장
router.post("/child", async (req, res) => {


    const commentData = [req.body.pNum, req.body.cWriter, req.body.pComment, req.body.gNum, req.body.date, req.body.gDepth, req.body.cID] 

    const pNum = req.body.pNum;

    const currentPage = req.body.commentPage; // 클라이언트가 요청하는 페이지

    const maxComment = 10; // 10개 고정
    
    const conn = await pool.getConnection();
    
    try {
        await conn.beginTransaction();
        
        const [cGroupsquence] = await conn.query("INSERT INTO `BulletinBoard`.`Comment` (`pNum`, `cWriter`, `pComment`, `gNum`, `date`, `gDepth`, `cID`) VALUES (?, ?, ?, ?, ?, ?, ?)", commentData);
        
        const [comment] = await conn.query("SELECT avatar, pNum, cWriter, pComment, gNum, date_format(date, '%y.%m.%d. %h:%i:%s') as date, cGroupSquence,gDepth, cID FROM BulletinBoard.Comment, BulletinBoard.User WHERE pNum = ? and cWriter = id order by gNum, date limit ?, ?", 
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

// 등록순으로 댓글 요청
router.post("/sequence/1", async (req, res) => {
    
    const pNum = req.body.postNum;

    const currentPage = req.body.commentPage; // 클라이언트가 요청하는 페이지

    const maxComment = 10; // 10개 고정

    const conn = await pool.getConnection();
    
    try {
        await conn.beginTransaction();

        const [totalComment] = await conn.query("SELECT COUNT(pNum) AS cnt FROM BulletinBoard.Comment WHERE pNum=?",[pNum]);

        const [comment] = await conn.query("SELECT avatar, pNum, cWriter, pComment, gNum, date_format(date, '%y.%m.%d. %h:%i:%s') as date, cGroupSquence,gDepth, cID FROM BulletinBoard.Comment, BulletinBoard.User WHERE pNum = ? and cWriter = id order by gNum, date limit ?, ?", 
                                                [pNum, (currentPage - 1) * maxComment, maxComment]);

        // const commentCnt = { ///// 수정
        //     totalComment : totalComment[0].cnt
        // }

        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true , comment, commentCnt : totalComment[0].cnt } );
    
    } catch (err) {

        console.log("에러",err);

        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});

// 최신순으로 댓글 요청
router.post("/sequence/2", async (req, res) => {
    
    const pNum = req.body.postNum;

    const currentPage = req.body.commentPage; // 클라이언트가 요청하는 페이지

    const maxComment = 10; // 10개 고정

    const conn = await pool.getConnection();
    
    try {
        await conn.beginTransaction();

        const [totalComment] = await conn.query("SELECT COUNT(pNum) AS cnt FROM BulletinBoard.Comment WHERE pNum=?",[pNum]);

        const [comment] = await conn.query("SELECT avatar, pNum, cWriter, pComment, gNum, date_format(date, '%y.%m.%d. %h:%i:%s') as date, cGroupSquence,gDepth, cID FROM BulletinBoard.Comment, BulletinBoard.User where pNum = ? and cWriter = id order by gNum desc, date limit ?, ?", 
                                                [pNum, (currentPage - 1) * maxComment, maxComment]);

        // const commentCnt = {
        //     totalComment : totalComment[0].cnt
        // }

        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true , comment, commentCnt:totalComment[0].cnt } );
    
    } catch (err) {

        console.log("에러",err);

        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});



module.exports = router;    