const express = require('express');
const router = express.Router();
const { newPost, getTotal, getPost, deletePost, changePost, favorite, unfavorite, checkFavorite } = require('../controllers/boards')


router.get("/total", getTotal);

router.post("/new", newPost);

//router.post("/page", newPost);

router.get("/post/:postNum", getPost);

router.delete("/post/1/:postNum", deletePost);

router.post("/post/change", changePost);

router.post("/favorite", favorite);

router.post("/unfavorite", unfavorite);

router.post("/favorite/check", checkFavorite);


module.exports = router;

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