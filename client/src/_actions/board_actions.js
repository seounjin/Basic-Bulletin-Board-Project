import axios from 'axios';
import { BOARD_REQUEST } from './types';

export function requestBoardList() {

    const request = axios.get('/api/board/openpage')
        .then(response => response.data)

    return {
        type: BOARD_REQUEST,
        payload: request
    }
}