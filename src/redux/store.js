import {combineReducers, createStore} from "redux";
import HomeReducer from "./HomeReducer"
import TasksAccoountsReducer from "./Tasks&AccountsReducer"

let reducers = combineReducers({HomeReducer,TasksAccoountsReducer});
let store = createStore(reducers);
export default store;