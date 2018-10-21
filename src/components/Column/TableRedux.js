const initialState={
        loading:true,
        error:false,
        previewData:{},
       // query:''
};

const LOAD_PREVIEW='LOAD_PREVIEW';
const LOAD_PREVIEW_SUCCESS='LOAD_PREVIEW_SUCCESS';
const LOAD_PREVIEW_ERROR='LOAD_PREVIEW_ERROR';
//const CHANGE_QUERY='CHANGE_QUERY';
export function loadPreviews(cKey){
    return (dispatch,getState)=>{
        return dispatch(fetchPreviews(cKey));
    }
}
// export function changeQuery(e){
//     return {
//         type:'CHANGE_QUERY',
//         payload:{
//             query:e.target.value.trim()
//         }
//     }
// }
// export function search(){
//     return (dispatch,getState)=>{
//         const {query}=getState().column.plist;
//         return dispatch(loadPreviews(query));
//     }
// }

function fetchPreviews(cKey){
    return function(dispatch){
        let id=cKey||1;
        return fetch('/admin/column/previews?id='+id,{
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
            dispatch(receivePreviews(json));
        })
        .catch(error=>{
            dispatch(handleError(error));
        });
    }
}
function receivePreviews(json){
    return {
        type:LOAD_PREVIEW_SUCCESS,
        payload:json
    }
}
function handleError(err){
    return {
        type:LOAD_PREVIEW_ERROR
    }
}
function previewList(state=initialState,action){
    switch(action.type){
        // case CHANGE_QUERY:{
        //     return{
        //         ...state,
        //         query:action.payload.query
        //     }
        // }
        case LOAD_PREVIEW:{
            return{
                    ...state,
                    loading:true,
                    error:false
            };
        }
        case LOAD_PREVIEW_SUCCESS:{
             return{
                    ...state,
                    loading:false,
                    error:false,
                    previewData:action.payload.previewTable   
            };
        } 
         case LOAD_PREVIEW_ERROR:{
            return{
                    ...state,
                    loading:false,
                    error:true     
            };
        }
        default:
            return state;
    }
}
export default previewList;