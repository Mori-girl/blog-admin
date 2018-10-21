import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Article from '../components/Detail/Article';
import {articleAction} from './DetailRedux';
import {push} from 'react-router-redux';
class Detail extends Component{
	render(){
		return (
			<div>
				<h1>Detail</h1>
				<Article
				{...this.props.alist}
				{...this.props.articleAction}
				push={this.props.push}
				aKey={Number(this.props.params.id)}
				/>
			</div>
			);
	}
}
export default connect(state=>{
	return {
		alist:state.detail.alist,
	};
},dispatch=>{
	return {
		articleAction:bindActionCreators(articleAction,dispatch),
		push:bindActionCreators(push,dispatch),
	}
})(Detail);