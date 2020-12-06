const Board = require('../../../models/Board');

const checkFavoritePost = async (postNum, userId) => {

    //쿼리 바꿔야할 수도 있을 것 같음.
    const temp = await Board.findOne({ postnum: postNum })

    const found = await temp.like.find(e => e == userId)
    
    if (found == userId) {
        return true;
    }
    return false;
};

const unfavoritePost = async (postNum, userId) => {

    await Board.findOneAndUpdate(
        { postnum: postNum }, { $pull: { like: userId }, $inc: {favorite: -1 } },{ upsert: true, new : true }
    )
};

const favoritePost = async (postNum, userId) => {

    await Board.findOneAndUpdate(
        { postnum: postNum }, { $push: { like: userId }, $inc: {favorite: 1 } },{ upsert: true, new : true }
    )
};

module.exports = { checkFavoritePost, unfavoritePost, favoritePost };