const { getTotal } = require('./getTotal');
const { newPost } = require('./newPost');
const { changePost } = require('./changePost');
const { deletePost } = require('./deletePost');
const { getPage  } = require('./getPage');
const { getPost } = require('./getPost');
const { checkFavorite } = require('./checkFavorite');
const { favorite } = require('./favorite');
const { unfavorite } = require('./unfavorite');

module.exports = {
    getTotal,
    newPost,
    changePost,
    deletePost,
    getPage,
    getPost,
    checkFavorite,
    favorite,
    unfavorite
};