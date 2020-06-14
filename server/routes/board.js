const express = require('express');
const router = express.Router();
const { getBoardList, getBoardContent, boardPostRegister, getPostNum, insertContent, deletePost } = require('../models/Board');
const pool = require('../config/pool')


router.get("/openpage", (req, res) => {

    getBoardList((err, boardList) =>{

        if (err) return res.status(400).json( { success: false, err } )

        return res.status(200).json( {success: true, boardList} )
    })

});

// router.post("/postnum", (req, res) => {

//         const postNum = req.body.postNum

//         getBoardContent(postNum, (content, err) =>{
    
//                 if (err) return res.status(400).json( { success: false, err } )
                
//                 return res.status(200).json( {success: true, content, postnum:postNum } )
//             })
    
// });

//return res.status(200).json( {success: true} )
router.post("/createPost", (req, res) => {

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

// 해당 게시판 (내용,조회수,날짜 응답), db 조회수 업데이트

router.post("/postnum", async (req, res) => {

    const postNum = req.body.postNum
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();
        
        const [content] = await conn.query("SELECT pContent,views, date_format(date, '%y.%m.%d. %h:%i') as date FROM BulletinBoard.PostInfo, BulletinBoard.PostContents WHERE postnum = ? and pNum = postnum", [postNum]);
        
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

        console.log("에러가 발생했어요~~!!", err);

        conn.rollback();

        conn.release();

        return res.status(400).json( { success: false, err } );
    }

});

module.exports = router;