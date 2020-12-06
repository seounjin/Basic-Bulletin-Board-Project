const mongoose = require('mongoose');
//const config = require("../config/dev");
// const { User } = require("./User");

const BoardSchema = mongoose.Schema({
    postnum: {
        type: Number,
        unique: 1
    },
    title: {
        type: String,
        maxlength: 60
    },
    writer: {
        type: String,
        maxlength: 20,
    },
    date: {
        type: String,
        maxlength: 30
    },
    views: {
        type: Number,
        default: 0
    },
    favorite: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        maxlength : 500
    },
    like: [],
})

module.exports = mongoose.model('Board', BoardSchema);

// ////////////게시판 요청 페이지 응답/////////////////
// const page = async ({ keyword, currentPage, PageSize }) => {

//     // 페이지네이션!!!
    
//     return Total;
// };

// const checkFavoritePost = async (postNum, userId) => {

//     //쿼리 바꿔야할 수도 있을 것 같음.
//     const temp = await Board.findOne({ postnum: postNum })

//     const found = await temp.like.find(e => e == userId)
    
//     if (found == userId) {
//         return true;
//     }
//     return false;
// };

// const unfavoritePost = async (postNum, userId) => {

//     await Board.findOneAndUpdate(
//         { postnum: postNum }, { $pull: { like: userId }, $inc: {favorite: -1 } },{ upsert: true, new : true }
//     )
// };

// const favoritePost = async (postNum, userId) => {

//     await Board.findOneAndUpdate(
//         { postnum: postNum }, { $push: { like: userId }, $inc: {favorite: 1 } },{ upsert: true, new : true }
//     )
// };

// ////////////게시글 수정/////////////////
// const modifyPost = async ({ pNum, title, pContent }) => {

//     const temp = await Board.findOne( { postnum: pNum } );

//     console.log("modifyPost", temp);

//     if (title == temp.content) {
//         return true;
//     }

//     await Board.findByIdAndUpdate(
//         { _id: temp._id },
//         {$set:{title: title, content: pContent}},{new : true},
//         (err, doc) => {
//             if (err) {
//                 console.log("modifyPost//Board.findByIdAndUpdate//err")
//             }
//         }
//     )
//     return false;
// };

// ///////////특정 게시글 요청 페이지 응답/////////////////
// const removePost = async (postNum) => {

//     const temp = await Board.findOneAndDelete( { postnum: postNum } );

//     return temp;
// };

// ///////////특정 게시글 요청 페이지 응답/////////////////
// const post = async (postNum) => {

//     const temp = await Board.findOne( { postnum: postNum } );
    
//     return temp;
// };

// ////////////게시글의 전체 개수를 응답해줌/////////////////
// const totalPost = async () => {

//     const board = new Board();

//     Total = await board.collection.countDocuments();
    
//     return Total;
// };

// ////////////새로운 게시글 생성/////////////////
// const createNewPost = async ({ writer, date, title, pContent }) => {

//     const temp = new Board();

//     Total = await temp.collection.countDocuments();

//     Total = Total + 1;
//     let Writer;
//     await User.findOne(
//         {_id: writer},
//         {},{new : true},
//         (err, doc) => {
//             if (err) {
//                 console.log("createNewPost//User.findOne//err")
//             } else {
//                 Writer = doc.id;
//             }
//         }
//     )

//     const board = await new Board({ postnum : Total, title, writer : Writer, date, views : 0, favorite : 0, content : pContent });
//     await board.save();

//     return Total;
// };