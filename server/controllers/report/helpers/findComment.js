const ReportComment = require('../../../models/ReportComment');


const findComment = async(fromId, cGroupSquence) => {

    const result = await ReportComment.findOne({ "fromId":fromId, "cGroupSquence":cGroupSquence });

    return result;
};

module.exports = { findComment };