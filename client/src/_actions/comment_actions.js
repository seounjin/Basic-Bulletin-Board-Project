import axios from 'axios';
import { COMMENT_REQUEST, COMMENT_LATESTCOMMENT } from './types';

// 등록순으로 댓글 요청
export function getComment(commentData) {

    const request = axios.post('/api/comment/sequence/1',commentData)
        .then(response => response.data)

    return {
        type: COMMENT_REQUEST,
        payload: request
    }
}

// 최신순으로 댓글 요청
export function getLatestComment(commentData) {

    const request = axios.post('/api/comment/sequence/2',commentData)
        .then(response => response.data)

    return {
        type: COMMENT_LATESTCOMMENT,
        payload: request
    }
}
