const express = require('express');
const router = express.Router();
const { getBoardList, getBoardContent, boardPostRegister, getPostNum, insertContent, deletePost } = require('../models/Board');
const pool = require('../config/pool');

router.get("/openpage", (req, res) => {

    getBoardList((err, boardList) =>{

        if (err) return res.status(400).json( { success: false, err } )

        return res.status(200).json( {success: true, boardList} )
    })

});

//select문 두 개 쓰는 라우터
router.post("/createPost", async (req, res) => {

    console.log("createPost   글을 새로 만듭니다!!!!!!")

    const post = req.body;
    const conn = await pool.getConnection();
    var e = false;

    try {
        await conn.beginTransaction();

        const ins_1 = await conn.query('INSERT INTO `BulletinBoard`.`PostInfo` (`title`, `writer`, `date`, `views`, `favorite`) VALUES (?, ?, ?, ?, ?)', [post.title, post.writer, post.date, 0, 0]);
        //console.log("ins_1 출력:     ", ins_1);

        const [postNum] = await conn.query('SELECT postnum FROM BulletinBoard.PostInfo WHERE writer = ? and date = ?', [post.writer, post.date]);
        //console.log("postNum 출력:     ", postNum[0].postnum);
        
        const ins_2 = await conn.query('INSERT INTO `BulletinBoard`.`PostContents` (`pNum`, `pContent`) VALUES (?, ?)', [postNum[0].postnum, post.pContent]);
        //console.log("ins_2 출력:     ", ins_2);

        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true, postNum : postNum[0].postnum});

    } catch (err) {
        //console.log("에러가 발생했어요~~!!", err);
        conn.rollback();

        conn.release();

        if (err) return res.status(400).json( { success: false, err } );

    }

});

// 해당 게시판 (내용,조회수,날짜 응답), db 조회수 업데이트

router.post("/postnum", async (req, res) => {

    const postNum = req.body.postNum
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();
        
        const [content] = await conn.query("SELECT title, writer, pContent,views, date_format(date, '%y.%m.%d. %h:%i') as date, favorite FROM BulletinBoard.PostInfo, BulletinBoard.PostContents WHERE postnum = ? and pNum = postnum", [postNum]);
        
        await conn.query('UPDATE `BulletinBoard`.`PostInfo` SET views = views + 1 WHERE (`postNum` = ?)', [postNum]);

        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true, content, postnum:postNum });
    
    } catch (err) {
        console.log(err)
       
        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});


//pNum 하나 들어옴, 해당 pNum의 PostInfo, PostContents, Comment테이블의 행을 제거
router.post("/deletePost", async (req, res) =>{

    const post = req.body;
    const conn = await pool.getConnection();
    //var e = false;
    
    try {
        await conn.beginTransaction();
        
        const del_1 = await conn.query('DELETE FROM `BulletinBoard`.`Comment` WHERE (`pNum` = ?)', [post.pNum]);
        console.log("Comment삭제 출력: ", del_1);
        
        const del_2 = await conn.query('DELETE FROM `BulletinBoard`.`PostContents` WHERE (`pNum` = ?)', [post.pNum]);
        console.log("PostContents삭제 출력: ", del_2);

        const del_3 = await conn.query('DELETE FROM `BulletinBoard`.`PostInfo` WHERE (`postnum` = ?)', [post.pNum]);
        console.log("PostInfo삭제 출력: ", del_3);
        
        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true} );
    
    } catch (err) {

        //console.log("에러가 발생했어요~~!!", err);
        //e = true;
        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});

router.post("/modifyPost", async (req, res) =>{

    console.log("modifyPost   글의 제목과 내용을 수정합니다.")

    const post = req.body;
    const conn = await pool.getConnection();
    
    try {
        await conn.beginTransaction();

        const upt_1 = await conn.query("UPDATE `BulletinBoard`.`PostContents` SET `pContent` = ? WHERE (`pNum` = ?)", [post.pContent, post.pNum]);

        const upt_2 = await conn.query("UPDATE `BulletinBoard`.`PostInfo` SET `title` = ? WHERE (`postnum` = ?)", [post.title, post.pNum]);
        
        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true} );
    
    } catch (err) {

        console.log("modifyPost 에러가 발생했어요~~!!", err);

        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }
});


router.post("/getPage", async (req, res) => {

    const currentPage = req.body.currentPage; // 클라이언트가 요청하는 페이지

    const maxPost = req.body.pageSize; // 10개

    //const maxPage = 10;

    // startPage = Math.floor((currentPage -1 /maxPage) * maxPage ) + 1;

    //const endPage = startPage + maxPage - 1;


    const conn = await pool.getConnection();
    
    try {
        await conn.beginTransaction();

        const [totalPost] = await conn.query("SELECT COUNT(*) AS cnt FROM BulletinBoard.PostInfo");

        //console.log("totalPost", totalPost[0].cnt)

        //const totalPage = Math.ceil(totalPost / maxPost)

        const [boardList] = await conn.query("SELECT postnum, title, writer, date_format(date, '%y.%m.%d') as d, views, favorite FROM BulletinBoard.PostInfo order by date desc limit ?, ?", [(currentPage - 1) * maxPost, maxPost]);

        //console.log("boardList", boardList)

        console.log("boardList", boardList)

        const pageData = {
            //startPage : Math.floor((currentPage -1 /maxPage) * maxPage ) + 1,
            //endPage : startPage + maxPage - 1,
            totalPage : totalPost[0].cnt
        }

        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true , boardList, pageData}  );
    
    } catch (err) {

        console.log("getPage 에러가 발생했어요~~!!", err);

        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});

    
router.post("/getFavorite", async (req, res) => {

    const userId = req.body.userId;
    const postNum = req.body.postNum;

    const conn = await pool.getConnection();

    //해당 유저가 좋아요 정보를 눌렀는지 보내주기

    try {
        await conn.beginTransaction();
        
        const [favorite] = await conn.query("SELECT * FROM BulletinBoard.Favorite where id = ? and postNum = ?", [userId, postNum]);
        
        
        await conn.commit();

        conn.release();

        if (!favorite.length){
            return res.status(200).json( {success: true, favorite: false } );            
        } else {
            return res.status(200).json( {success: true, favorite: true } );            
        }
    
    } catch (err) {

        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});

router.post("/favorite", async (req, res) => {  

    const userId = req.body.userId;
    const postNum = req.body.postNum;
    
    const conn = await pool.getConnection();

    // 좋아요 추가
    try {
        await conn.beginTransaction();
    
        await conn.query("INSERT INTO `BulletinBoard`.`Favorite` (`id`, `postNum`) VALUES (?, ?)", [userId, postNum]);

        //좋아요 업데이트
        await conn.query("UPDATE `BulletinBoard`.`PostInfo` SET favorite = favorite + 1 WHERE (`postnum` = ?)", [postNum]);

        await conn.commit();

        conn.release();

        return res.status(200).json( {success: true } );            
    
    
    } catch (err) {


        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});

router.post("/unFavorite", async (req, res) => {

    const userId = req.body.userId;
    const postNum = req.body.postNum;

    const conn = await pool.getConnection();

    // 좋아요 취소
    try {
        await conn.beginTransaction();
    
        await conn.query("DELETE FROM `BulletinBoard`.`Favorite` WHERE (`postNum` = ?) and (`id` = ?)", [postNum, userId]);
        
        //좋아요 업데이트
        await conn.query("UPDATE `BulletinBoard`.`PostInfo` SET favorite = favorite - 1 WHERE (`postnum` = ?)", [postNum]);

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