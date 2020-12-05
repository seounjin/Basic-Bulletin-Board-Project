const express = require('express');
const router = express.Router();
const { parent, child, registerComment, latestComment, deleteComment, change } = require('../controllers/comment')


router.post("/parent", parent);

router.post("/child", child);

router.post("/sequence/1", registerComment);

router.post("/sequence/2", latestComment);

router.delete("/1/:cNum", deleteComment);

router.post("/change", change);



module.exports = router;    