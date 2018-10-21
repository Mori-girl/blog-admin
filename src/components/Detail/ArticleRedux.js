const initialState={
        loading:true,
        error:false,
        aData:{}
};
const LOAD_ARTICLE='LOAD_ARTICLE';
const LOAD_ARTICLE_SUCCESS='LOAD_ARTICLE_SUCCESS';
const LOAD_ARTICLE_ERROR='LOAD_ARTICLE_ERROR';
export function loadArticle(aKey){
    return (dispatch,getState)=>{
        return dispatch(fetchArticle(aKey));
    }
}
function fetchArticle(aKey){
    return function(dispatch){
        let id=aKey;
        return fetch('/admin/detail/article?id='+id,{
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
            dispatch(handleError(error));
        });
    }
}
function receiveArticle(json){
    return {
        type:LOAD_ARTICLE_SUCCESS,
        payload:json
    }
}
function handleError(err){
    return {
        type:LOAD_ARTICLE_ERROR
    }
}
function article(state=initialState,action){
    switch(action.type){
        case LOAD_ARTICLE:{
            return{
                ...state,
                loading:true,
                error:false
            }
        }
        case LOAD_ARTICLE_SUCCESS:{
            return{
                ...state,
                loading:false,
                error:false,
                aData:action.payload.aData
            }
        }
        case LOAD_ARTICLE_ERROR:{
            return{
                ...state,
                loading:false,
                error:true
            }
        }
        default:
            return state;
    }
}
export default article;