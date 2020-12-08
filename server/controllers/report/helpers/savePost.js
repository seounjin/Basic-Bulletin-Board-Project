const ReportPost = require('../../../models/ReportPost');


const savePost = async({pNum, content, rContent, fromId, toId, date }) => {

    const reportPost = await ReportPost({ pNum, content, rContent, fromId, toId, date });

    await reportPost.save();
};

module.exports = { savePost };