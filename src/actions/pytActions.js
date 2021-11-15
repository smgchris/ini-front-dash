import { log_out } from "./auth";
const API_URL = "https://inibe.herokuapp.com/";
//-------------------Fetch transactions----------------

var token = null;
if (localStorage.getItem("tkn") !== null)
  token = localStorage.getItem("tkn").replace(/"/g, "");

export const fetchReceivedTrxs = () => (dispatch) => {
  fetch(API_URL+"get-received-transactions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Headers": "X-Requested-With,content-type",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.CODE == 200)
        dispatch({
          type: "fetchReceivedTrxsSuccess",
          payload: result,
        });
      else if (result.status == "403") {
        log_out();
      } else
        dispatch({
          type: "fetchTrxsFailed",
          payload: result,
        });
    })
    .catch((error) => {
      const errorPayload = {};

      dispatch({
        type: "fetchTrxsFailed",
        payload: error,
      });
    });
};

//-------------------Fetch sent transactions----------------

export const fetchSentTrxs = () => (dispatch) => {
  fetch(API_URL+"get-sent-transactions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Headers": "X-Requested-With,content-type",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.CODE == 200)
        dispatch({
          type: "fetchSentTrxsSuccess",
          payload: result,
        });
      else if (result.status == "403") {
        log_out();
      } else
        dispatch({
          type: "fetchTrxsFailed",
          payload: result,
        });
    })
    .catch((error) => {
      const errorPayload = {};

      dispatch({
        type: "fetchTrxsFailed",
        payload: error,
      });
    });
};

//send
export const sendMoney = (sendDto) => (dispatch) => {
  return fetch(API_URL+"send-money", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Headers": "X-Requested-With,content-type",
    },
    body: JSON.stringify(sendDto),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.CODE == 200) {
        // dispatch({
        //   type: "sendMoneySuccess",
        //   payload: result,
        // });
        return result
      } else if (result.status == "403") {
        log_out();
      } else
        return result
    })
    .catch((error) => {
      dispatch({
        type: "sendMoneyFailed",
        payload: error,
      });
    });
};

//check status
export const checkTrxStatus = (ref) => (dispatch) => {
  return fetch(API_URL+"get-trx-status", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Headers": "X-Requested-With,content-type",
    },
    body: JSON.stringify(ref),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.CODE == 200) {
        return result;
      } else if (result.status == "403") {
        log_out();
      } else
        dispatch({
          type: "statusFailed",
          payload: result,
        });
    })
    .catch((error) => {
      dispatch({
        type: "statusFailed",
        payload: error,
      });
    });
};

//refresh balance
export const refreshBalance = () => (dispatch) => {
  fetch(API_URL+"refresh-balance", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Headers": "X-Requested-With,content-type",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.CODE == 200) {
        dispatch({
          type: "refreshBalSuccess",
          payload: result,
        });
      } else if (result.status == "403") {
        log_out();
      } else
        dispatch({
          type: "refreshBalFailed",
          payload: result,
        });
    })
    .catch((error) => {});
};
//-------------------------------
export const addingItem = () => {
  return {
    type: "addingItem",
  };
};
export const notAddingItem = () => {
  return {
    type: "notAddingItem",
  };
};
