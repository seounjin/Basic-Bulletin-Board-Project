import axios from 'axios';
import { COMMENT_REQUEST } from './types';


export function getComment(postNum) {

    const request = axios.post('/api/comment/getComment',postNum)
        .then(response => response.data)

    return {
        type: COMMENT_REQUEST,
        payload: request
    }
}
