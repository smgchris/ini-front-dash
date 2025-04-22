import { log_out } from "./auth";

//-----------------------------------
const API_URL = "https://inibe-cbc386fa9895.herokuapp.com/";

var token = null;
if (localStorage.getItem("tkn") !== null)
  token = localStorage.getItem("tkn").replace(/"/g, "");

export const saveQuestion = (question) => {
  return {
    type: "saveQuestion",
    payload: question,
  };
};
export const resetState = () => {
  return {
    type: "reset",
  };
};
export const setCurrentTestId = (id) => {
  return {
    type: "testId",
    payload: id,
  };
};

//send
export const createTest = (testDto) => (dispatch) => {
  return fetch(API_URL+"add-test", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Headers": "X-Requested-With,content-type",
    },
    body: JSON.stringify(testDto),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.CODE == 200) {
        // dispatch({
        //   type: "sendMoneySuccess",
        //   payload: result,
        // });
        return result;
      } else if (result.status == "403") {
        log_out();
      } else return result;
    })
    .catch((error) => {
      console.log(error)
      //log_out();
    });
};

export const saveToDbQuestion = (questionDto) => (dispatch) => {
  return fetch(API_URL+"save-question", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Headers": "X-Requested-With,content-type",
    },
    body: JSON.stringify(questionDto),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.CODE == 200) {
        return result;
      } else if (result.status == "403") {
        log_out();
      } else return result;
    })
    .catch((error) => {
      console.log(error)
      //log_out();
    });
};

export const fetchTests = () => (dispatch) => {
  fetch(API_URL+"get-tests", {
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
          type: "fetchTestsSuccess",
          payload: result,
        });
      else if (result.status == "403") {
        log_out();
      } else
        dispatch({
          type: "fetchTestsFailed",
          payload: result,
        });
    })
    .catch((error) => {
      const errorPayload = {};

      dispatch({
        type: "fetchTestsFailed",
        payload: error,
      });
    });
};

export const fetchQuestions = (questionDto) => (dispatch) => {
  fetch(API_URL+"get-questions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Headers": "X-Requested-With,content-type",
    },
    body: JSON.stringify(questionDto),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.CODE == 200)
        dispatch({
          type: "fetchQuestionsSuccess",
          payload: result,
        });
      else if (result.status == "403") {
        log_out();
      } else
        dispatch({
          type: "fetchQuestionsFailed",
          payload: result,
        });
    })
    .catch((error) => {
      const errorPayload = {};

      dispatch({
        type: "fetchQuestionsFailed",
        payload: error,
      });
    });
};

export const saveImage = (file) => (dispatch) => {
  let formData = new FormData();
  formData.append("file", file, file.name);
  return fetch(API_URL+"upload-image", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Headers": "X-Requested-With,content-type",
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.CODE == 200) {
        return result;
      } else if (result.status == "403") {
        log_out();
      } else return result;
    })
    .catch((error) => {
      console.log(error)
      //log_out();
    });
};

export const publishTest = (id) => (dispatch) => {
  let formData = new FormData();
  formData.append("id", id);
  return fetch(API_URL+"publish-test", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Headers": "X-Requested-With,content-type",
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.CODE == 200) {
        return result;
      } else if (result.status == "403") {
        log_out();
      } else return result;
    })
    .catch((error) => {
      console.log(error)
      //log_out();
    });
};
