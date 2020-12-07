const ReportPost = require('../../../models/ReportPost');


const delectPost = async pNum => {

    await ReportPost.deleteMany({ "pNum": pNum });
    
};

module.exports = { delectPost };