const Comment = require('../../../models/Comment');


const savechildComment = async ({ pNum, gNum, cWriter, pComment, date, gDepth }) => {

    const comment = new Comment({ pNum,gNum, cWriter, pComment, date, gDepth });
    await comment.save();
    
    await mongoose.disconnect();

    return comment;
};


module.exports = { savechildComment };