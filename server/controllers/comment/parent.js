const { saveParentComment, getComment } = require('./helpers');


// 부모 댓글 저장
const parent = async(req, res) => {
    
    try {
        const commentData = req.body;
        const { pNum, cWriter, pComment,date, gDepth, currentPage} = commentData;
        const maxComment = 10; // 10개 고정

        const result = await saveParentComment(commentData);
        const comment = await getComment(pNum, currentPage, maxComment);

        return res.status(200).json( { success: true, cGroupsquence: result._id, comment} );            

    } catch (err) {
        console.log("parent",err);
        return res.status(400).json( { success: false, err } );
    }
}; 

module.exports = { parent };
