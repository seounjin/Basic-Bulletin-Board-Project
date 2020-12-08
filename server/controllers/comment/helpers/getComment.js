const Comment = require('../../../models/Comment');


const getComment = async (pNum, currentPage, maxComment) => {
        
    const comment = await Comment.find({"pNum": pNum})
                                 .populate('cWriter','-password -token -email')
                                 .sort({"gNum": 1,"date": 1})
                                 .skip((currentPage - 1) * maxComment)
                                 .limit(maxComment);
    
    return comment;
};

module.exports = { getComment };