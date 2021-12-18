import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rooReducer from "../reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rooReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
