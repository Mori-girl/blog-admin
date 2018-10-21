import React,{Component,PropTypes} from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
import {Link} from "react-router";
class Nav extends Component{
	static contextTypes={
		username:PropTypes.string
	}
	static propTypes={
		rotation:PropTypes.number,
		color:PropTypes.string
	}
	static defaultProps={
		rotation:0,
		color:'pink'
	}
	componentDidMount(){
		const context=findDOMNode(this).getContext('2d');
		this.paint(context);
	}
	componentDidUpdate(){
		const context=findDOMNode(this).getContext('2d');
		context.clearRect(0,0,200,200);
		this.paint(context);
	}
	paint(context){
		context.save();
		context.rotate(this.props.rotation);
		context.strokeStyle=this.props.color;
		context.fillStyle = "red";
        context.font = "60px '微软雅黑'";
		context.beginPath();
        context.arc(100,75,50,0,2*Math.PI);
        context.strokeText(this.context.username,50,100);
        context.stroke();
		context.restore();
	}
	render(){
		return(
		   <canvas width={200} height={200}></canvas>
			)
	}
}
export default Nav;