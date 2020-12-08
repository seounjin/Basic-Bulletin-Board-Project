const ReportPost = require('../../../models/ReportPost');


const delectPost = async pNum => {

    await ReportPost.deleteMany({ "pNum": pNum });
    
};

const delectPostId = async _id => {

    await ReportPost.deleteOne({ "_id": _id});
    
};

module.exports = { delectPost, delectPostId };