const {  } = require('../../models/Board');

const getPage = async(req, res) => {
    //////// PAGENATION ////////
    // keyword, currentPage, pageSize
    try {
        return res.status(200).json( { success: true } );
    } catch (err) {
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { getPage };