const Comment = require('../../../models/Comment');


const saveParentComment = async ({ pNum, cWriter, pComment, date, gDepth }) => {
    
    const comment = new Comment({ pNum,cWriter, pComment, date, gDepth });
    comment.gNum = comment._id;
    
    await comment.save();

    return comment;
};


module.exports = { saveParentComment };