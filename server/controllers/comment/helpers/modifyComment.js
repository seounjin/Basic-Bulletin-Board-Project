const Comment = require('../../../models/Comment');


const modifyComment = async ({ cGroupSquence, pComment }) => {
  
    await Comment.findOneAndUpdate({ "_id": cGroupSquence }, { "pComment": pComment });

};

module.exports = { modifyComment };