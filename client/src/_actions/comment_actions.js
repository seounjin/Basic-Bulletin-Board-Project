import axios from 'axios';
import { COMMENT_REQUEST, COMMENT_LATESTCOMMENT } from './types';


export function getComment(commentData) {

    const request = axios.post('/api/comment/getCommentPage',commentData)
        .then(response => response.data)

    return {
        type: COMMENT_REQUEST,
        payload: request
    }
}

export function getLatestComment(commentData) {

    const request = axios.post('/api/comment/getLatestComment',commentData)
        .then(response => response.data)

    return {
        type: COMMENT_LATESTCOMMENT,
        payload: request
    }
}
