const bcrypt = require('bcrypt');
const saltRounds = 10;
const getConnection = require('./db');
const jwt = require('jsonwebtoken');
const moment = require("moment");


// db 회원정보 저장
const userRegister = function(data, cb) {

  getConnection((conn) => {

      //연결 성공
      bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) console.log(err);
    
        bcrypt.hash(data.password, salt, function(err, hash){
            if(err) console.log(err);

            var sql = 'INSERT INTO `User` (`id`, `password`, `email`, `role`) VALUES (?, ?, ?, ?)';
            data.password = hash 
            var user = [data.id, data.password, data.email, 0];
    
            conn.query(sql, user, function (err, rows, fields) { //row == results
    
                if (err) {
                    return cb(err);
                }
                else {
                  conn.release();
                  return cb(null);
                }
            });
            
        })
      })
  } )
}

const recordUserLoginDate = function(data, cb) {
  
  getConnection((conn) => {

    var sql = 'INSERT INTO `BulletinBoard`.`ConnectionRecord` (`connID`, `connStartDate`, `connEndDate`) VALUES (?, ?, NULL)';
    var user = [data.id, data.loginDate];

    conn.query(sql, user, function (err, rows, fields) {

      conn.release();

      if(err) {
        return cb(err);
      }
      else {
        return cb(null);
      }
    })

  })
}

const userLogin = function(data, cb) {

  getConnection((conn) => {

    var sql = 'SELECT password, id FROM BulletinBoard.User where id=?'

    var user = [data.id];
    //console.log(user);
    conn.query(sql, user, function (err, rows, fields) { //row == results

        //console.log(rows);

        if (err) {
            //console.log("err", rows);
            conn.release();
            //console.log('로그인 실패!!!!')
            return cb(err);
        } 
        else if(rows.length === 0) {
          //console.log("rows.length", rows);
          //err === null, DB에서 모든 속성이 NULL인 행을 돌려줌.
          conn.release();
          //console.log('로그인 실패!!!!')
          return cb(err, false);
        }
        else {
          bcrypt.compare(data.password, rows[0].password, function(err, isMatch){
            
            if (err) {
              conn.release(); 
              return cb(err); 
            }

            conn.release();
            //console.log('로그인 성공!!!!')
            cb(null, isMatch);
          })
        }
    });
  })
}


const generateToken = function(data, cb) {

  var token =  jwt.sign(data.id, 'secret' );
  var tokenExp  = moment().add(2, 'hours').valueOf();
  
  
  getConnection((conn) => {

    var sql = "UPDATE `User` SET `token` = ?, `tokenExp` = ? WHERE (`id` = ?)"
    var user = [token, tokenExp, data.id];
    conn.query(sql, user, function (err, rows, fields) {
  
      if (err) {
          console.log(err);
          conn.release();
          return cb(err);
      }
      else {
        conn.release();
        return cb(null,token);
      }

    });

  })
  
}

const findByToken = function(token, cb) {

    jwt.verify(token,'secret',function(err, decode){

      getConnection((conn) => {
        var sql = "SELECT * FROM User WHERE id=? and token=?";
        var user = [decode, token]

        conn.query(sql, user, function (err, rows, fields) {
  
          if (err) {
              //console.log(err);
              conn.release();
              return cb(err);
          }
          else {
            conn.release();
            return cb(null, rows);
          }
    
        });

      
      });

  })

}

const userLogout = function(userId, cb) {

  getConnection((conn) => {
    var sql = "UPDATE `User` SET `token` = NULL, `tokenExp` = NULL WHERE (`id` = ?)" ;
    var user = [userId];
    conn.query(sql, user, function (err, rows, fields) {
      if (err) {
        //console.log(err);
        conn.release();
        return cb(err);
      }
      else {
        conn.release();
        return cb(null);
      }
    });
  });
}

const getLoginTime = function(userId, cb) {
  //console.log("getLoginTime", userId);
  //userId += 222
  getConnection((conn) => {
    var sql = "SELECT date_format(connStartDate, '%Y-%m-%d %H:%i:%s') as dt FROM BulletinBoard.ConnectionRecord where connID = ? and connEndDate is NULL" ;
    var user = [userId];
    conn.query(sql, user, function (err, rows, fields) {
      conn.release();
      if (err) {
        return cb(err, null);
      }
      else {
        return cb(null, rows[0].dt);
      }
    });
  });
}

const setLogoutTime = function(data, cb) {
  console.log("setLogoutTime", data);
  getConnection((conn) => {
    var sql = "UPDATE `BulletinBoard`.`ConnectionRecord` SET `connEndDate` = ? WHERE (`connID` = ?) and (`connStartDate` = ?)" ;
    var user = [data.logoutTime, data.userId, data.loginTime];
    conn.query(sql, user, function (err, rows, fields) {
      conn.release();
      if (err) {
        return cb(err);
      }
      else {
        return cb(null);
      }
    });
  });
}

const modifyPrivacy = function(data, cb) {// body ==> id, password, email

  getConnection((conn) => {

      bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) console.log(err);
    
        bcrypt.hash(data.password, salt, function(err, hash){
            if(err) console.log(err);

            var sql = 'UPDATE `BulletinBoard`.`User` SET `password` = ?, `email` = ? WHERE (`id` = ?)';
            data.password = hash 
            var user = [data.password, data.email, data.id];
    
            conn.query(sql, user, function (err, rows, fields) { //row == results
    
                if (err) {
                    return cb(err);
                }
                else {
                  conn.release();
                  return cb(null);
                }
            });
        })
      })
  } )
}

const tokenTime = function(data, cb) {
  
  getConnection((conn) => {

    var sql = "SELECT tokenExp FROM BulletinBoard.User WHERE id=?";
    var user = [data.id];
    conn.query(sql, user, function (err, rows, fields) {
    conn.release();

        if (err) {
          
          return cb(err);
        }
        else {
          return cb(null, rows[0].tokenExp);
        }

    });
  });

}


module.exports = { userRegister, userLogin, generateToken, findByToken, userLogout, recordUserLoginDate, getLoginTime, setLogoutTime, modifyPrivacy, tokenTime }