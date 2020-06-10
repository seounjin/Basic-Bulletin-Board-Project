const getConnection = require('./db');


const getBoardList = function(cb){

    getConnection((conn) => {
        
        var sql = `SELECT postnum, title, writer, date_format(date, '%y.%m.%d') as date, views, favorite FROM BulletinBoard.PostInfo ORDER BY postnum desc`;

        conn.query(sql, function (err, rows, fields) {
            if (err) {
                conn.release();
                return cb(err);
            }
            else {
                conn.release();
                return cb(null, rows);
            }
        })
    })


}

const getBoardContent = function(postNum, cb){

    getConnection((conn) => {

        //바꿔야함.
        var sql2 = 'SELECT pContent FROM BulletinBoard.PostInfo, BulletinBoard.PostContents WHERE postnum = ? and pNum = postnum';
        var sql = "SELECT pContent, date_format(date, '%y.%m.%d. %h:%i') as date FROM BulletinBoard.PostInfo, BulletinBoard.PostContents WHERE postnum = ? and pNum = postnum";
        var pn = postNum
        
        conn.query(sql, pn, function (err, rows, fields) {
            if (err) {
                conn.release();
                return cb(err);
            }
            else {
                conn.release();
                return cb(rows, null);
            }
        })
    })


}

const boardPostRegister = function(post, cb) {

    getConnection((conn) => {

        var sql = 'INSERT INTO `BulletinBoard`.`PostInfo` (`title`, `writer`, `date`, `views`, `favorite`) VALUES (?, ?, ?, ?, ?)';
        var pi = [post.title, post.writer, post.date, 0, 0]; //postinfo
      
            conn.query(sql, pi, function (err, rows, fields) { //row == results
      
                if (err) {
                    return cb(err);
                }
                else {
                    return cb(null)
                }
            });
    })
}

const getPostNum = function(post, cb) {

    getConnection((conn) => {

        var sql = 'SELECT postnum FROM BulletinBoard.PostInfo WHERE writer = ? and date = ?';
        var pi = [post.writer, post.date]; //postinfo
      
            conn.query(sql, pi, function (err, rows, fields) { //row == results
      
                if (err) {
                    return cb(err, null);
                }
                else {
                    return cb(null, rows[0].postnum)
                }
            });
    })
}

const insertContent = function(num, post, cb) {

    getConnection((conn) => {

        var sql = 'INSERT INTO `BulletinBoard`.`PostContents` (`pNum`, `pContent`) VALUES (?, ?)';
        var pi = [num, post.pContent];
      
            conn.query(sql, pi, function (err, rows, fields) { //row == results
      
                if (err) {
                    return cb(err);
                }
                else {
                    return cb(null)
                }
            });
    })
}

module.exports = { getBoardList, getBoardContent, boardPostRegister, getPostNum, insertContent }