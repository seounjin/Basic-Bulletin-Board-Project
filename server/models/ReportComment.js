const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//rnum, pNum, content, rContent, fromId,told, date, cGroupSquence
const reportCommentSchema = mongoose.Schema({
    
    pNum: {
        type: Number,
    },
    content: {
        type: String,
    },
    rContent: {
        type: String,
    },
    fromId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    toId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cGroupSquence: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    date: {
        type: Date, 
        default: Date.now,
    },

});

module.exports = mongoose.model('ReportComment', reportCommentSchema);
