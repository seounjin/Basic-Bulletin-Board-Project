const express = require('express');
const router = express.Router();
const { saveComment, getComment, deleteComment, modifyComment } = require("../models/Comment");
const pool = require('../config/pool');



router.post("/saveComment",(req, res) =>{
    
    saveComment(req.body, (cGroupSquence, err) => {
        
        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true, cGroupSquence });
    });


});


router.post("/getComment",(req, res) =>{

    getComment(req.body.postNum, (comment, err) => {

        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true, comment });
    });


});

router.post("/deleteComment",(req, res) =>{

    console.log("req.body",req.body)

    deleteComment(req.body.cGroupSquence, (err) => {
        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    });


});

router.post("/modifyComment",(req, res) =>{

    console.log("aa", req.body)
    modifyComment(req.body, (err) => {
        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    });


});

router.post("/deleteComment2", async (req, res) =>{

    const cGroupSquence = req.body.cGroupSquence;
    const conn = await pool.getConnection();
    var e = false;

    try {
        await conn.beginTransaction();

        await conn.query('UPDATE `BulletinBoard`.`Comment` SET `pComment` = NULL WHERE (`cGroupSquence` = ?)', [cGroupSquence]);

        await conn.commit();

    } catch {

        e = true;
        conn.rollback();

    } finally {

        conn.release();

        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    }
});



module.exports = router;    