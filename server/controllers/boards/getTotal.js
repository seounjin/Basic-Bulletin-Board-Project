const { totalPost } = require('./helpers/post');

const getTotal = async(req, res) => { // 글쓴이, 날짜, 글제목, 글내용

    try {
        const Total = await totalPost();
        return res.status(200).json( { success: true, total: Total} );
    } catch (err) {
        return res.status(400).json( { success: false, err } );
    }
};

module.exports = { getTotal };