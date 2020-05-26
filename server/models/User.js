const bcrypt = require('bcrypt');
const saltRounds = 10;
const getConnection = require('./db');
const jwt = require('jsonwebtoken');


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
            var user = [data.id, data.password, data.email, data.role];
    
            conn.query(sql, user, function (err, rows, fields) { //row == results
    
                if (err) {
                    console.log(err);
                    return cb(err);
                }
                else {
                  console.log('rows', rows);
                  console.log('fields', fields);
                  conn.release();
                  return cb(null);
                }
            });
            
        })
      })


  } )
}

const userLogin = function(data, cb) {

  getConnection((conn) => {
    //var sql = 'SELECT id, password FROM User where id=? and password=?';
    var sql = 'SELECT password FROM User where id=?'

    var user = [data.id];
    conn.query(sql, user, function (err, rows, fields) { //row == results
  
        if (err) {
            console.log(err);
            conn.release();
            return cb(err);
        }
        else {

          console.log(rows);
          console.log(rows[0].password);

          bcrypt.compare(data.password, rows[0].password, function(err, isMatch){
            
            if (err) {
              conn.release(); 
              return cb(err); 
            }

            conn.release();
          
            cb(null, isMatch);
          })
        }
    });
  })
}


const generateToken = function(data, cb) {

  var token =  jwt.sign(data.id, 'secret')
  var tokenExp = "1111"

  getConnection((conn) => {

    var sql = "UPDATE `User` SET `token` = ?, `tokenExp` = ? WHERE (`id` = ?)"
    var user = [token, tokenExp, data.id]
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
              console.log(err);
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
    var sql = "UPDATE `User` SET `token` = '', `tokenExp` = '' WHERE (`id` = ?)" ;
    var user = [userId];

    conn.query(sql, user, function (err, rows, fields) {

      if (err) {
        console.log(err);
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


module.exports = { userRegister, userLogin, generateToken, findByToken, userLogout }