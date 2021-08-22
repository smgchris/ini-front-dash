import { CREATING_USER, DELETE_USER_ERROR, DELETE_USER_SUCCESS, FETCH_USERS_ERROR, FETCH_USERS_SUCCESS, NEW_USER_ERROR, NEW_USER_SUCCESS, SELECTED_USER } from '../actions/types';

const initiateState = {

    items: [],
    dashUsers: [],
    totalSize: 0,
    fetchedUsers: [],
    fetchedSet: new Set(),
    item: {},
    errors: null,
    error: '',
    status: '',
    loading: false
}


export default function (state = initiateState, action) {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            return {

                ...state,
                items: action.payload.OBJECT,
                totalSize: action.payload.SIZE,
                fetchedUsers: state.fetchedSet.has(action.page) ? state.fetchedUsers : state.fetchedUsers.concat(action.payload.OBJECT),
                fetchedSet: state.fetchedSet.add(action.page),
                errors: null,
                addingItem: "not-adding"
            }
        case FETCH_USERS_ERROR:
            return {
                ...state, errors: action.payload,
                addingItem: "not-adding"
            }
        case 'fetchUserSuccess':
            return {
                ...state,
                item: action.payload.OBJECT
            }
        case 'fetchUserError':
            return {
                ...state
            }
        case 'fetchDashUsersSuccess':
            return {
                ...state,
                dashUsers: action.payload.OBJECT
            }
        case 'fetchDashUsersFailed':
            return {
                ...state,
                error: action.payload.DESCRIPTION
            }

        case 'addingUser':
            return {
                ...state,
                addingItem: 'adding'
            }
        case 'notAddingUser':
            return {
                ...state,
                addingItem: 'not-adding'
            }

        case NEW_USER_SUCCESS:

            return {
                ...state,
                dashUsers: state.dashUsers.map(user => (user.id === action.payload.OBJECT.id) ? action.payload.OBJECT : user),
                item: action.payload.OBJECT,
                errors: null,
                status: 'success',
                loading: false,
                addingItem: "added",

            }
        case 'newCustomerSuccess':

            return {
                ...state,
                fetchedUsers: state.fetchedUsers.map(user => (user.userId === action.payload.OBJECT.userId) ? action.payload.OBJECT : user),
                item: action.payload.OBJECT,
                errors: null,
                status: 'success',
                loading: false,
                addingItem: "added",

            }
        case NEW_USER_ERROR:
            return {
                ...state, errors: action.payload,
                addingItem: "not-added"
            }




        case SELECTED_USER:
            return {
                item: action.payload
            }


        case DELETE_USER_SUCCESS:
            const filteredUsers = state.items.filter(item => item.user_id != action.payload);
            return { ...state, items: filteredUsers };
        case DELETE_USER_ERROR:
            return { ...state, errors: action.payload }

        default:
            return state;
    }
}