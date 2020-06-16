import axios from 'axios';
import { BOARD_REQUEST, BOARDFORM_REQUEST } from './types';

export function requestBoardList(currentPage) {

    const request = axios.post('/api/board/getPage', currentPage)
        .then(response => response.data)

    return {
        type: BOARD_REQUEST,
        payload: request
    }
}

export function requestBoardForm(postNum) {
    
    const request = axios.post('/api/board/postnum', postNum)
        .then(response => response.data)

    return {
        type: BOARDFORM_REQUEST,
        payload: request
    }
}