import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PreviewTable from '../components/Column/Table';
import {tableActions} from './ColumnRedux';
import {push} from 'react-router-redux';

class Column extends Component{
    render(){
        return(
            <div>
                <PreviewTable
                {...this.props.plist} 
                {...this.props.tableActions}
                push={this.props.push}
                cKey={Number(this.props.params.id)}
                />
            </div>
        )
    }
}
export default connect(state=>{
   return {
    plist:state.column.plist
   }
   },dispatch=>{
        return {
            tableActions:bindActionCreators(tableActions,dispatch),
            push:bindActionCreators(push,dispatch),
        }
})(Column);