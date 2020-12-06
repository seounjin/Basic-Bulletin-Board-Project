const ReportComment = require('../../../models/ReportComment');


const saveComment = async({pNum, content, rContent, fromId, toId, cGroupSquence, date }) => {

    
    const reportComment = await ReportComment({ pNum, content, rContent, fromId, toId, cGroupSquence, date });

    await reportComment.save();
};

module.exports = { saveComment };