const { page } = require('./helpers/page');

const getPage = async(req, res) => {
    //////// PAGENATION ////////
    // keyword, currentPage, pageSize
    try {
        return res.status(200).json( { success: true } );
    } catch (err) {
        console.log("getPage", err);
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { getPage };