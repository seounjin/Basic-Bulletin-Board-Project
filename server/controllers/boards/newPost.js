const { createNewPost } = require('../../models/Board');

const newPost = async(req, res) => { // 글쓴이, 날짜, 글제목, 글내용

    console.log("newPost\n", req.body)

    try {
        const boardInfo = req.body;
        // const { writer, date, title, pContent } = boardInfo;

        const postnum = await createNewPost(boardInfo);

        console.log("포스트넘버\n", postnum);

        return res.status(200).json( { success: true, postNum: postnum } );
        
    } catch (err) {
        console.log(err)
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { newPost };