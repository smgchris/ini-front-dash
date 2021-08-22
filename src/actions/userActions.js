import { log_out } from './auth';
import {
    DELETE_USER_SUCCESS, DELETE_USER_ERROR
    , FETCH_USERS_SUCCESS, FETCH_USERS_ERROR, NEW_USER_SUCCESS, NEW_USER_ERROR, CREATING_USER
} from './types';
2
//-------------------Fetch users----------------
export const fetchUsersSuccess = (users, page) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
        page: page
    }
}

export const fetchUsersError = (data) => {
    return {
        type: FETCH_USERS_ERROR,
        payload: data,
    }
}

var token = null
if (localStorage.getItem('tkn') !== null)
    token = localStorage.getItem('tkn').replace(/"/g, "")


export const fetchUsers = (paging) => dispatch => {
    fetch('http://localhost:8080/f-users', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE,PUT',
            "Access-Control-Allow-Headers": "X-Requested-With,content-type"
        },
        body: JSON.stringify({
            "page": paging ? paging.page : 0,
            "size": paging ? paging.size : 100
        })
    })
        .then(res => res.json())
        .then(users => {
            let page = paging ? paging.page : 0
            if (users.CODE == 200)
                dispatch(fetchUsersSuccess(users, page))
            else if (users.status == "403") {
                log_out()
            }

        }).catch((error) => {

            const errorPayload = {};

            dispatch(fetchUsersError(errorPayload))

        })
};

export const fetchUser = (id) => dispatch => {
    fetch('http://localhost:8080/f-user', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE,PUT',
            "Access-Control-Allow-Headers": "X-Requested-With,content-type"
        },
        body: id
        
    })
        .then(res => res.json())
        .then(user => {

            if (user.CODE == 200)
                dispatch({
                    type: 'fetchUserSuccess',
                    payload: user
                })
            else if (user.status == "403") {
                log_out()
            }

        }).catch((error) => {

            const errorPayload = {};

            dispatch({
                type: 'fetchUserError',
                payload: user
            })
        })
};

export const fetchDashUsers = () => dispatch => {

    fetch('http://localhost:8080/p-users', {
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
        .then(users => {
            if (users.CODE == 200)
                dispatch({
                    type: 'fetchDashUsersSuccess',
                    payload: users
                })
            else if (users.status == "403") {
                log_out()
            }
            else
                dispatch({
                    type: 'fetchDashUsersFailed',
                    payload: users
                })
        }
        ).catch((error) => {
            const errorPayload = {};

            dispatch({
                type: 'fetchDashUsersFailed',
                payload: errorPayload
            })

        });
};

//------------ Create user ---------------------
export const creatingUser = () => {
    return {
        type: CREATING_USER,

    }
}
export const createUser = (user) => dispatch => {
    console.log(user)

    fetch('http://localhost:8080/a-user', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE,PUT',
            "Access-Control-Allow-Headers": "X-Requested-With,content-type"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(result => {
            if (result.CODE == "200")
                dispatch({
                    type: NEW_USER_SUCCESS,
                    payload: result
                })
            else if (result.status == "403") {
                log_out()
            }
            else
                dispatch({
                    type: NEW_USER_ERROR,
                    payload: result
                })
        }
        ).catch((error) => {
            const errorPayload = {};

            dispatch({
                type: NEW_USER_ERROR,
                payload: error
            })

        });
};
//------------ Update user ---------------------

export const updateUser = user => dispatch => {

    fetch('http://localhost:8080/u-user', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE,PUT',
            "Access-Control-Allow-Headers": "X-Requested-With,content-type"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(result => {
            if (result.CODE == 200)
                dispatch({
                    type: NEW_USER_SUCCESS,
                    payload: result
                })
            else if (result.status == "403") {
                log_out()
            }
            else
                dispatch({
                    type: NEW_USER_ERROR,
                    payload: result
                })
        }
        ).catch((error) => {
            const errorPayload = {};

            dispatch({
                type: NEW_USER_ERROR,
                payload: error
            })

        });
};

// Update customer
export const updateCustomer = user => dispatch => {

    fetch('http://localhost:8080/u-customer', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE,PUT',
            "Access-Control-Allow-Headers": "X-Requested-With,content-type"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(result => {
            if (result.CODE === 200)
                dispatch({
                    type: 'newCustomerSuccess',
                    payload: result
                })
            else if (result.status == "403") {
                log_out()
            }
            else
                dispatch({
                    type: NEW_USER_ERROR,
                    payload: result
                })
        }
        ).catch((error) => {
            const errorPayload = {};
            console.log("reached")

            dispatch({
                type: NEW_USER_ERROR,
                payload: error
            })

        });
};

//------------------ DELETE----------------------

export const deleteUserSuccess = (id) => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: {
            id: id,
        }
    }
}

export const deleteUserError = (data) => {
    return {
        type: DELETE_USER_ERROR,
        payload: data,
    }
}


export const deleteUser = (id) => dispatch => {

    fetch('https://lacorniche.rw/api/delete_user?id=' + id, {

        method: 'DELETE',

    }).then(() =>
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: id
        })
    ).catch((error) => {
        const errorPayload = {};

        errorPayload['message'] = error.response.data.message;
        errorPayload['status'] = error.response.status;

        dispatch({
            type: DELETE_USER_ERROR,
            payload: errorPayload
        })

    });
}

//--------
export const addingItem = () => {
    return {
        type: 'addingUser',
    }
}
export const notAddingItem = () => {
    return {
        type: 'notAddingUser',
    }
}
