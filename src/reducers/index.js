import ThemeOptions from './ThemeOptions';
import userReducer from './userReducer'
import { combineReducers } from 'redux';
import deptReducer from './deptReducer';
import roleReducer from './roleReducer';
import supplierReducer from './supplierReducer';
import productReducer from './productReducer';
import prodCategoryReducer from './prodCategoryReducer'
import stockProductReducer from './stockProductReducer';
import requestReducer from './requestReducer';
import kitchenReducer from './kitchenReducers';
import auth from "./auth";
import message from "./message";
import stockLogReducer from './stockLogReducer';
import { LOGOUT } from '../actions/types'
import messageReducer from './messageReducer';
import postReducer from './postReducer';
import pytReducer from './pytReducer';
import studyReducer from './studyReducer';

 const appReducer=combineReducers({
    ThemeOptions,
    users:userReducer,
    
    depts:deptReducer,
    roles:roleReducer,
    suppliers:supplierReducer,
    products: productReducer,
    prodCategories:prodCategoryReducer,
    stockProducts:stockProductReducer,
    requests:requestReducer,
    kitchen:kitchenReducer,
    auth:auth,
    message,

    stockLog:stockLogReducer,

    messages:messageReducer,
    posts:postReducer,

    pyts:pytReducer,
    study:studyReducer
});

// reset the state of a redux store
const rootReducer = (state, action) => {
	if (action.type === LOGOUT) {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;