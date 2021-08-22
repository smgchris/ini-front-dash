import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_MESSAGE,LOGOUT
} from "./types";

import AuthService from "../DemoPages/Login/services/auth.services";

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { jwt: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const log_out  = () => {

  localStorage.removeItem("tkn");
  window.location.replace('#/login-page/login')
};


