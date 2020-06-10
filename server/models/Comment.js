const getConnection = require('./db');

// comment table 구성 (게시글 번호, 댓글 작성자, 댓글 내용, 답글을 쓴 답글 아이디, 작성time)


//댓글 저장
const saveComment = function(commentData, cb){


    getConnection((conn) => {

        var sql = 'INSERT INTO `Comment` (`pNum`, `cWriter`, `pComment`, `responseto`, `date`) VALUES (?, ?, ?, ?, ?)';
        var comment = [commentData.pNum, commentData.cWriter, commentData.pComment, commentData.responseto, commentData.date];
    
        conn.query(sql, comment, function (err, rows, fields) { 
        
            if (err) {
                console.log("코멘트에러",err)
                return cb(err);
            }
            else {  
              conn.release();
              return cb(rows.insertId, null);
            }
        });
    
    })
}


//댓글 가져오기

const getComment = function(pNum, cb){

    getConnection((conn) => {

        var sql = 'SELECT * FROM BulletinBoard.Comment WHERE pNum = ?';
        var comment = [pNum];

        conn.query(sql, comment, function (err, rows, fields) { 
        
            if (err) {
                return cb(err);
            }
            else {
            conn.release();
            return cb(rows, null);
            }
        });
    })

}


// 댓글 삭제
// 서버에서 삭제할 댓글 넘버를  cGroupSquence 0으로 변경

const deleteComment = function(cGroupSquence, cb){

    getConnection((conn) => {

        var sql = '';
        var comment = [cGroupSquence];

        conn.query(sql, comment, function (err, rows, fields) { 
        
            if (err) {
                return cb(err);
            }
            else {
            conn.release();
            return cb(null);
            }
        });
    })

}



module.exports = { saveComment, getComment, deleteComment }
