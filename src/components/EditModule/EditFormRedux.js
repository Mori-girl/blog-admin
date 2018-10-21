const initialState={
        pending:false,
        loading:true,
        loadError:false,
        uploadError:false,
        title:'',
        tags:'',
        author:'',
        content:'',
};
const LOAD_ARTICLE='LOAD_ARTICLE';
const LOAD_ARTICLE_SUCCESS='LOAD_ARTICLE_SUCCESS';
const LOAD_ARTICLE_ERROR='LOAD_ARTICLE_ERROR';
const UPLOAD_ARTICLE='UPLOAD_ARTICLE';
const UPLOAD_ARTICLE_ERROR='UPLOAD_ARTICLE_ERROR';
const UPLOAD_ARTICLE_SUCCESS='UPLOAD_ARTICLE_SUCCESS';
const CHANGE_TITLE='CHANGE_TITLE';
const CHANGE_TAGS='CHANGE_TAGS';
const CHANGE_AUTHOR='CHANGE_AUTHOR';
const CHANGE_CONTENT='CHANGE_CONTENT';

export function loadArticle(aKey){
    return (dispatch,getState)=>{
        return dispatch(fetchArticle(aKey));
    }
}
function fetchArticle(aKey){
    return function(dispatch){
        let id=aKey;
        return fetch('/admin/edit/article?id='+id,{
            method:'get',
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
                dispatch(receiveArticle(json));
            }else if(json.status===404){
                throw new Error('can not find this article!');
            } 
        })
        .catch(error=>{
            dispatch(handleLoadError(error));
        });
    }
}
function receiveArticle(json){
    return {
        type:LOAD_ARTICLE_SUCCESS,
        payload:json
    }
}
function handleLoadError(err){
    return {
        type:LOAD_ARTICLE_ERROR
    }
}
export function changeTitle(title){
    return{
        type:CHANGE_TITLE,
        payload:{
            title:title
        }
    }
}
export function changeTags(tags){
    return{
        type:CHANGE_TAGS,
        payload:{
            tags:tags
        }
    }
}
export function changeAuthor(author){
    return{
        type:CHANGE_AUTHOR,
        payload:{
            author:author
        }
    }
}
export function changeContent(content){
    return{
        type:CHANGE_CONTENT,
        payload:{
            content:content
        }
    }
    console.log(getState().editModule.form);
}
export function handleUpload(cKey,aKey){
    return (dispatch,getState)=>{
        return dispatch(uploadArticle(cKey,aKey));
    }
}
function uploadArticle(cKey,aKey){
    return (dispatch,getState)=>{
        let {title,tags,author,content}=getState().editModule.form;
        let createdAt,updatedAt;
        let article;
        let catalogId=cKey;
        if(aKey===0){
            createdAt=updatedAt=new Date().getTime();
            article={
                "title":title,
                "tags":tags,
                "author":author,
                "content":content,
                "catalogId":catalogId,
                "createdAt":createdAt,
                "updatedAt":updatedAt
            }
        }else{          //此为修改词条页面
            updatedAt=new Date().getTime();       
            article={
                "title":title,
                "tags":tags,
                "author":author,
                "content":content,
                "catalogId":catalogId,
                "updatedAt":updatedAt
            }
        }
        return fetch('/admin/editModule/upload',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'same-origin',
            body:JSON.stringify({"aKey":aKey,"article":article})
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
                dispatch(handleApply());
            }else if(json.status===203){
                dispatch(handleError());
            } 
        })
        .catch(error=>{
            dispatch(handleUploadError())
        });
    }
}

function handleApply(){
     return {
            type:UPLOAD_ARTICLE_SUCCESS
    }
}
function handleUploadError(){
    return {
            type:UPLOAD_ARTICLE_ERROR
    }
}
function editArticle(state=initialState,action){
    switch(action.type){
        case LOAD_ARTICLE:{
            return{
                ...state,
                loading:true,
                loadError:false
            }
        }
        case LOAD_ARTICLE_SUCCESS:{
            let aData=action.payload.aData;
            let {title,tags,author,content}=aData;
            return{
                ...state,
                loading:false,
                loadError:false,
                title:title,
                tags:tags,
                author:author,
                content:content
            }
        }
        case LOAD_ARTICLE_ERROR:{
            return{
                ...state,
                loading:false,
                loadError:true
            }
        }
        case UPLOAD_ARTICLE:{
             return{
                ...state,
                pending:true,
                uploadError:false,
            };
        } 
         case UPLOAD_ARTICLE_SUCCESS:{
            return{
                ...state,
                pending:false,
                uploadError:false     
            };
        }
         case UPLOAD_ARTICLE_ERROR:{
            return{
                ...state,
                pending:false,
                uploadError:true     
            };
        }
        case CHANGE_TITLE:{
            return{
                ...state,
                title:action.payload.title
            }
            
        }
        case CHANGE_TAGS:{
            return{
                ...state,
                tags:action.payload.tags
            }
           
        }
        case CHANGE_AUTHOR:{
            return{
                ...state,
                author:action.payload.author
            }
            
        }
        case CHANGE_CONTENT:{
            return{
                ...state,
                content:action.payload.content
            }
            
        }
        default:
            return state;
    }
}
export default editArticle;