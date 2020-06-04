const getConnection = require('./db');


const getBoardList = function(cb){

    getConnection((conn) => {

        //바꿔야함.
        var sql = 'SELECT * FROM BulletinBoard.postInfo';

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

module.exports = { getBoardList }