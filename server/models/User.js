const mysql = require('mysql');
const dbConn = require("../config/dbConnect")

const conn = mysql.createConnection({ // conn == connection
  host     : 'localhost',
  user     : 'root',
  password : dbConn.dbPassword,
  database : 'BulletinBoard'
}); // 나중에 빼놓을꺼 빼놓기


// db 회원정보 저장
const userRegister = function(data, cb) {

    console.log('call!!!!!!!!!!!!!');

    conn.connect();
    var sql = 'INSERT INTO `User` (`id`, `password`, `email`, `role`) VALUES (?, ?, ?, ?)';
    var user = [data.id, data.password, data.email, data.role];
    conn.query(sql, user, function (err, rows, fields) { //row == results

        if (err) {
            console.log(err);
            return cb(err);
        }
        else {
          console.log('rows', rows);
          console.log('fields', fields);
          return cb(null);
        }
    });
  
  conn.end();
}

module.exports = { userRegister }