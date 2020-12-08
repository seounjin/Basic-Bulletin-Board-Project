const Board = require('../../../models/Board');
const Counter = require('../../../models/Counter');
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
    const temp2 = await User.findOne( { id: temp.writer } );
    //temp.avatar = temp2.avatar;
    //console.log("post", temp);

    const ret = {
        title: temp.title,
        writer: temp.writer,
        content: temp.content,
        views: temp.views,
        date: temp.date,
        favorite: temp.favorite,
        avatar: temp2.avatar
    }
    console.log(ret);
    return ret;
};

////////////게시글의 전체 개수를 응답/////////////////
const totalPost = async () => {

    // Total = await Board.collection.countDocuments();
    //const temp = await Counter.findOne({kind: "board"});
    //console.log(temp.total);

    let temp = await Counter.collection.countDocuments();

    let Total;
    if (temp == 0) {
        const counter = await new Counter({ total: 0, kind: "board" });
        await counter.save();
        Total = 0;
    } else {
        const temp = await Counter.findOne({kind: "board"});
        Total = temp.total;
    }

    return Total;
};

////////////새로운 게시글 생성/////////////////
const createNewPost = async ({ writer, date, title, pContent }) => {

    // let temp = await Counter.collection.countDocuments();

    let Total;
    const temp = await Counter.findOneAndUpdate({kind: "board"}, {$inc: {total: 1}});
    Total = temp.total + 1;

    // if (temp == 0) {
    //     const counter = await new Counter({ total: 1, kind: "board" });
    //     await counter.save();
    //     Total = 1;
    // } else {
    //     const temp = await Counter.findOneAndUpdate({kind: "board"}, {$inc: {total: 1}});
    //     Total = temp.total + 1;
    // }

    // let Total = await Board.collection.countDocuments();
    //Total = Total + 1;

    const user = await User.findOne({_id: writer});

    const board = await new Board({ postnum : Total, title, writer : user.id, date, views : 0, favorite : 0, content : pContent });
    await board.save();

    return Total;
};

module.exports = { modifyPost, removePost, post, totalPost, createNewPost };