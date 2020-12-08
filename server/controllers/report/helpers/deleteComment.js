const ReportComment = require('../../../models/ReportComment');


const deleteComment = async cGroupSquence => {

    await ReportComment.deleteMany({ "cGroupSquence": cGroupSquence});
    
};

const deleteCommentId = async _id => {

    await ReportComment.deleteOne({ "_id": _id});
    
};

module.exports = { deleteComment, deleteCommentId };