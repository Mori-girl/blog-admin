import {combineReducers} from 'redux';
import tableReducer from '../components/Column/TableRedux';

export default combineReducers({
    plist:tableReducer,
}); 
export * as tableActions from '../components/Column/TableRedux';