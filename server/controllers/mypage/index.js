const { getProfile } = require('./getProfile');
const { checkPassword } = require('./checkPassword');
const { changePrivacy } = require('./changePrivacy');
const { myReportPost } = require('./myReportPost');
const { myReportComment } = require('./myReportComment');

module.exports = {
    getProfile, checkPassword, changePrivacy, myReportPost, myReportComment
};
