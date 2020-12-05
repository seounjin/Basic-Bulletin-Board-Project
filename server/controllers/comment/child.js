const { savechildComment, getComment } = require('./helpers');

// 자식 댓글 저장
const child = async(req, res) => {

    try {
        const commentData = req.body;
        const { pNum, gNum, cWriter,pComment, date ,gDepth, currentPage} = commentData;
        const maxComment = 10; // 10개 고정

        const result = await savechildComment(commentData);
        const comment = await getComment(pNum, currentPage, maxComment);

       
        return res.status(200).json( { success: true, cGroupsquence: result._id, comment} );            

    } catch (err) {
        console.log("child",err);
        return res.status(400).json( { success: false, err } );
    }
}; 

module.exports = { child };
