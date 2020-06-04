import {
    BOARD_REQUEST, BOARDFORM_REQUEST
} from '../_actions/types';

export default function (state = {}, action) {

    switch(action.type) {
        case BOARD_REQUEST:
            return { ...state, success: action.payload }

            case BOARDFORM_REQUEST:
                return { ...state, success: action.payload }

        default:
            return state;
    }
}