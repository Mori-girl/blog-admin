import {combineReducers} from 'redux';
import editArticleReducer from '../components/EditModule/EditFormRedux';

export default combineReducers({
    form:editArticleReducer,
}); 
export * as EditActions from '../components/EditModule/EditFormRedux';