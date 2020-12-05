const express = require('express');
const router = express.Router();
const { newPost } = require('../controllers/boards/newPost');
const { getTotal } = require('../controllers/boards/getTotal');
const { getPost } = require('../controllers/boards/getPost');
const { deletePost } = require('../controllers/boards/deletePost');
const { changePost } = require('../controllers/boards/changePost');

router.get("/total", getTotal);
router.post("/new", newPost);
//router.post("/page", newPost);
router.get("/post/:postNum", getPost);
router.delete("/post/1/:postNum", deletePost);
router.post("/post/change", changePost);

module.exports = router;


// 안쓰는거 가틈
// router.get("/openpage", (req, res) => {

//     getBoardList((err, boardList) =>{

//         if (err) return res.status(400).json( { success: false, err } )

//         return res.status(200).json( {success: true, boardList} )
//     })

// });

//글 생성
// router.post("/new", async (req, res) => {

//     const post = req.body;
//     const conn = await pool.getConnection();

//     try {
//         await conn.beginTransaction();

//         const ins_1 = await conn.query('INSERT INTO `BulletinBoard`.`PostInfo` (`title`, `writer`, `date`, `views`, `favorite`) VALUES (?, ?, ?, ?, ?)', [post.title, post.writer, post.date, 0, 0]);
//         //console.log("ins_1 출력:     ", ins_1);

//         const [postNum] = await conn.query('SELECT postnum FROM BulletinBoard.PostInfo WHERE writer = ? and date = ?', [post.writer, post.date]);
//         //console.log("postNum 출력:     ", postNum[0].postnum);
        
//         const ins_2 = await conn.query('INSERT INTO `BulletinBoard`.`PostContents` (`pNum`, `pContent`) VALUES (?, ?)', [postNum[0].postnum, post.pContent]);
//         //console.log("ins_2 출력:     ", ins_2);

//         await conn.commit();

//         conn.release();

//         return res.status(200).json( {success: true, postNum : postNum[0].postnum});

//     } catch (err) {
//         //console.log("에러가 발생했어요~~!!", err);
//         conn.rollback();

//         conn.release();

//         if (err) return res.status(400).json( { success: false, err } );

//     }

// });

// // 해당 게시판 (내용,조회수,날짜 응답), db 조회수 업데이트

// router.get("/post/:postNum", async (req, res) => {

//     const postNum = req.params.postNum;
//     const conn = await pool.getConnection();

//     try {
//         await conn.beginTransaction();
        
//         const [content] = await conn.query("SELECT title, writer, pContent,views, date_format(date, '%y.%m.%d. %h:%i') as date, favorite, avatar FROM BulletinBoard.PostInfo, BulletinBoard.PostContents, BulletinBoard.User WHERE postnum = ? and pNum = postnum and writer = id", [postNum]);
        
//         await conn.query('UPDATE `BulletinBoard`.`PostInfo` SET views = views + 1 WHERE (`postNum` = ?)', [postNum]);

//         await conn.commit();

//         conn.release();

//         return res.status(200).json( {success: true, content, postnum:postNum });
    
//     } catch (err) {
//         console.log(err)
       
//         conn.rollback();

//         conn.release();

//         return res.status(400).json( { success: false, err } );
//     }

// });

// // 게시글 삭제 요청
// //pNum 하나 들어옴, 해당 pNum의 PostInfo, PostContents, Comment테이블의 행을 제거
// router.delete("/post/1/:postNum", async (req, res) =>{

//     const postNum = req.params.postNum;
//     const conn = await pool.getConnection();
//     //var e = false;
    
//     try {
//         await conn.beginTransaction();
        
//         const del_1 = await conn.query('DELETE FROM `BulletinBoard`.`Comment` WHERE (`pNum` = ?)', [postNum]);
//         //console.log("Comment삭제 출력: ", del_1);
        
//         const del_2 = await conn.query('DELETE FROM `BulletinBoard`.`PostContents` WHERE (`pNum` = ?)', [postNum]);
//         //console.log("PostContents삭제 출력: ", del_2);

//         const del_3 = await conn.query('DELETE FROM `BulletinBoard`.`PostInfo` WHERE (`postnum` = ?)', [postNum]);
//         //console.log("PostInfo삭제 출력: ", del_3);
        
//         await conn.commit();

//         conn.release();

//         return res.status(200).json( {success: true} );
    
//     } catch (err) {

