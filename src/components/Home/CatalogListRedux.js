const initialState={
        loading:true,
        error:false,
        catalogList:[] 
};

const LOAD_CATALOG='LOAD_CATALOG';
const LOAD_CATALOG_SUCCESS='LOAD_CATALOG_SUCCESS';
const LOAD_CATALOG_ERROR='LOAD_CATALOG_ERROR';

export function loadCatalogs(){
    return (dispatch,getState)=>{
        return dispatch(fetchCatalogs());
    }
}
function fetchCatalogs(){
    return function(dispatch){
        return fetch('/admin/home/catalogs',{
            method:'get',
            credentials:'same-origin'
        })
        .then(response=>{
            if(response.ok){
                return response.json()
            }else{
                throw new Error('something went wrong!')
            }
        })
        .then(json=>{
            dispatch(receiveCatalogs(json));
        })
        .catch(error=>{
            dispatch(handleError(error));
        });
    }
}
function receiveCatalogs(json){
    return {
        type:LOAD_CATALOG_SUCCESS,
        payload:json
    }
}
function handleError(err){
    return {
        type:LOAD_CATALOG_ERROR
    }
}
function categoryist(state=initialState,action){
    switch(action.type){
        case LOAD_CATALOG:{
            return{
                    ...state,
                    loading:true,
                    error:false
            };
        }
        case LOAD_CATALOG_SUCCESS:{
             return{
                    ...state,
                    loading:false,
                    error:false,
                    catalogList:action.payload.catalogList
            };
        } 
         case LOAD_CATALOG_ERROR:{
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
export default categoryist;