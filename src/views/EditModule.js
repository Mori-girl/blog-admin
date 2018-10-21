import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import EditForm from '../components/EditModule/EditForm';
import {EditActions} from './EditModuleRedux';

class EditModel extends Component{
    render(){
        let data=JSON.parse(this.props.params.data);
        let cKey,aKey;
        cKey=Number(data.cKey);
        if(data.hasOwnProperty("aKey")){
            aKey=Number(data.aKey);
        }
        return(
            <div>
                <EditForm
                {...this.props.form} 
                {...this.props.EditActions}
                cKey={cKey}
                aKey={typeof aKey=='undefined'?0:aKey}
                />
            </div>
        )
    }
}
export default connect(state=>({
    form:state.editModule.form,
   }),dispatch=>{
        return {
            EditActions:bindActionCreators(EditActions,dispatch),
        }
})(EditModel);