const ReportPost = require('../../../models/ReportPost')

const postPagenation = async(currentPage, maxComment, fromId=null) => {
    
    console.log("fromId", fromId );

    const result = await ReportPost.find()
                                    .populate('fromId','-password -token -email -role -_id')
                                    .skip((currentPage - 1) * maxComment)
                                    .limit(maxComment);

    return result;

};


module.exports = { postPagenation };
