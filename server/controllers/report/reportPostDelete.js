const { delectPost } = require('./helpers');
const { removePost } = require('../boards/helpers/post');

const reportPostDelete = async(req, res) => {

    try {

        const pNum = req.params.pNum;
        
        await delectPost(pNum);

        await removePost(pNum);

        return res.status(200).json( {success: true } );

    } catch (err){
        console.log("reportCommentPost 에러", err);
        return res.status(400).json( { success: false, err } );

    }

};

module.exports = { reportPostDelete };