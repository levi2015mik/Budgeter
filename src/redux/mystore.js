import {applyMiddleware, combineReducers, createStore} from "redux";
import HomeReducer from "./HomeReducer"
import TasksAccoountsReducer from "./TasksAccountsReducer"
import thunk from "redux-thunk"

let reducers = combineReducers({HomeReducer,TasksAccoountsReducer});
let store = createStore(reducers,applyMiddleware(thunk));
export default store;