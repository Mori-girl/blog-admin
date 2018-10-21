import React from 'react';
import {Router,Route,IndexRoute} from 'react-router';
import Frame from '../layouts/Frame';
import Home from '../views/Home';
import Column from '../views/Column';
import Detail from '../views/Detail';
import EditModule from '../views/EditModule';
const routes=(hashHistory)=>{
	return (
	<Router history={hashHistory}>
		<Route path="/" component={Frame}>
			<IndexRoute component={Home}/>
		</Route>
		<Route path='/column/:id' component={Column}/>
		<Route path='/detail/:id' component={Detail}/>
		<Route path='/edit/:data' component={EditModule}/>
	</Router>
	);
}	
export default routes;