const ADD_NEW_ENTRY = "ADD_NEW_ENTRY";
const CHANGE_ENTER_FIELD = "CHANGE_ENTER_FIELD";
const FILTER_OUTPUT = "FILTER_OUTPUT";
const DELETE = "DELETE";
const ACCEPT = "ACCEPT";
const CHANGE_SELECTION = "CHANGE_SELECTION";
const CHANGE_SELECTION_ALL = "CHANGE_SELECTION_ALL";


const DEFAULT_STATE = {
    entries:[
        {name:"Торт с марципаном", id:0, accepted:true, selected: false},
        {name:"Укроп", id:1, accepted:false, selected: false},
        {name:"Горчица", id:2, accepted:false, selected: false},
        {name:"Набор юный террорист из супермаркета", id:3, accepted:false, selected: false},
        {name:"Шакшука с кофе", id:4, accepted:false, selected: false},
    ],
    filteredEntries:[
        {name:"Торт с марципаном", id:0, accepted:true, selected: false},
        {name:"Укроп", id:1, accepted:false, selected: false},
        {name:"Горчица", id:2, accepted:false, selected: false},
        {name:"Набор юный террорист из супермаркета", id:3, accepted:false, selected: false},
        {name:"Шакшука с кофе", id:4, accepted:false, selected: false},
    ],
    newEntryName:"",
    filter:{},
};
function HomeReducer(state = DEFAULT_STATE,action) {

    switch (action.type){

        case CHANGE_ENTER_FIELD:
            return { ...state,newEntryName: action.value };

        case ADD_NEW_ENTRY:
            let maxId = state.entries.length;
            let newEntry = {name:state.newEntryName,id: maxId};
            let stateCp = {
                ...state,
                entries:[...state.entries,newEntry],
                newEntryName:""
            };
            stateCp.maxId ++;
            stateCp.filteredEntries = [...state.entries,newEntry];
            return stateCp;

        case FILTER_OUTPUT:
            return state;

        case DELETE:
            if(action.value){
                let entries = state.entries.filter((el) => el.id !== action.value);
                return { ...state,entries:entries,filteredEntries:entries}
            } else {
                let entries = state.entries.filter((el) => !el.selected);
                return { ...state,entries:entries,filteredEntries:entries}

            }

        case ACCEPT:
            if(action.value) {
                let entries = state.entries.map((el)=>{
                    if(el.id === action.value){
                        el.accepted = true;
                    }
                    return el;
                });
                return { ...state,entries:entries,filteredEntries:entries}
            } else {
                let entries = state.entries.map((el)=>{
                    let selected = el.selected;
                    el.selected = false;
                    if(selected) el.accepted = true;
                    return el;
                });
                return { ...state,entries:entries,filteredEntries:entries};
            }


        case CHANGE_SELECTION: {
            let entries = state.entries.map((el) => {
                if (el.id === action.value) el.selected = !el.selected;
                return el;
            });
            return {...state, filteredEntries: entries};
        }

        case CHANGE_SELECTION_ALL: {
            let entries = state.entries.map((el) => {
                if(!el.accepted)
                el.selected = action.value;
                return el;
            });
            return {...state, filteredEntries: entries};
        }
        default: return state;
    }
}
export {
    ADD_NEW_ENTRY,
    CHANGE_ENTER_FIELD,
    FILTER_OUTPUT,
    DELETE,
    ACCEPT,
    CHANGE_SELECTION,
    CHANGE_SELECTION_ALL
}
export default HomeReducer
