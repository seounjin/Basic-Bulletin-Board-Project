import axios from 'axios';
import { BOARD_REQUEST, BOARDFORM_REQUEST, KEYWORD_REQUEST } from './types';

// 게시글 목록 요청
export function requestBoardList(currentPage) {

    const request = axios.post('/api/board/page', currentPage)
        .then(response => response.data)

    return {
        type: BOARD_REQUEST,
        payload: request
    }
}

// export function requestKeywordList(body) {

//     const request = axios.post('/api/board/getKeywordPage', body)
//         .then(response => response.data)

//     return {
//         type: KEYWORD_REQUEST,
//         payload: request
//     }
// }

///api/users/removeFromCart?id=${productId}

// 게시글 요청
export function requestBoardForm(postNum) {
    const request = axios.get(`/api/board/post/${postNum}`)
        .then(response => response.data)

    return {
        type: BOARDFORM_REQUEST,
        payload: request
    }
}
