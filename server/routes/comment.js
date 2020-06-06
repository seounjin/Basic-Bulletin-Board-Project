const express = require('express');
const router = express.Router();
const { saveComment, getComment } = require("../models/Comment");



router.post("/saveComment",(req, res) =>{

    saveComment(req.body, (err) => {

        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    });


});


router.post("/getComment",(req, res) =>{

    getComment(req.body.postNum, (comment, err) => {

        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true, comment });
    });


});


module.exports = router;    