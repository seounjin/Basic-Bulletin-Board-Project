const { page } = require('./helpers/page');
const { totalPost } = require('./helpers/post');


const getPage = async(req, res) => {
    //////// PAGENATION ////////
    // keyword, currentPage, pageSize
    try {

        const boardData = req.body;
        const { keyword, currentPage, PageSize } = boardData;

        const total = await totalPost();

        const boardList = await page(boardData);
                
        if (!keyword) {
            return res.status(200).json( { success: true, boardList, totalPage: total } );
        } else {
            return res.status(200).json( { success: true, boardList, totalPage: total, keyWord:keyword } );
        }

        
    } catch (err) {
        console.log("getPage", err);
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { getPage };