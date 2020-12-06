const Board = require('../../../models/Board');
const User = require('../../../models/User');

////////////게시글 수정/////////////////
const modifyPost = async ({ pNum, title, pContent }) => {

    const temp = await Board.findOne( { postnum: pNum } );

    if (title == temp.content) {
        return true;
    }

    await Board.findByIdAndUpdate(
        { _id: temp._id },
        {$set:{title: title, content: pContent}},{new : true},
        (err, doc) => {
            if (err) {
                console.log("modifyPost//Board.findByIdAndUpdate//err")
            }
        }
    )
    return false;
};

///////////특정 게시글 삭제/////////////////
const removePost = async (postNum) => {

    const temp = await Board.findOneAndDelete( { postnum: postNum } );

    return temp;
};

///////////특정 게시글 요청 응답/////////////////
const post = async (postNum) => {

    const temp = await Board.findOneAndUpdate( { postnum: postNum }, { $inc: { views: 1 } } );
    
    return temp;
};

////////////게시글의 전체 개수를 응답/////////////////
const totalPost = async () => {

    Total = await Board.collection.countDocuments();
    
    return Total;
};

////////////새로운 게시글 생성/////////////////
const createNewPost = async ({ writer, date, title, pContent }) => {

    Total = await Board.collection.countDocuments();

    Total = Total + 1;
    let Writer;
    await User.findOne(
        {_id: writer},
        {},{new : true},
        (err, doc) => {
            if (err) {
                console.log("createNewPost//User.findOne//err")
            } else {
                Writer = doc.id;
            }
        }
    )

    const board = await new Board({ postnum : Total, title, writer : Writer, date, views : 0, favorite : 0, content : pContent });
    await board.save();

    return Total;
};

module.exports = { modifyPost, removePost, post, totalPost, createNewPost };