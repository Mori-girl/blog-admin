import React ,{Component,PropTypes} from 'react';
//import {createForm} from 'redux-form-utils';

class EditForm extends Component{
    static propTypes = {
		pending:PropTypes.bool,
        loading:PropTypes.bool,
		loadError:PropTypes.bool,
        uploadError:PropTypes.bool,
        cKey:PropTypes.number,
        aKey:PropTypes.number,
		handleUpload:PropTypes.func,
		title:PropTypes.string,
        tags:PropTypes.string,
        author:PropTypes.string,
        content:PropTypes.string,
        changeTitle:PropTypes.func,
        changeTags:PropTypes.func,
        changeAuthor:PropTypes.func,
        changeContent:PropTypes.func
	};
    isOk(e){
        this.props.handleUpload(this.props.cKey,this.props.aKey);
    }
    onCancel(e){

    }
    handleChangeTitle(e){
        this.props.changeTitle(e.target.value);
    }
    handleChangeTags(e){
        this.props.changeTags(e.target.value);
    }
    handleChangeAuthor(e){
        this.props.changeAuthor(e.target.value);
    }
    handleChangeContent(e){
        this.props.changeContent(e.target.value);
    }
    componentDidMount(){
        let aKey=this.props.aKey;
        if(aKey!==0){   //此为词条修改页面
            this.props.loadArticle(aKey);
        }

        let mainBox=document.querySelector('.mainBox');
        let _this=this;
        document.addEventListener("dragenter",function(e){
            mainBox.style.borderColor='gray';
        },false);
        document.addEventListener('dragleave',function(e){
            mainBox.style.borderColor="silver";
        },false);
        mainBox.addEventListener('dragenter',function(e){
            mainBox.style.borderColor="gray";
            mainBox.style.backgroundColor="white";
        },false);
        mainBox.addEventListener('dragleave',function(e){
            mainBox.style.backgroundColor="transparent";
        },false);
        mainBox.addEventListener('dragenter',function(e){
            e.preventDefault();
            e.stopPropagation();
        },false);
        mainBox.addEventListener('dragover',function(e){
            e.preventDefault();
            e.stopPropagation();
        },false);
        mainBox.addEventListener('drop',function(e){
            e.preventDefault();
            e.stopPropagation();
            _this.handleFiles(e.dataTransfer.files);
        },false);
    }
    insertAtCursor(myField,images){
        if(document.selection){    //IE support
            myField.focus();
            let sel=document.selection.createRange();
            sel.text=images;
            sel.select();
        }else if(myField.selectionStart||myField.selectionStart=='0'){
            //MOZILLA/NETSCAPE support
            let startPos=myField.selectionStart;
            let endPos=myField.selectionEnd;
            let beforeValue=myField.value.substring(0,startPos);
            let afterValue=myField.value.substring(endPos);
            myField.value=beforeValue+images+afterValue;
            myField.selectionStart=startPos+images.length;
            myField.selectionEnd=startPos+images.length;
            let event=document.createEvent('HTMLEvents');
            event.initEvent('input',true,false);
            myField.focus();
            myField.dispatchEvent(event);
           
        }else{
            myField.value+=images;
            myField.focus();
        }
    }
    handleFiles(files){
        let _this=this;
        let mainBox=document.querySelector('.mainBox');
        //let boundary='----rhliu123';
        let result={};
        let fileSize=0;
        const promises=new Array(files.length);
        for(let i=0,len=files.length;i<len;i++){
            let file=files[i];
            if(!file.type.match(/image*/)){
                continue;
            }
            let img=document.createElement("img");
            img.classList.add('obj');
            img.file=file;
            fileSize+=file.size;
            let reader=new FileReader();
            promises[i]=new Promise((resolve)=>{
                reader.onload=function(e){
                    img.src=e.target.result;
                    let fileData=e.target.result;
                    // body+='--'+boundary+'\r\n';
                    // body+="Content-Disposition: form-data; name=\""+mainBox.getAttribute('name')+"\"; filename=\""+file.name+"\"\r\n";
                    // body+="Content-Type: "+file.type+"\r\n\r\n";
                    //body+=fileData+"\r\n";
                    result["file"+i]=fileData
                    resolve();
                }
            });
            reader.readAsDataURL(file); 
        }
        Promise.all(promises).then(()=>{
            //body+='--'+boundary+'--\r\n';
            // var xhr=new XMLHttpRequest();
            // xhr.open('post','/admin/editModule/uploadImg',true);
            // xhr.upload.addEventListener("load", function(e){  
            //     alert('hhh');
            // }, false);  
            // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; boundary="+boundary);
            // if(!XMLHttpRequest.prototype.sendAsBinary){  
            //     XMLHttpRequest.prototype.sendAsBinary = function(datastr) {  
            //         function byteValue(x) {  
            //           return x.charCodeAt(0) & 0xff;  
            //         }  
            //         var ords = Array.prototype.map.call(datastr, byteValue);  
            //         var ui8a = new Uint8Array(ords);  
            //         this.send(ui8a.buffer);  
            //     };  
            // } 
            // xhr.sendAsBinary(body);  
            fetch('/admin/editModule/uploadImg',{
                method:'post',
                headers:{
                    'Content-Type':"application/json"
                },
                credentials:'same-origin',
                body:JSON.stringify(result)
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
                    let images=json.images;
                    _this.insertAtCursor(mainBox,images.toString());
                }else if(json.status===203){
                    throw new Error('can not upload the images!');
                } 
            })
            .catch(error=>{
                
            });
        });
    }
    render(){
        const {title,tags,author,content}=this.props;
        return (
            <div>
                <div className="form">
                    <div className="control-group">
                        <label>标题</label>
                        <input type="text" value={title} onChange={this.handleChangeTitle.bind(this)}/>
                    </div>
                    <div className="control-group">
                        <label>标签</label>
                        <input type="text" value={tags} onChange={this.handleChangeTags.bind(this)}/>
                    </div>
                    <div className="control-group">
                        <label>作者</label>
                        <input type="text" value={author} onChange={this.handleChangeAuthor.bind(this)}/>
                    </div>
                    <div className="control-group">
                        <label>正文</label>
                        <textarea rows="30" cols="40" name="mainBox" className="mainBox" value={content} onInput={this.handleChangeContent.bind(this)} onChange={this.handleChangeContent.bind(this)}>
                        </textarea >
                    </div>
                </div>
                <button onClick={this.isOk.bind(this)}>确认</button>
                <button onClick={this.onCancel.bind(this)}>取消</button>
            </div>
        );
    }
}
export default EditForm;