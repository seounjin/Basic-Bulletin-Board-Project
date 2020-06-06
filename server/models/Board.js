const getConnection = require('./db');


const getBoardList = function(cb){

    getConnection((conn) => {

        //바꿔야함.
        var sql = `SELECT postnum, title, writer, date_format(date, '%y.%m.%d') as date, views, favorite FROM BulletinBoard.PostInfo`;

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
        var sql = 'SELECT pContent FROM BulletinBoard.PostInfo, BulletinBoard.PostContents WHERE postnum = ? and pNum = postnum';
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

module.exports = { getBoardList, getBoardContent }