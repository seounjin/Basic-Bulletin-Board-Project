const express = require('express');
const router = express.Router();
const { reportComment, 
        getReportComment, 
        reportCommentDelete,
        reportPost,
        getReportPost,
        reportPostDelete    
    
    } = require('../controllers/report');


router.post("/comment", reportComment);

router.get("/comment/:page", getReportComment);

router.delete("/comment/1/:pNum", reportCommentDelete);

router.post("/post", reportPost);

router.get("/post/:page", getReportPost);

router.delete("/post/1/:pNum", reportPostDelete);



module.exports = router;    