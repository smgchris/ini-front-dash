import { FETCH_ROLES_ERROR,FETCH_ROLES_SUCCESS,FETCH_ROLE_USERS_ERROR,FETCH_ROLE_USERS_SUCCESS,NEW_ROLE_SUCCESS,NEW_ROLE_ERROR } from '../actions/types';

const initiateState={

    items:[],
    item:{},
    roleUsers:[]
}

export default function(state=initiateState,action){
    switch(action.type){
        case FETCH_ROLES_SUCCESS:
            return{
                
               ...state,
               items:action.payload.OBJECT ,
               errors:null
            }
        case FETCH_ROLES_ERROR:
            return{
                ...state,errors:action.payload
            }
        
        case FETCH_ROLE_USERS_SUCCESS:
                return{
                    
                   ...state,
                   roleUsers: action.payload ,
                   errors:null
                }
        case FETCH_ROLE_USERS_ERROR:
                return{
                    ...state,errors:action.payload
                }
    


        case NEW_ROLE_SUCCESS:
            return{
                ...state,
               item:action.payload,
               errors:null 
            }
        case NEW_ROLE_ERROR:
            return{
                ...state,errors:action.payload
            }
            
        default:
            return state;
    }
}