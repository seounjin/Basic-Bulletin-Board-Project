const ReportPost = require('../../../models/ReportPost');


const findPost = async(fromId, pNum) => {

    const result = await ReportPost.findOne({ "fromId":fromId, "pNum": pNum });

    return result;
};

module.exports = { findPost };