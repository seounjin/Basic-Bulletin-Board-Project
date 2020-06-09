import {
    COMMENT_REQUEST, COMMENT_SAVE
} from '../_actions/types';

export default function (state = {}, action) {

    switch(action.type) {
        case COMMENT_REQUEST:
            return { ...state, commentData: action.payload }

        default:
            return state;
    }
}