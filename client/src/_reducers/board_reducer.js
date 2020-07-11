import {
    BOARD_REQUEST, BOARDFORM_REQUEST, KEYWORD_REQUEST
} from '../_actions/types';

export default function (state = {}, action) {

    switch(action.type) {
        case BOARD_REQUEST:
            return { ...state, boardData: action.payload }

        case BOARDFORM_REQUEST:
            return { ...state, boardContent: action.payload }

        case KEYWORD_REQUEST:
            return { ...state, boardKeywordData: action.payload }

        default:
            return state;
    }
}