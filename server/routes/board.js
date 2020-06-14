const express = require('express');
const router = express.Router();
const { getBoardList, getBoardContent, boardPostRegister, getPostNum, insertContent } = require('../models/Board');
const pool = require('../config/pool')

router.get("/openpage", (req, res) => {

    getBoardList((err, boardList) =>{

        if (err) return res.status(400).json( { success: false, err } )

        return res.status(200).json( {success: true, boardList} )
    })

});

router.post("/postnum", (req, res) => {

        const postNum = req.body.postNum

        getBoardContent(postNum, (content, err) =>{
    
                if (err) return res.status(400).json( { success: false, err } )
                
                return res.status(200).json( {success: true, content, postnum:postNum} )
            })

});

//return res.status(200).json( {success: true} )
router.post("/createPost2", (req, res) => {

    const post = req.body

    boardPostRegister(post, (err) =>{

        if (err) return res.status(400).json( { success: false, err } )

        getPostNum(post, (err, num) =>{

            if (err) return res.status(400).json( { success: false, err } )

            insertContent(num, post, (err) =>{

                if (err) return res.status(400).json( { success: false, err } )

                return res.status(200).json( {success: true} )
            })
        })       
    })
});

//select문 두 개 쓰는 라우터
router.post("/createPost", async (req, res) => {

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

    } catch (err) {
        //console.log("에러가 발생했어요~~!!", err);
        e = true;
        conn.rollback();
    } finally {
        conn.release();

        if (e) return res.status(400).json( { success: false, err } );

        return res.status(200).json( {success: true} );
    }
});

module.exports = router;