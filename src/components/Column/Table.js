import React,{Component,PropTypes} from 'react';
import {Table,Button,Modal} from 'antd';
import timeParser from '../../utils/time_parser'
const columns=[{
    title:'标题',
    dataIndex:'title',
    key:'title',
    render(text,record,index){
        return <a className="title" target='_blank' onClick={this.loadDetail.bind(this,record)}>{record.title}</a>
    }
},{
    title:'发布日期',
    dataIndex:'createdAt',
    key:'createdAt'
},{
    title:'操作1',
    render(text,record){
        return <a className="op-btn" onClick={this.handleModify.bind(this,record)}>修改</a>
    }
},{
    title:'操作2',
    render(text,record){
        return <a className="op-btn" onClick={this.handleDelete.bind(this,record)}>删除</a>
    }
}];

class PreviewTable extends Component{
    static propTypes = {
		loading:PropTypes.bool,
		error:PropTypes.bool,
		loadPreviews:PropTypes.func,
		previewData:PropTypes.object,
		changeQuery:PropTypes.func,
        search:PropTypes.func,
       // query:PropTypes.string,
        cKey:PropTypes.number,   //文章类别
        push:PropTypes.func,
	};
    handleAddArticle(e){
        let data={"cKey":this.props.cKey};
        this.props.push('/edit/'+JSON.stringify(data));
    }
    loadDetail(record,e){
        e.preventDefault();
        this.props.push('/detail/'+record.id);
    }
    handleDelete(record){
        let _this=this;
        Modal.confirm({
            title:'提示',
            content:'确定要删除该文章吗？',
            onOk:function(){
                _this.deleteArticle(record).then(()=>{
                    Modal.success({
                        title:'提示',
                        content:'删除成功',
                    });
                },(err)=>{
                    Modal.error({
                        title:'提示',
                        content:'删除失败'
                    });
                })
            }
        })
    }
    handleModify(record){
        let data={"cKey":this.props.cKey,"aKey":record.id};
        this.props.push('/edit/'+JSON.stringify(data));
    }
    deleteArticle(record){
        return new Promise((resolve,reject)=>{
            let id=record.id;
            fetch('/admin/column/article?id='+id,{
                method:'delete',
                credentials:'same-origin'
            })
            .then(response=>{
                if(response.ok){
                    return response.json();
                }else{
                    throw new Error('something went wrong!')
                }
            })
            .then(json=>{
                if(json.status===200){
                    resolve();
                }else if(json.status===203){
                    throw new Error('can not find this article!');
                } 
            })
            .catch(error=>{
                reject();
            });
        });
    }
    parseTime(millSecond){
        const date=timeParser(millSecond);
        return date.year+'.'+date.month+'.'+date.day;
    }
    componentDidMount(){
		this.props.loadPreviews(this.props.cKey);
	}
    render(){
        const {loading,error,previewData}=this.props;  
        if(error){
            return <p className="message">Oops,something is wrong.</p>;
        }
        if(loading){
            return <p className="message">Loading</p>;
        }
        const {cName,previewList}=previewData;
        for(let i=0,len=previewList.length;i<len;i++){
            previewList[i].createdAt=this.parseTime(previewList[i].createdAt);
        }
        return (       
            <div>  
                {/* <div className="search">
                    <input
                        type="text"
                        placeholder="请输入关键字"
                        value={this.props.query}
                        onChange={this.props.changeQuery}
                    />
                    <button onClick={this.props.search}>搜索</button>
                </div>*/}
                <div className="header">
                    <h3>{cName}</h3>
                </div>
                <Table dataSource={previewList} rowKey='title' columns={columns.map(c=>c.render?({
                    ...c,
                    render:c.render.bind(this),
                    }):c)} />   
                <Button size="large" type="primary" onClick={this.handleAddArticle.bind(this)}>Add</Button>             
            </div>
        );
    }
}
export default PreviewTable;