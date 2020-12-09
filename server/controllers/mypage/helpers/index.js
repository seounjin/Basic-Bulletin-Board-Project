const { userProfile } = require('./profile');
const { confirm } = require('./confirm');
const { privacy } = require('./privacy');
const { avatar } = require('./avatar');
const { activityTotal, userPost, userComment } = require('./userPost');


module.exports = { userProfile, confirm, privacy, avatar, 
    activityTotal, userPost, userComment };