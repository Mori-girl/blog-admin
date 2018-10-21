import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CatalogList from '../components/Home/CatalogList';
import {catalogListAction} from './HomeRedux';
import {push} from 'react-router-redux';
class Home extends Component{
	render(){
		return (
			<div>
				<h1>Home</h1>
				<CatalogList
				{...this.props.cList}
				{...this.props.catalogListAction}
				push={this.props.push}
				/>
				
			</div>
			);
	}
}
export default connect(state=>{
	return {
		cList:state.home.clist,
	};
},dispatch=>{
	return {
		catalogListAction:bindActionCreators(catalogListAction,dispatch),
		push:bindActionCreators(push,dispatch),
	}
})(Home);