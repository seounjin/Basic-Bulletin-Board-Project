const { getCount, getLatestComment } = require('./helpers');


//최신순
const latestComment = async(req, res) => {
    
    try {
        const commentData = req.body;
        const { postNum, commentPage} = commentData;
        const maxComment = 10; // 10개 고정
        
        const cnt = await getCount(postNum);

        const comment = await getLatestComment(postNum, commentPage, maxComment);

        return res.status(200).json( {success: true , comment, commentCnt : cnt } );
                
    } catch (err) {
        console.log("latestComment",err);
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { latestComment };
