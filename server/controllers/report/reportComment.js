const { findComment, saveComment } = require('./helpers');

const reportComment = async(req, res) => {

    try {
        const reportData = req.body;
        const { pNum, content, rContent, fromId, toId, date, cGroupSquence } = reportData;
                
        const result = await findComment(fromId, cGroupSquence);
        
        if (result){ // 이미 신고한 댓글
            
            return res.status(200).json( { success: true, report: true } );
        }

        await saveComment(reportData);

        return res.status(200).json( {success: true, report: false } );

    } catch (err){
        console.log("reportComment 에러", err);
        return res.status(400).json( { success: false, err } );

    }

};

module.exports = { reportComment };