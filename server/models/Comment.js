
const mongoose = require('mongoose');
const config = require("../config/dev");
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


// const saveParentComment = async ({ pNum, cWriter, pComment, date, gDepth }) => {
//     mongoose.connect(config.mongoURI, config.options);
//     const comment = new Comment({ pNum,cWriter, pComment, date, gDepth });
//     comment.gNum = comment._id;
    
//     await comment.save();
    
//     await mongoose.disconnect();

//     return comment;
// };

// const savechildComment = async ({ pNum, gNum, cWriter, pComment, date, gDepth }) => {
//     mongoose.connect(config.mongoURI, config.options);
//     const comment = new Comment({ pNum,gNum, cWriter, pComment, date, gDepth });
//     await comment.save();
    
//     await mongoose.disconnect();

//     return comment;
// };

// const getComment = async (pNum, currentPage, maxComment) => {
//     mongoose.connect(config.mongoURI, config.options);
        
//     const comment = await Comment.find({"pNum": pNum})
//                                  .populate('cWriter','-password -token -email')
//                                  .sort({"gNum": 1,"date": 1})
//                                  .skip((currentPage - 1) * maxComment)
//                                  .limit(maxComment);
    
//     await mongoose.disconnect();

//     return comment;
// };

// const getLatestComment = async (pNum, currentPage, maxComment) => {
//     mongoose.connect(config.mongoURI, config.options);
    
//     const comment = await Comment.find({"pNum": pNum})
//                                  .populate('cWriter','-password -token -email')
//                                  .sort({"gNum": -1,"date": 1})
//                                  .skip((currentPage - 1) * maxComment)
//                                  .limit(maxComment);
    
//     await mongoose.disconnect();

//     return comment;
// };

// const getCount = async pNum => {
//     mongoose.connect(config.mongoURI, config.options);
    
//     const cnt = await Comment.countDocuments({"pNum": pNum});
    
//     await mongoose.disconnect();

//     return cnt;
// };


// const deleteC = async cGroupSquence => {

//     mongoose.connect(config.mongoURI, config.options);
    
//     await Comment.findOneAndUpdate({ "_id": cGroupSquence }, { "pComment": null });
//     await mongoose.disconnect();

// };


// const modifyComment = async ({ cGroupSquence, pComment }) => {

//     mongoose.connect(config.mongoURI, config.options);
    
//     await Comment.findOneAndUpdate({ "_id": cGroupSquence }, { "pComment": pComment });
//     await mongoose.disconnect();

// };


// module.exports = { 
//     deleteC, 
//     modifyComment, 
//     saveParentComment, 
//     getComment, 
//     getCount, 
//     getLatestComment,
//     savechildComment
// };
