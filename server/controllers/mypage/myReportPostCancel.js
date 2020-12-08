const { delectPostId } = require('../report/helpers')

const myReportPostCancel = async(req, res) => {

    try {
        const _id = req.params.number;
        

        await delectPostId(_id); 

        return res.status(200).json( { success: true } );
    
    } catch (err) {
        

        return res.status(400).json( { success: false, err } );
    }


};

module.exports = { myReportPostCancel };