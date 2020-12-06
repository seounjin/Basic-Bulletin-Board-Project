const { removePost } = require('./helpers/post');

const deletePost = async(req, res) => {

    try {
        await removePost(req.params.postNum);
        return res.status(200).json( { success: true });
    } catch (err) {
        console.log("deletePost  ",err);
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { deletePost };