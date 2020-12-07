
const MyReportPostCancel = async(req, res) => {

    try {

        const rNum = req.params.number;

        return res.status(200).json( { success: true } );
    
    } catch (err) {
        

        return res.status(400).json( { success: false, err } );
    }


};

module.exports = { MyReportPostCancel };