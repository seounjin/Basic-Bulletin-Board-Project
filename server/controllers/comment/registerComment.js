const { getCount, getComment } = require('./helpers');


// 등록순으로 댓글 요청
const registerComment = async(req, res) => {
    
    try {
        const commentData = req.body;
        const { postNum, commentPage } = commentData;
        const maxComment = 10; // 10개 고정
        
        // 코멘트 갯수
        const cnt = await getCount(postNum);

        //등록순으로 불러오기
        const comment = await getComment(commentData);


        return res.status(200).json( {success: true , comment, commentCnt : cnt } );
                
    } catch (err) {
        console.log("registerComment",err);
        return res.status(400).json( { success: false, err } );
    }
}; 

module.exports = { registerComment };
