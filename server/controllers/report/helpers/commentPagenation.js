const ReportComment = require('../../../models/ReportComment')

const commentPagenation = async(currentPage, maxComment) => {
    
    // 신고한코멘트 카운트 
    // 코멘트 번호
    
    // 그룹화 -> cGroupsQuence
    // 카운트 -> 
    // 

    // const result = await ReportComment.find()
    //                                    .populate('fromId','-password -token -email -role -_id')
    //                                    .sort({"date": 1})
    //                                    .skip((currentPage - 1) * maxComment)
    //                                    .limit(maxComment);

    const result = await ReportComment.aggregate([
        {
            "$group": {
                "cGroupSquence": "$cGroupSquence"
                }
        }
    ])

    return result;

};


module.exports = { commentPagenation };
