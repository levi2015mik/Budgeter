import {combineReducers, createStore} from "redux";
import HomeReducer from "./HomeReducer"

let reducers = combineReducers({HomeReducer});
let store = createStore(reducers);
export default store;