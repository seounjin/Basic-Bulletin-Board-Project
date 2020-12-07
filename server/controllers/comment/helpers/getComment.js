const Comment = require('../../../models/Comment');


const getComment = async ({postNum=null, commentPage, maxComment=10, fromId=null}) => {
    
    console.log("pNum", postNum, commentPage, maxComment, fromId);

    const comment = await Comment.find({"pNum": postNum} )
                                 .populate('cWriter','-password -token -email')
                                 .sort({"gNum": 1,"date": 1})
                                 .skip((commentPage - 1) * maxComment)
                                 .limit(maxComment);
    
    return comment;
};

module.exports = { getComment };