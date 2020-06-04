const express = require('express');
const router = express.Router();
const { getBoardList } = require('../models/Board');


router.get("/openpage", (req, res) => {

    getBoardList( (boardList, err) =>{

        if (err) return res.status(400).json( { success: false, err } )
        
        return res.status(200).json( {success: true, boardList} )

    })

});

module.exports = router;