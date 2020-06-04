const express = require('express');
const router = express.Router();
const { getBoardList } = require('../models/Board');


router.get("/openpage", (req, res) => {

    getBoardList( (err, boardList) =>{

        if (err) return res.json({ success: false })
        
        return res.json({success: true, boardList})

    })

});

module.exports = router;