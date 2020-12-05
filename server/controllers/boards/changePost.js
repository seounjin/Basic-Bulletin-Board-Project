const { modifyPost } = require('../../models/Board');

const changePost = async(req, res) => {

    console.log("changePost", req.body);

    try {
        const postInfo = req.body;
        // const { pNum, title, pContent } = postInfo;

        const isReal = await modifyPost(postInfo);
        
        return res.status(200).json( { success: true, isSame: isReal } );

    } catch (err) {
        console.log(err)
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { changePost };