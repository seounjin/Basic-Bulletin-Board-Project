const Board = require('../../../models/Board');
const User = require('../../../models/User');
const Comment = require('../../../models/Comment');

const userProfile = async (id) => {
    
    const temp1 = await User.findOne({id : id}); // 이메일, 아바타
    const temp2 = await Board.countDocuments({writer : id}); // 게시물 수
    const temp3 = await Comment.countDocuments({cWriter : temp1._id}); // 댓글 수
    const temp4 = await Comment.aggregate([ { "$match": { cWriter : temp1._id } }, { "$group": { _id: "$pNum" } } ]); // 댓글을 작성한 게시글의 수
    
    return [temp1.email, temp2, temp3, 0, temp4.length, temp1.avatar];
};

module.exports = { userProfile };