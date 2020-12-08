const { deleteCommentId } = require('../report/helpers')

const myReportCommentCancel = async(req, res) => {

    try {
        const _id = req.params.number;


        await deleteCommentId(_id);

        return res.status(200).json( { success: true } );
    
    } catch (err) {
        console.log("myReportCommentCancel err",err);

        return res.status(400).json( { success: false, err } );
    }


};

module.exports = { myReportCommentCancel };