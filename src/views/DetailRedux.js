import {combineReducers} from 'redux';
import articleReducer from '../components/Detail/ArticleRedux';
const detailReducer=combineReducers({
    alist:articleReducer,
})
export default detailReducer;


export * as articleAction from '../components/Detail/ArticleRedux';