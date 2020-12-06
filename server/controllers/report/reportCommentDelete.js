const { deleteComment } = require('./helpers');
const { deleteC } = require('../comment/helpers');

const reportCommentDelete = async(req, res) => {

    try {

        const cGroupSquence = req.params.pNum;

        console.log("aaaaaaaa", cGroupSquence);
        
        await deleteC(cGroupSquence);

        await deleteComment(cGroupSquence);

        return res.status(200).json( {success: true } );

    } catch (err){
        console.log("reportCommentDelete 에러", err);
        return res.status(400).json( { success: false, err } );

    }

};

module.exports = { reportCommentDelete };