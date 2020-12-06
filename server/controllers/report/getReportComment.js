const { commentPagenation } = require('./helpers');



const getReportComment = async(req, res) => {

    const currentPage = req.params.page;
    
    const maxComment = 10;

    try {
        const data = await commentPagenation(currentPage, maxComment);

        console.log("data",data);
        
        // return res.status(200).json( {success: true , data, count : data.length });

    } catch(err) {
        
        console.log("getReportComment", err);

        return res.status(400).json({ success: false, err });
    }

};

module.exports = { getReportComment };
