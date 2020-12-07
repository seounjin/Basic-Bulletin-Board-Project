const { findPost, savePost } = require('./helpers');

const reportPost = async(req, res) => {

    try {
        const reportData = req.body;
        const { pNum, content, rContent, fromId, toId, date } = reportData;
                
        const result = await findPost(fromId, pNum);
        
        if (result){ // 이미 신고한 댓글
            
            return res.status(200).json( { success: true, report: true } );
        }

        await savePost(reportData);

        return res.status(200).json( {success: true, report: false } );

    } catch (err){
        console.log("reportPost 에러", err);
        return res.status(400).json( { success: false, err } );

    }

};

module.exports = { reportPost };