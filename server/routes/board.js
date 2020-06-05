const express = require('express');
const router = express.Router();
const { getBoardList, getBoardContent } = require('../models/Board');


router.get("/openpage", (req, res) => {

    getBoardList((err, boardList) =>{

        if (err) return res.status(400).json( { success: false, err } )

        return res.status(200).json( {success: true, boardList} )
    })

});

router.post("/postnum", (req, res) => {

        const postNum = req.body.postNum
        console.log("포스트넘버1  ", postNum)
        console.log("포스트넘버2  ", req.body)

        getBoardContent(postNum, (content, err) =>{
    
                if (err) return res.status(400).json( { success: false, err } )
                
                console.log(typeof(content))
                return res.status(200).json( {success: true, content} )
            })
    
});

module.exports = router;