const { parent } = require('./parent');
const { child } = require('./child');
const { change } = require('./change');
const { registerComment } = require('./registerComment');
const { latestComment  } = require('./latestComment');
const { deleteComment } = require('./deleteComment');

module.exports = {
    parent,
    child,
    change,
    registerComment,
    latestComment,
    deleteComment
};