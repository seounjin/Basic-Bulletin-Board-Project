const Comment = require('../../../models/Comment');


const getLatestComment = async (pNum, currentPage, maxComment) => {
    
    const comment = await Comment.find({"pNum": pNum})
                                 .populate('cWriter','-password -token -email')
                                 .sort({"gNum": -1,"date": 1})
                                 .skip((currentPage - 1) * maxComment)
                                 .limit(maxComment);
    
    return comment;
};

module.exports = { getLatestComment };