import axios from 'axios';
import { MYPAGE_ACTIVITY } from './types';

export function requestMypageList(body) { //body : 현재페이지, 포스트?댓글?

    const request = axios.post('/api/mypage/getActivity', body)
        .then(response => response.data)

    return {
        type: MYPAGE_ACTIVITY,
        payload: request
    }
}
