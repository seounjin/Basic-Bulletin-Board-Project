const { totalPost } = require('./helpers/post');

const getTotal = async(req, res) => {

    try {
        const Total = await totalPost();
        return res.status(200).json( { success: true, total: Total} );
    } catch (err) {
        console.log("getTotal ", err)
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { getTotal };