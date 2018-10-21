import React,{PropTypes,Component} from 'react';
import {Button,Input,Modal} from 'antd';
class AddCatalog extends Component {
  static propTypes = {
    catalogs:PropTypes.arrayOf(PropTypes.string)
  };
  state = {
    loading: false,
    visible: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    let newCata=document.getElementById("newCata");
    let cModal=newCata.parentNode;
    let tips=document.getElementsByClassName('tips')[0];
    if(tips!==undefined){
      tips.parentNode.removeChild(tips);
    }
    let catagoryName=newCata.value;
    if(catagoryName==""){
      return;
    }
    let catalogs=this.props.catalogs;
    let prompt=document.createElement("p");
    prompt.className='tips';
    let text;
    if(catalogs!==[]){
      for(let cname of catalogs){
        if(cname==catagoryName){
          text=document.createTextNode("此分类已存在");
          prompt.appendChild(text);
          cModal.insertBefore(prompt,newCata);
          return;
        }
      }
    }
    this.setState({ loading: true });
    fetch('/admin/home/addCatalog',{
        method:'post',
        credentials:'same-origin',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({"cName":catagoryName})
    })
    .then(response=>{
        if(response.ok){
            return response.json()
        }else{
            throw new Error('something went wrong!')
        }
    })
    .then(json=>{
        text=document.createTextNode("创建成功");
        prompt.appendChild(text);
        cModal.insertBefore(prompt,newCata);
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 1000);
    })
    .catch(error=>{
        text=document.createTextNode("创建失败");
        prompt.appendChild(text);
        cModal.insertBefore(prompt,newCata);
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 1000);
    });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add a catagory
        </Button>
        <Modal
          visible={visible}
          title="Enter the name"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <Input placeholder="Enter a new catagory" id="newCata"/>
        </Modal>
      </div>
    );
  }
}
export default AddCatalog;