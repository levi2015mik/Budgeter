const ADD_NEW_ENTRY = "ADD_NEW_ENTRY";
const CHANGE_ENTER_FIELD = "CHANGE_ENTER_FIELD";
const FILTER_OUTPUT = "FILTER_OUTPUT";
const DELETE_ENTRY = "DELETE_ENTRY";
const ACCEPT = "ACCEPT";


const DEFAULT_STATE = {
    entries:[
        {name:"Торт с марципаном", unique:0},
        {name:"Укроп", unique:1},
        {name:"Горчица", unique:2},
        {name:"Набор юный террорист из супермаркета", unique:3},
    ],
    filteredEntries:[
        {name:"Торт с марципаном", unique:0},
        {name:"Укроп", unique:1},
        {name:"Горчица", unique:2},
        {name:"Набор юный террорист из супермаркета", unique:3},
        {name:"Шакшука с кофе", unique:4},
    ],
    newEntryName:"",
    filter:{}
};
function HomeReducer(state = DEFAULT_STATE,action) {

    switch (action.type){
        case CHANGE_ENTER_FIELD:
            return { ...state,newEntryName: action.value };
        case ADD_NEW_ENTRY:
            return state;
        case FILTER_OUTPUT:
            return state;
        case DELETE_ENTRY:
            return state;
        case ACCEPT:
            return state;
        default: return state;
    }
}
export {ADD_NEW_ENTRY,
    CHANGE_ENTER_FIELD,
    FILTER_OUTPUT,
    DELETE_ENTRY,
    ACCEPT}
export default HomeReducer
