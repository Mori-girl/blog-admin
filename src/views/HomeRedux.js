import {combineReducers} from 'redux';
import catalogReducer from '../components/Home/CatalogListRedux';
const homeReducer=combineReducers({
    clist:catalogReducer,
})
export default homeReducer;


export * as catalogListAction from '../components/Home/CatalogListRedux';