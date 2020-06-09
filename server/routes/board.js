const express = require('express');
const router = express.Router();
const { getBoardList, getBoardContent, boardPostRegister, getPostNum, insertContent } = require('../models/Board');


router.get("/openpage", (req, res) => {

    getBoardList((err, boardList) =>{

        if (err) return res.status(400).json( { success: false, err } )

        return res.status(200).json( {success: true, boardList} )
    })

});

router.post("/postnum", (req, res) => {

        const postNum = req.body.postNum

        getBoardContent(postNum, (content, err) =>{
    
                if (err) return res.status(400).json( { success: false, err } )
                
                console.log(typeof(content))
                return res.status(200).json( {success: true, content} )
            })
    
});

//return res.status(200).json( {success: true} )
router.post("/createPost", (req, res) => {

    const post = req.body

    boardPostRegister(post, (err) =>{

        if (err) return res.status(400).json( { success: false, err } )

        getPostNum(post, (err, num) =>{

            if (err) return res.status(400).json( { success: false, err } )

            insertContent(num, post, (err) =>{

                if (err) return res.status(400).json( { success: false, err } )

                return res.status(200).json( {success: true} )
            })
        })       
    })
});

module.exports = router;