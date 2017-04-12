/** @flow */
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userAgent from "./userAgent";
import universalReducer from "../../universal/reducers";
import mobile from "./mobile";

const reducers = Object.assign({
  userAgent,
  mobile,
  routing: routerReducer,
}, universalReducer);

export default combineReducers(reducers);
