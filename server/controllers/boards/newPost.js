const { save } = require('../../models/Board');

const newPost = async(req, res) => { // 글쓴이, 날짜, 글제목, 글내용

    //console.log("newPost\n", req.body)

    try {
        const boardInfo = req.body;
        const { writer, date, title, pContent } = boardInfo;

        const postnum = await save(boardInfo);

        return res.status(200).json( { success: true, postNum: postnum} );

        
    } catch (err) {
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { newPost };