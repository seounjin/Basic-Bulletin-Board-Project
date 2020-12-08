const ReportComment = require('../../../models/ReportComment')

const commentPagenation = async(currentPage, maxComment, fromId=null) => {
    

    const id = fromId ? 'toId': 'fromId';
    const option = fromId ? 'id': '-password -token -email -role -_id';

    const result = await ReportComment.find( fromId && {"fromId":fromId })
                                       .populate(id, option)
                                       .skip((currentPage - 1) * maxComment)
                                       .limit(maxComment);

    return result;

};


module.exports = { commentPagenation };
