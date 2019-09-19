const ADD_NEW_ENTRY = "ADD_NEW_ENTRY";
const CHANGE_ENTER_FIELD = "CHANGE_ENTER_FIELD";
const DELETE = "DELETE";
const CHANGE_SELECTION = "CHANGE_SELECTION";
const CHANGE_SELECTION_ALL = "CHANGE_SELECTION_ALL";
const REFRESH_ALL = "REFRESH_ALL";
const CHANGE_TASK_ACTIVATE_TIME = "CHANGE_TASK_ACTIVATE_TIME";
const CHANGE_FILTER = "CHANGE_FILTER";

const DEFAULT_STATE = {
    filteredEntries:[],
    newEntryName:"",
    activateTaskTime:1568648224761,
    filter:{}
};
function HomeReducer(state = DEFAULT_STATE,action) {

    switch (action.type){

        case REFRESH_ALL:
            return { ...state,filteredEntries: action.tasks};
        case CHANGE_ENTER_FIELD:
            return { ...state,newEntryName: action.value };
        case CHANGE_TASK_ACTIVATE_TIME:
            return { ...state, activateTaskTime: action.time};
        case CHANGE_FILTER:
            return { ...state, filter:action.filter};
        case ADD_NEW_ENTRY:
            return {
                ...state,
                newEntryName: "",
            };
        case DELETE:
            if(action.value){
                let entries = state.filteredEntries.filter((el) => el.id !== action.value);
                return { ...state,filteredEntries:entries}
            } else {
                let entries = state.filteredEntries.filter((el) => !el.selected);
                return { ...state,filteredEntries:entries}

            }

        case CHANGE_SELECTION: {
            let entries = state.filteredEntries.map((el) => {
                if (el.id === action.value) el.selected = !el.selected;
                return el;
            });
            return {...state, filteredEntries: entries};
        }

        case CHANGE_SELECTION_ALL: {
            let entries = state.filteredEntries.map((el) => {
                if(!el.accepted)
                el.selected = action.value;
                return el;
            });
            return {...state, filteredEntries: entries};
        }
        default: return state;
    }
}

// Action creators
const changeTextField =(value)=>({type:CHANGE_ENTER_FIELD,value: value});
const changeActivateTime = (time) =>({type:CHANGE_TASK_ACTIVATE_TIME,time:time});
const addNewEntry = (newTask) => ({type:ADD_NEW_ENTRY,newTask:newTask});
const deleteEntry = (id) => ({type:DELETE,value:id});
const changeElSelection = (id) => ({type:CHANGE_SELECTION,value:id});
const changeSelectedAll = (sign) => ({type:CHANGE_SELECTION_ALL,value:sign});
const refreshEntries = (tasks) => ({type:REFRESH_ALL,tasks:tasks});
const changeFilter = (filter) => ({type:CHANGE_FILTER,filter:filter});


export {
    changeTextField,
    addNewEntry,
    changeActivateTime,
    deleteEntry,
    changeElSelection,
    changeSelectedAll,
    refreshEntries,
    changeFilter
}
export default HomeReducer
