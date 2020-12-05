const Comment = require('../../../models/Comment');


const getCount = async pNum => {
    
    const cnt = await Comment.countDocuments({"pNum": pNum});
    
    return cnt;
};

module.exports = { getCount };