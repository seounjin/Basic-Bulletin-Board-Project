const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//cGroupSquence 댓글 고유 번호
//gNum 그룹넘버
// 참고 type: [{type: Schema.ObjectId, ref: 'Message'}]
const commentSchema = mongoose.Schema({
    
    cWriter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pComment: {
        type: String,
    },
    pNum:{
        type: Number,
    },
    gNum:{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    gDepth: {
        type: Number,
    },
    report: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date, 
        default: Date.now,
    },

});

module.exports = mongoose.model('Comment', commentSchema);
