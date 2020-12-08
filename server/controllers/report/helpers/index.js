const { findComment } = require('./findComment');
const { saveComment } = require('./saveComment');
const { savePost } = require('./savePost');
const { commentPagenation } = require('./commentPagenation');
const { deleteComment, deleteCommentId } = require('./deleteComment');
const { findPost } = require('./findPost');
const { postPagenation } = require('./postPagenation');
const { delectPost, delectPostId } = require('./delectPost');


module.exports = { findComment, 
                    saveComment, 
                    commentPagenation, 
                    deleteComment,findPost, 
                    savePost,
                    postPagenation,
                    delectPost,
                    delectPostId,
                    deleteCommentId
                };