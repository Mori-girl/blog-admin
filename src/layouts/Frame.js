import React,{Component,PropTypes} from 'react';
import Nav from "./Nav";
class Frame extends Component{
  static childContextTypes={
		username:PropTypes.string
	}
	constructor(props){
		super(props);
		this.state={
			username:''
		};
	}
	componentDidMount(){
		let username=document.getElementById('root').getAttribute('data-user');
		this.setState({
			username:username
		});
	}
	getChildContext(){
		return {username:this.state.username} ;
	}
	render(){
		return(
			<div className="frame">
			  <section  className="header">
			  	<Nav/> 
		      </section>
	      	  <section className="container">
	      	    {this.props.children}
		  	  </section>
			</div>
			)
	}
}
export default Frame;