const mongoose = require('mongoose');
const config = require("../config/dev");
const { getNextSequence } = require("./countPost");

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
        maxlength: 20
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
const Board = mongoose.model('Board', BoardSchema)

const save = async ({ writer, date, title, pContent }) => {

    mongoose.connect(config.mongoURI, config.options);

    const postnum = await getNextSequence();

    const board = new Board({ postnum : postnum, title : title, writer : writer, 
        date : date, views : 0, favorite : 0, content : pContent });

    console.log(board)

    await board.save();
    
    await mongoose.disconnect();

    return postnum;
};

module.exports = { save }

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