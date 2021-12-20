import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import product from "./product"
import company from "./company"

export default combineReducers({
  alert,
  auth,
  product,
  company
});
