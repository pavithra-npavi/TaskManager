import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { reducer as taskReducer } from "./TaskRedux/reducer";

const rootReducer = combineReducers({
  tasks: taskReducer
});

let composeEnhancer = compose;

if (process.env.NODE_ENV !== "production") {
  composeEnhancer =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
}

const enhancer = composeEnhancer(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

export default store;
