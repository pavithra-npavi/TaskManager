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

const initState = {
  isLoading: false,
  error: false,
  tasks: []
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    // get tasks

    case GET_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      };

    case GET_TASK_SUCCESS:
      return {
        ...state,
        tasks: payload,
        isLoading: false
      };

    case GET_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    // add todos

    case ADD_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      };

    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, payload],
        isLoading: false
      };

    case ADD_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    // edit todos

    case EDIT_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      };

    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case EDIT_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    default:
      return state;
  }
};
