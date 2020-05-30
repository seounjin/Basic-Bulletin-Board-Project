const express = require('express');
const router = express.Router();
const { getBoardList } = require('../models/Board');


router.get("/openpage", (req, res) => {

    getBoardList( (boardList, err) =>{

        if (err) return res.json({ success: false })
        
        return res.json(boardList)

    })

});

module.exports = router;