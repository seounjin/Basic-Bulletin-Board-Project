
const mysql = require('mysql');
const config = require('../config/db_config.json');

let pool = mysql.createPool(config);

function getConnection(callback) {
  pool.getConnection(function (err, conn) {
    if(!err) {
      callback(conn);
    }
    else{
        //처리
    }

  });
}

module.exports = getConnection;