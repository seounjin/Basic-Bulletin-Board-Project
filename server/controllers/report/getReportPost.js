const { postPagenation } = require('./helpers');



const getReportPost = async(req, res) => {

    
    try {

        const currentPage = req.params.page;

        const maxComment = 10;

        const data = await postPagenation(currentPage, maxComment);


        return res.status(200).json( {success: true , data, count : data.length });

    } catch(err) {
        
        console.log("getReportPost", err);

        return res.status(400).json({ success: false, err });
    }

};

module.exports = { getReportPost };
