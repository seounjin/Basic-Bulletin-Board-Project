const express = require('express');
const router = express.Router();
const { newPost, getTotal, getPost, deletePost, changePost, favorite, unfavorite, checkFavorite, getPage } = require('../controllers/boards')


router.get("/total", getTotal);

router.post("/new", newPost);

router.post("/page", getPage);

router.get("/post/:postNum", getPost);

router.delete("/post/1/:postNum", deletePost);

router.post("/post/change", changePost);

router.post("/favorite", favorite);

router.post("/unfavorite", unfavorite);

router.post("/favorite/check", checkFavorite);


module.exports = router;
