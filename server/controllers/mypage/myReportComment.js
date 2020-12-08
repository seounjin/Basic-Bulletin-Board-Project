const { commentPagenation } = require('../report/helpers');
const url = require('url');


const myReportComment = async(req, res) => {

    try {
        
        const queryData = url.parse(req.url, true).query;
        const fromId = queryData.id;
        const commentPage = queryData.page
        const maxComment = 10;

        const data = await commentPagenation(commentPage,maxComment,fromId);
        
        console.log("commentPagenation", data);

        return res.status(200).json( {success: true , data, count : data.length });


    } catch (err){
        console.log("myReportComment 에러", err);
        return res.status(400).json( { success: false, err } );

    }

};

module.exports = { myReportComment };