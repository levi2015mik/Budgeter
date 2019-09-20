import {applyMiddleware, combineReducers, createStore} from "redux";
import HomeReducer from "./HomeReducer"
import TasksAccountsReducer from "./TasksAccountsReducer"
import thunk from "redux-thunk"
import {reducer as formReducer} from "redux-form"

let reducers = combineReducers({HomeReducer,TasksAccountsReducer,form:formReducer});
let store = createStore(reducers,applyMiddleware(thunk));
export default store;