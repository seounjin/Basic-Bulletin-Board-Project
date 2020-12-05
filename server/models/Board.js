const mongoose = require('mongoose');
const config = require("../config/dev");
// const { getNextSequence } = require("./countPost");
const { User } = require("./User");

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
        maxlength: 30
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
})

// 보드 모델에서 몽고 디비를 이용해 원하는 정보를 얻을 수 있게 로직을 작성!!
const Board = mongoose.model('Board', BoardSchema);

////////////게시판 요청 페이지 응답/////////////////
const page = async ({ keyword, currentPage, PageSize }) => {

    mongoose.connect(config.mongoURI, config.options);

    // 페이지네이션!!!
    
    await mongoose.disconnect();

    return Total;
};

////////////새로운 게시글 생성/////////////////
const modifyPost = async ({ pNum, title, pContent }) => {

    mongoose.connect(config.mongoURI, config.options);

    const temp = await Board.findOne( { postnum: pNum } );

    console.log("modifyPost", temp);

    if (title == temp.content) {
        await mongoose.disconnect();
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
    await mongoose.disconnect();
    return false;
    // return Total;
};

///////////특정 게시글 요청 페이지 응답/////////////////
const removePost = async (postNum) => {

    mongoose.connect(config.mongoURI, config.options);

    const temp = await Board.findOneAndDelete( { postnum: postNum } );
    //console.log(temp);
    
    await mongoose.disconnect();

    return temp;
};

///////////특정 게시글 요청 페이지 응답/////////////////
const post = async (postNum) => {

    mongoose.connect(config.mongoURI, config.options);

    const temp = await Board.findOne( { postnum: postNum } );
    //console.log(temp);
    
    await mongoose.disconnect();

    return temp;
};

////////////게시글의 전체 개수를 응답해줌/////////////////
const totalPost = async () => {

    mongoose.connect(config.mongoURI, config.options);

    const board = new Board();

    Total = await board.collection.countDocuments();
    
    await mongoose.disconnect();

    return Total;
};

////////////새로운 게시글 생성/////////////////
const createNewPost = async ({ writer, date, title, pContent }) => {

    mongoose.connect(config.mongoURI, config.options);

    const temp = new Board();

    Total = await temp.collection.countDocuments();

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

    const board = new Board({ postnum : Total, title, writer : Writer, date, views : 0, favorite : 0, content : pContent });

    await board.save();

    await mongoose.disconnect();

    return Total;
};

module.exports = { totalPost, createNewPost, post, removePost, modifyPost }

// const getConnection = require('./db');


// const getBoardList = function(cb){

//     getConnection((conn) => {
        
//         var sql = `SELECT postnum, title, writer, date_format(date, '%y.%m.%d') as date, views, favorite FROM BulletinBoard.PostInfo ORDER BY postnum desc`;

//         conn.query(sql, function (err, rows, fields) {
//             if (err) {
//                 conn.release();
//                 return cb(err);
//             }
//             else {
//                 conn.release();
//                 return cb(null, rows);
//             }
//         })
//     })


// }

// const getBoardContent = function(postNum, cb){

//     getConnection((conn) => {

//         var sql = "SELECT pContent, date_format(date, '%y.%m.%d. %h:%i') as date FROM BulletinBoard.PostInfo, BulletinBoard.PostContents WHERE postnum = ? and pNum = postnum";
//         var pn = postNum
        
//         conn.query(sql, pn, function (err, rows, fields) {
//             if (err) {
//                 conn.release();
//                 return cb(err);
//             }
//             else {
//                 conn.release();
//                 return cb(rows, null);
//             }
//         })
//     })


// }

// const boardPostRegister = function(post, cb) {

//     getConnection((conn) => {

//         var sql = 'INSERT INTO `BulletinBoard`.`PostInfo` (`title`, `writer`, `date`, `views`, `favorite`) VALUES (?, ?, ?, ?, ?)';
//         var pi = [post.title, post.writer, post.date, 0, 0]; //postinfo
      
//             conn.query(sql, pi, function (err, rows, fields) { //row == results
      
//                 if (err) {
//                     return cb(err);
//                 }
//                 else {
//                     return cb(null)
//                 }
//             });
//     })
// }

// const getPostNum = function(post, cb) {

//     getConnection((conn) => {

//         var sql = 'SELECT postnum FROM BulletinBoard.PostInfo WHERE writer = ? and date = ?';
//         var pi = [post.writer, post.date]; //postinfo
      
//             conn.query(sql, pi, function (err, rows, fields) { //row == results
      
//                 if (err) {
//                     return cb(err, null);
//                 }
//                 else {
//                     return cb(null, rows[0].postnum)
//                 }
//             });
//     })
// }

// const insertContent = function(num, post, cb) {

//     getConnection((conn) => {

//         var sql = 'INSERT INTO `BulletinBoard`.`PostContents` (`pNum`, `pContent`) VALUES (?, ?)';
//         var pi = [num, post.pContent];
      
//             conn.query(sql, pi, function (err, rows, fields) { //row == results
      
//                 if (err) {
//                     return cb(err);
//                 }
//                 else {
//                     return cb(null)
//                 }
//             });
//     })
// }

// const deletePost = function(post, cb) {

//     getConnection((conn) => {

//         var sql = 'INSERT INTO `BulletinBoard`.`PostInfo` (`title`, `writer`, `date`, `views`, `favorite`) VALUES (?, ?, ?, ?, ?)';
//         var pi = [post.title, post.writer, post.date, 0, 0]; //postinfo
      
//             conn.query(sql, pi, function (err, rows, fields) { //row == results
      
//                 if (err) {
//                     return cb(err);
//                 }
//                 else {
//                     return cb(null)
//                 }
//             });
//     })
// }

// module.exports = { getBoardList, getBoardContent, boardPostRegister, getPostNum, insertContent, deletePost }