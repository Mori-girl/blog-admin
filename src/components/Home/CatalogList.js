import React,{PropTypes,Component} from 'react';
import Catalog from './Catalog';
import {Button,Modal} from 'antd';
import AddCatalog from './AddCatalog';
class CatalogList extends Component{
	static propTypes = {
		loading:PropTypes.bool,
		error:PropTypes.bool,
		loadCatalogs:PropTypes.func,
		catalogList:PropTypes.arrayOf(PropTypes.object),
		push:PropTypes.func
	};
	componentDidMount(){
		this.props.loadCatalogs();
	}
	render(){
		const {loading,error,catalogList}=this.props;
		let catalogs=[];
		if(catalogList.length){
			for(let catalog of catalogList){
				catalogs.push(catalog.name);
			}
		}
		if(error){
			return <p className="message">Oops,something is wrong.</p>
		}
		if(loading){
			return <p className="message">Loading</p>
		}
		if(catalogList.length){
			return (
				   <div>
				     {

				     	catalogList.map(item=>(
								<Catalog {...item} key={item.id} push={this.props.push}/>		  
						))
					 }
					 <AddCatalog catalogs={catalogs}/>
		   		  </div>
		    );	
		}
		return (
			<div>
				<p className="message">Oops,It is empty.</p>
				<AddCatalog catalogs={catalogs}/>
			</div>
			);
	}
}
export default CatalogList;