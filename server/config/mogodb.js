const mongoose = require('mongoose');
const config = require('./dev')

module.exports = () => {

    const connect = () => {

        mongoose.Promise = global.Promise;

        mongoose.connect(config.mongoURI, config.options, (err) => {

        if (err) {
            console.error('mongodb connection error', err);
        }
        console.log('mongodb connected');
        });


  }

  connect();
  
  mongoose.connection.on('disconnected', connect);

};