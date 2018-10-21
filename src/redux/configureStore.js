import {createStore,combineReducers,compose,applyMiddleware} from 'redux';
import {hashHistory} from 'react-router';

import {routerReducer,routerMiddleware} from 'react-router-redux';

import ThunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import DevTools from './DevTools';
let finalCreateStore;
if(process.env.NODE_ENV==='production'){
    finalCreateStore=compose(
        applyMiddleware(ThunkMiddleware,routerMiddleware(hashHistory))
    )(createStore);
}else{
    finalCreateStore=compose(
        applyMiddleware(ThunkMiddleware,routerMiddleware(hashHistory)),
        DevTools.instrument(),
    )(createStore);
}
const reducer=combineReducers(Object.assign({},rootReducer,{
    routing:routerReducer,
}));
export default function configureStore(initialState){
    const store=finalCreateStore(reducer,initialState);
    return store;
}