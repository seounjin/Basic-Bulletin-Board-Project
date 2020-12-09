const { getProfile } = require('./getProfile');
const { checkPassword } = require('./checkPassword');
const { changePrivacy } = require('./changePrivacy');
const { setAvatar } = require('./setAvatar');
const { myReportPost } = require('./myReportPost');
const { myReportComment } = require('./myReportComment');
const { myReportPostCancel } = require('./myReportPostCancel');
const { myReportCommentCancel } = require('./myReportCommentCancel');
const { getUserPost } = require('./getUserPost');

module.exports = {
    getProfile, checkPassword, changePrivacy, myReportPost, myReportComment,myReportPostCancel, 
    myReportCommentCancel, setAvatar, getUserPost
};
