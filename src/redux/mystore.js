import {applyMiddleware, combineReducers, createStore} from "redux";
import HomeReducer from "./HomeReducer"
import TasksAccountsReducer from "./TasksAccountsReducer"
import thunk from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import {save,load} from "redux-localstorage-simple"
import HelpReducer from "./HelpReducer";

/*
 Хранилище записывается в localstorage с помощью redux-localstorage-simple.
 Это решение имеет недостаток - все пишется в одну строку - json операции и синхронное сохранение вылезут на больших объемах
 */
let reducers = combineReducers({HomeReducer,TasksAccountsReducer, HelpReducer,form:formReducer});
let store = createStore(reducers,load({ states:["TasksAccountsReducer"]}),applyMiddleware(thunk,save({ states:["TasksAccountsReducer"]})));
export default store;