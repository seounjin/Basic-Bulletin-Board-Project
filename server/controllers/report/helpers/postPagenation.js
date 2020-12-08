const ReportPost = require('../../../models/ReportPost');

const postPagenation = async(currentPage, maxComment,fromId=null) => {
    

    const id = fromId ? 'toId': 'fromId';
    const option = fromId ? 'writer': '-password -token -email -role -_id';

    const result = await ReportPost.find(fromId && {"fromId":fromId} )
                                    .populate(id, option)
                                    .skip((currentPage - 1) * maxComment)
                                    .limit(maxComment);
    
    return result;

};


module.exports = { postPagenation };
