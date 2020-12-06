const Comment = require('../../../models/Comment');

const deleteC = async cGroupSquence => {

    await Comment.findOneAndUpdate({ "_id": cGroupSquence }, { "pComment": null });

};


module.exports = { deleteC };