//         console.log("글삭제 에러가 발생했어요~~!!", err);
//         //e = true;
//         conn.rollback();

//         conn.release();

//         return res.status(400).json( { success: false, err } );
//     }

// });

// // 게시글 내용 수정
// router.post("/post/change", async (req, res) =>{

//     //console.log("modifyPost   글의 제목과 내용을 수정합니다.")

//     const post = req.body;
//     const conn = await pool.getConnection();
    
//     try {
//         await conn.beginTransaction();

//         const [sel_1] = await conn.query("SELECT count(*) AS cnt FROM BulletinBoard.PostContents where pNum = ? and pContent = ?", [post.pNum, post.pContent]);

//         //console.log("sel_1", sel_1);
//         //console.log("sel_1sel_1sel_1sel_1", sel_1[0].cnt);

//         // 게시글 내용이 변경되지 않는다고 알려줌
//         if (sel_1[0].cnt) {

//             await conn.commit();

//             conn.release();
    
//             return res.status(200).json( { success: true, isReal: true } ); // 수정해야할 부분 isSame으로
//         }

//         const upt_1 = await conn.query("UPDATE `BulletinBoard`.`PostContents` SET `pContent` = ? WHERE (`pNum` = ?)", [post.pContent, post.pNum]);

//         const upt_2 = await conn.query("UPDATE `BulletinBoard`.`PostInfo` SET `title` = ? WHERE (`postnum` = ?)", [post.title, post.pNum]);
        
//         await conn.commit();

//         conn.release();

//         return res.status(200).json( { success: true, isReal: false } );
    
//     } catch (err) {

//         //console.log("modifyPost 에러가 발생했어요~~!!", err);

//         conn.rollback();

//         conn.release();

//         return res.status(400).json( { success: false, err } );
//     }
// });

// router.get("/total", async (req, res) => { // 수정해야함

//     const conn = await pool.getConnection();
    
//     try {
//         await conn.beginTransaction();

//         const [totalPost] = await conn.query("SELECT COUNT(*) AS cnt FROM BulletinBoard.PostInfo");

//         const total = {
//             totalPost : totalPost[0].cnt
//         }

//         await conn.commit();

//         conn.release();

//         return res.status(200).json( {success: true , total}  );
    
//     } catch (err) {

//         conn.rollback();

//         conn.release();

//         return res.status(400).json( { success: false, err } );
//     }

// });

// // router.post("/getKeywordPage2", async (req, res) => {

// //     //console.log("getPage", req.body)

// //     // const keyWord = "\"%" + req.body.keyword + "%\"";
// //     const keyWord = "%" + req.body.keyword + "%";

// //     // console.log("keyWord", keyWord)

// //     //return res.status(400).json( { success: false } );

// //     const currentPage = parseInt(req.body.currentPage); // 클라이언트가 요청하는 페이지

// //     const maxPost = parseInt(req.body.pageSize); // 10개

// //     const conn = await pool.getConnection();
    
// //     try {
// //         await conn.beginTransaction();

// //         const [totalPost] = await conn.query("SELECT COUNT(*) AS cnt FROM BulletinBoard.PostInfo WHERE title LIKE ?", [keyWord]);

// //         //console.log("totalPost", totalPost[0].cnt)

// //         //const totalPage = Math.ceil(totalPost / maxPost)

// //         const [boardList] = await conn.query("SELECT postnum, title, writer, date_format(date, '%y.%m.%d') as d, views, favorite FROM BulletinBoard.PostInfo WHERE title LIKE ? order by date desc limit ?, ?", [keyWord, (currentPage - 1) * maxPost, maxPost]);

// //         const pageData = {
// //             totalPage : totalPost[0].cnt
// //         }

// //         await conn.commit();

// //         conn.release();

// //         return res.status(200).json( {success: true , boardList, pageData}  );
    
// //     } catch (err) {

// //         //console.log("getPage 에러가 발생했어요~~!!", err);

// //         conn.rollback();

// //         conn.release();

// //         return res.status(400).json( { success: false, err } );
// //     }
// // });

// // 게시글 목록 요청
// router.post("/page", async (req, res) => {

//     //console.log("getPage", req.body)

//     //console.log("qqqqqqqq",req.body);

//     //검색 키워드
//     let keyWord = null;
//     //추가
//     if (req.body.keyword) {
//         keyWord = "%" + req.body.keyword + "%";
//     }

