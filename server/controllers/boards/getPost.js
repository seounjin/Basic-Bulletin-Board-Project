const { post } = require('../../models/Board');

const getPost = async(req, res) => {

    console.log("겟포스트입니다~~~~~~~", req.params.postNum);

    try {
        let content = await post(req.params.postNum);
        //return res.status(200).json( { success: true } );
        return res.status(200).json( {success: true, content, postnum: req.params.postNum });
    } catch (err) {
        console.log("getPost",err);
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { getPost };