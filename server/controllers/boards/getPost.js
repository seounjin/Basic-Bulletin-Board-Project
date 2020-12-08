const { post } = require('./helpers/post');

const getPost = async(req, res) => {

    try {
        let content = await post(req.params.postNum);
        //return res.status(200).json( { success: true } );
        //console.log("content",  content);
        return res.status(200).json( {success: true, content, postnum: req.params.postNum });
    } catch (err) {
        console.log("getPost ",err);
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { getPost };