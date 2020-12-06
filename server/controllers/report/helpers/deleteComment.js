const ReportComment = require('../../../models/ReportComment');


const deleteComment = async cGroupSquence => {

    await ReportComment.deleteMany({ "cGroupSquence": cGroupSquence});
    
};

module.exports = { deleteComment };