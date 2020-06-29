import { combineReducers } from 'redux';
import user from './user_reducer';
import board from './board_reducer';
import comment from './comment_reducer';
import mypage from './mypage_reducer';


const rootReducer = combineReducers({
    user, board, comment, mypage
})

export default rootReducer;