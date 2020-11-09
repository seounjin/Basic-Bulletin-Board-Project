import {
    COMMENT_REQUEST, COMMENT_SAVE, COMMENT_LATESTCOMMENT
} from '../_actions/types';

export default function (state = {}, action) {

    switch(action.type) {
        case COMMENT_REQUEST:
            return { ...state, commentData: action.payload }
        
        case COMMENT_LATESTCOMMENT:
            return { ...state, latestCommentData: action.payload }
        
        default:
            return state;
    }
}