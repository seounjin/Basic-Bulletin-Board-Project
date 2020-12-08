const { postPagenation } = require('../report/helpers');
const url = require('url');

const myReportPost = async(req, res) => {

    try {
        const queryData = url.parse(req.url, true).query;
        const fromId = queryData.id;
        const currentPage = queryData.page;        
        
        
        const data = await postPagenation(currentPage, 10, fromId);
        
        console.log("data",data);

        return res.status(200).json( {success: true , data, count : data.length });


    } catch (err){
        console.log("myReportPost 에러", err);
        return res.status(400).json( { success: false, err } );

    }

};

module.exports = { myReportPost };