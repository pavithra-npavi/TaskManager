import axios from "axios";
import {
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  EDIT_TASK_REQUEST,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAILURE
} from "./actionType";

// get todos

export const get_task_request = () => {
  return {
    type: GET_TASK_REQUEST
  };
};

export const get_task_success = (payload) => {
  return {
    type: GET_TASK_SUCCESS,
    payload
  };
};

export const get_task_failure = () => {
  return {
    type: GET_TASK_FAILURE
  };
};

export const get_tasks = (payload) => (dispatch) => {
  dispatch(get_task_request());
  axios
    .get("https://json-server-pavithra.herokuapp.com/todo")
    .then((res) => {
      dispatch(get_task_success(res.data));
    })
    .catch((err) => {
      dispatch(get_task_failure());
    });
};

// add todos

export const add_task_request = () => {
  return {
    type: ADD_TASK_REQUEST
  };
};

export const add_task_success = (payload) => {
  return {
    type: ADD_TASK_SUCCESS,
    payload
  };
};

export const add_task_failure = () => {
  return {
    type: ADD_TASK_FAILURE
  };
};

export const add_tasks = (payload) => (dispatch) => {
  console.log("hi");
  dispatch(add_task_request());
  axios
    .post("https://json-server-pavithra.herokuapp.com/tasks", payload)
    .then((res) => {
      dispatch(add_task_success(res.data));
      console.log(res.data);
    })
    .catch((err) => {
      dispatch(add_task_failure());
    });
};

// edit todos

export const edit_task_request = () => {
  return {
    type: EDIT_TASK_REQUEST
  };
};

export const edit_task_success = (payload) => {
  return {
    type: EDIT_TASK_SUCCESS
  };
};

export const edit_task_failure = () => {
  return {
    type: EDIT_TASK_FAILURE
  };
};

export const edit_tasks = ({ id, title }) => (dispatch) => {
  dispatch(edit_task_request());
  return axios
    .patch(`https://json-server-pavithra.herokuapp.com/todo/${id}`, { title })
    .then((res) => {
      dispatch(edit_task_success());
      return { success: true };
    })
    .catch((err) => {
      dispatch(edit_task_failure());
    });
};
