import React,{Component,PropTypes} from 'react';
import './Catalog.scss';
class Catalog extends Component{
	static propTypes = {
		title:PropTypes.string,
		link:PropTypes.string,
		push:PropTypes.func,
	};
	handleNavigate(id,e){
		e.preventDefault();
		this.props.push('/column/'+id);
	}
	render(){
		return (
			<div>
				<h1 className="title">
					<a href={`/column/${this.props.id}`} onClick={this.handleNavigate.bind(this,this.props.id)}>
						{this.props.name}
					</a>
				</h1>
				<span className="num">{this.props.num}</span>
			</div>
		)
	}
}
export default Catalog;