//     const currentPage = parseInt(req.body.currentPage); // 클라이언트가 요청하는 페이지

//     const maxPost = parseInt(req.body.pageSize); // 10개

//     //추가
//     let totalPost = null;
//     let boardList = null;
//     let pageData = null;

//     const conn = await pool.getConnection();
    
//     try {
//         await conn.beginTransaction();

//         if (!keyWord) { //키워드 검색이 아닌 경우.

//             [totalPost] = await conn.query("SELECT COUNT(*) AS cnt FROM BulletinBoard.PostInfo");

//             [boardList] = await conn.query("SELECT postnum, title, writer, date_format(date, '%y.%m.%d') as d, views, favorite FROM BulletinBoard.PostInfo order by date desc limit ?, ?", [(currentPage - 1) * maxPost, maxPost]);

//             pageData = {
//                 totalPage : totalPost[0].cnt
//             }

//         } else {

//             [totalPost] = await conn.query("SELECT COUNT(*) AS cnt FROM BulletinBoard.PostInfo WHERE title LIKE ?", [keyWord]);

//             [boardList] = await conn.query("SELECT postnum, title, writer, date_format(date, '%y.%m.%d') as d, views, favorite FROM BulletinBoard.PostInfo WHERE title LIKE ? order by date desc limit ?, ?", [keyWord, (currentPage - 1) * maxPost, maxPost]);
            
//             pageData = {
//                 totalPage : totalPost[0].cnt,
//                 keyWord : req.body.keyword
//             }
//         }

//         await conn.commit();

//         conn.release();

//         return res.status(200).json( {success: true , boardList, pageData}  );
    
//     } catch (err) {

//         console.log("getPage 에러가 발생했어요~~!!", err);

//         conn.rollback();

//         conn.release();

//         return res.status(400).json( { success: false, err } );
//     }

// });

// //유저가 좋아요 정보를 눌렀는지 확인 요청
// router.post("/favorite/check", async (req, res) => {

//     const userId = req.body.userId;
//     const postNum = req.body.postNum;

//     const conn = await pool.getConnection();

//     //해당 유저가 좋아요 정보를 눌렀는지 보내주기

//     try {
//         await conn.beginTransaction();
        
//         const [favorite] = await conn.query("SELECT * FROM BulletinBoard.Favorite where id = ? and postNum = ?", [userId, postNum]);
        
//         await conn.commit();

//         conn.release();

//         if (!favorite.length){
//             return res.status(200).json( {success: true, favorite: false } );            
//         } else {
//             return res.status(200).json( {success: true, favorite: true } );            
//         }
    
//     } catch (err) {

//         conn.rollback();

//         conn.release();

//         return res.status(400).json( { success: false, err } );
//     }

// });

// router.post("/favorite", async (req, res) => {  

//     const userId = req.body.userId;
//     const postNum = req.body.postNum;
    
//     const conn = await pool.getConnection();

//     // 좋아요 추가
//     try {
//         await conn.beginTransaction();
    
//         await conn.query("INSERT INTO `BulletinBoard`.`Favorite` (`id`, `postNum`) VALUES (?, ?)", [userId, postNum]);

//         //좋아요 업데이트
//         await conn.query("UPDATE `BulletinBoard`.`PostInfo` SET favorite = favorite + 1 WHERE (`postnum` = ?)", [postNum]);

//         await conn.commit();

//         conn.release();

//         return res.status(200).json( {success: true } );            
    
    
//     } catch (err) {

//         conn.rollback();

//         conn.release();

//         return res.status(400).json( { success: false, err } );
//     }

// });

// // 좋아요 취소 요청
// router.post("/unfavorite", async (req, res) => {

//     const userId = req.body.userId;
//     const postNum = req.body.postNum;

//     const conn = await pool.getConnection();

//     // 좋아요 취소
//     try {
//         await conn.beginTransaction();
    
//         await conn.query("DELETE FROM `BulletinBoard`.`Favorite` WHERE (`postNum` = ?) and (`id` = ?)", [postNum, userId]);
        
//         //좋아요 업데이트
//         await conn.query("UPDATE `BulletinBoard`.`PostInfo` SET favorite = favorite - 1 WHERE (`postnum` = ?)", [postNum]);

//         await conn.commit();

//         conn.release();

//         return res.status(200).json( {success: true } );            
    
    
//     } catch (err) {

//         conn.rollback();

//         conn.release();

//         return res.status(400).json( { success: false, err } );
//     }

// });