const Board = require('../../../models/Board');
const User = require('../../../models/User');
const Comment = require('../../../models/Comment');

const activityTotal = async (id, type) => {

    if (type == 0) {
        //해당 아이디의 post 수를 받는 쿼리 작성.
        const total = await Board.countDocuments( { id : id } );
        return total;
    } else {
        console.log(id);
        //해당 아이디의 comment관련 post 수를 받는 쿼리. // 댓글을 작성한 게시글의 수
        const temp1 = await User.findOne({ id: id }, { id: 0, role: 0, email: 0, password: 0, avatar: 0, __v: 0, token: 0});
        const temp = await Comment.aggregate([ { "$match": { cWriter : temp1._id, pComment : {$ne : null} } }, { "$group": { _id: "$pNum" } } ]);
        return temp.length;
    }
}

const userPost = async (info) => {

    //해당 아이디의 post의 정보를 가져오는 쿼리 작성.
    const temp = await Board.find({writer : info.id}, { _id: 0, content: 0, __v: 0, like: 0 })
                            .skip((info.currentPage - 1) * info.pageSize)
                            .limit(info.pageSize)
                            .sort({ date: -1 });
    console.log("userPost", temp);
    return temp;
};

const userComment = async (info) => {

    //const temp = await Board;
    const temp = await User.findOne({ id: info.id}, { id: 0, role: 0, email: 0, password: 0, avatar: 0, __v: 0, token: 0 });

    const total = await Board.aggregate([
        { 
            "$lookup": 
            {
                from: "comments",
                let: { writer: temp._id, num: "$postnum", comment: null },
                pipeline: [{ 
                    $match: { 
                        $expr: { 
                            $and: [ 
                                    {$eq: ["$cWriter", "$$writer"] },
                                    {$eq: ["$pNum", "$$num"] },
                                    {$ne: ["$pComment", "$$comment"] }
                                ]
                        } 
                    }
                }],
                as: "temp2"
            }
        },
        {
            $match: {
                'temp2': {$ne: []}
            }
        },
        { $limit: info.pageSize },
        { $skip: (info.currentPage - 1) * info.pageSize },
        { $sort: { date : -1 } }
    ]);
    console.log("userComment\n",total);
    return total;
};

module.exports = { activityTotal, userPost, userComment };