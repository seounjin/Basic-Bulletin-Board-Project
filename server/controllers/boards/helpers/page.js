const Board = require('../../../models/Board');

////////////게시판 요청 페이지 응답/////////////////
const page = async ({ keyword, currentPage, PageSize }) => {

    //// 페이지네이션 ////

    const board = await Board.find(keyword && {"title":  { $regex: keyword, $options: 'i' } })
                             .skip((currentPage - 1) * PageSize)
                             .limit(PageSize);
    return board;

};

module.exports = { page };