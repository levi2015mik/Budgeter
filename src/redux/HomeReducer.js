const ADD_NEW_ENTRY = "ADD_NEW_ENTRY";
const CHANGE_ENTER_FIELD = "CHANGE_ENTER_FIELD";
const DELETE = "DELETE";
const ACCEPT = "ACCEPT";
const CHANGE_SELECTION = "CHANGE_SELECTION";
const CHANGE_SELECTION_ALL = "CHANGE_SELECTION_ALL";
const REFRASH_ALL = "REFRASH_ALL";


const DEFAULT_STATE = {
    filteredEntries:[
        {name:"Торт с марципаном", id:0, accepted:true, selected: false},
        {name:"Укроп", id:1, accepted:false, selected: false},
        {name:"Горчица", id:2, accepted:false, selected: false},
        {name:"Набор юный террорист из супермаркета", id:3, accepted:false, selected: false},
        {name:"Шакшука с кофе", id:4, accepted:false, selected: false},
    ],
    nextTaskId:5,
    newEntryName:"",
    // TODO form of enter activateTime in Home component + action
    activateTaskTime:1568648224761
};
function HomeReducer(state = DEFAULT_STATE,action) {

    switch (action.type){

        case REFRASH_ALL:
            return { ...state,filteredEntries: action.tasks};
        case CHANGE_ENTER_FIELD:
            return { ...state,newEntryName: action.value };

        case ADD_NEW_ENTRY:
            let newEntry = action.newTask;
            let nextId = state.nextTaskId +=1;
            return {
                ...state,
                filteredEntries: [...state.filteredEntries, newEntry],
                newEntryName: "",
                nextTaskId: nextId
            };

        case DELETE:
            if(action.value){
                let entries = state.filteredEntries.filter((el) => el.id !== action.value);
                return { ...state,filteredEntries:entries}
            } else {
                let entries = state.filteredEntries.filter((el) => !el.selected);
                return { ...state,filteredEntries:entries}

            }

        case ACCEPT:
            if(action.value) {
                let entries = state.filteredEntries.map((el)=>{
                    if(el.id === action.value){
                        el.accepted = true;
                    }
                    return el;
                });
                return { ...state,filteredEntries:entries}
            } else {
                let entries = state.filteredEntries.map((el)=>{
                    let selected = el.selected;
                    el.selected = false;
                    if(selected) el.accepted = true;
                    return el;
                });
                return { ...state,filteredEntries:entries};
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
const addNewEntry = (newTask) => ({type:ADD_NEW_ENTRY,newTask:newTask});
const acceptElement = (id) =>({type:ACCEPT,value:id});
const acceptSelected = () => ({type:ACCEPT});
const deleteEntry = (id) => ({type:DELETE,value:id});
const deleteSelected =() => ({type:DELETE});
const changeElSelection = (id) => ({type:CHANGE_SELECTION,value:id});
const changeSelectedAll = (sign) => ({type:CHANGE_SELECTION_ALL,value:sign});
const refrashEntrys = (tasks) => ({type:REFRASH_ALL,tasks:tasks});


export {
    changeTextField,
    addNewEntry,
    acceptElement,
    acceptSelected,
    deleteEntry,
    deleteSelected,
    changeElSelection,
    changeSelectedAll,
    refrashEntrys
}
export default HomeReducer
