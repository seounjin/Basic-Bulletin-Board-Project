const { removePost } = require('./helpers/post');

const deletePost = async(req, res) => {

    console.log("딜리트포스트입니다~~~~~~~", req.params.postNum);

    try {
        await removePost(req.params.postNum);
        return res.status(200).json( { success: true });
    } catch (err) {
        console.log("getPost",err);
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { deletePost };