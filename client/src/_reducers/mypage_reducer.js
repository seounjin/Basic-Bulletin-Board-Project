import {
    MYPAGE_ACTIVITY
} from '../_actions/types';

export default function (state = {}, action) {

    switch(action.type) {
        case MYPAGE_ACTIVITY:
            return { ...state, activityData: action.payload }

        default:
            return state;
    }
}