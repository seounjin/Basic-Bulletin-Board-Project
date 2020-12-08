const express = require('express');
const router = express.Router();
const { reportComment, 
        getReportComment, 
        reportCommentDelete,
        reportPost,
        getReportPost,
        reportPostDelete    
    
    } = require('../controllers/report');

const { validatePost, validateComment } = require('../controllers/report/validators');

router.post("/comment", validateComment, reportComment);

router.get("/comment/:page", getReportComment);

router.delete("/comment/1/:pNum", reportCommentDelete);

router.post("/post", validatePost, reportPost);

router.get("/post/:page", getReportPost);

router.delete("/post/1/:pNum", reportPostDelete);



module.exports = router;    