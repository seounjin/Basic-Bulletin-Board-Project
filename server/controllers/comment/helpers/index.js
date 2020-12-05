const { deleteC } = require('./deleteC');
const { getComment } = require('./getComment');
const { getCount } = require('./getCount');
const { getLatestComment } = require('./getLatestComment');
const { modifyComment } = require('./modifyComment');
const { saveParentComment } = require('./saveParentComment');
const { savechildComment } = require('./savechildComment');




module.exports = {
    deleteC,
    getComment,
    getCount,
    getLatestComment,
    modifyComment,
    saveParentComment,
    savechildComment
};