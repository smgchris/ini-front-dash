import{FETCH_ROLES_ERROR,FETCH_ROLES_SUCCESS,FETCH_ROLE_USERS_ERROR,FETCH_ROLE_USERS_SUCCESS,NEW_ROLE_SUCCESS, NEW_ROLE_ERROR} from './types';

const API_URL = "https://inibe.herokuapp.com/";
//-------------------Fetch roles----------------
export const fetchRolesSuccess = (roles) => {
    return {
        type: FETCH_ROLES_SUCCESS,
        payload: roles
    }
}

export const fetchRolesError = (data) => {
    return {
        type: FETCH_ROLES_ERROR,
        payload: data,
    }
}

var token = null
if (localStorage.getItem('tkn') !== null)
    token = localStorage.getItem('tkn').replace(/"/g, "")

export const fetchRoles = () => dispatch => {

    fetch(API_URL+'p-roles', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE,PUT',
            "Access-Control-Allow-Headers": "X-Requested-With,content-type"
        },
    })
        .then(res => res.json())
        .then(result => {
            if (result.CODE == 200)
                dispatch({
                    type: FETCH_ROLES_SUCCESS,
                    payload:result
                })
            else
                dispatch({
                    type: FETCH_ROLES_ERROR,
                    payload: result
                })
        }
        ).catch((error) => {
            const errorPayload = {};

            dispatch({
                type: FETCH_ROLES_ERROR,
                payload: errorPayload
            })

        });
};
//-------------------Fetch ----------------
export const fetchRoleUsersSuccess = (roleUsers) => {
    return {
        type: FETCH_ROLE_USERS_SUCCESS,
        payload: roleUsers
    }
}

export const fetchRoleUsersError = (data) => {
    return {
        type: FETCH_ROLE_USERS_ERROR,
        payload: data,
    }
}

export const fetchRoleUsers = (id) => dispatch => {
    fetch('https://lacorniche.rw/api/get_role_users.php?id='+id)
        .then(res => res.json())
        .then(roleUsers => {
            dispatch(fetchRoleUsersSuccess(roleUsers))

        }).catch((error) => {

            const errorPayload = {};

            errorPayload['message'] = error.response.data.message;
            errorPayload['status'] = error.response.status;

            dispatch(fetchRoleUsersError(errorPayload))

        })
};

// ----- create role
export const createRole=(roleData)=>dispatch=>{
    fetch('link.com',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(roleData)
    })
    .then(res=>res.json)
    .then(role=>dispatch({
        type:NEW_ROLE_SUCCESS,
        payload:role
    }));
};

// ----- update role
export const updateRole=(roleData)=>dispatch=>{
    fetch('link.com',{
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(roleData)
    })
    .then(res=>res.json)
    .then(role=>dispatch({
        type:NEW_ROLE_SUCCESS,
        payload:role
    }));
};