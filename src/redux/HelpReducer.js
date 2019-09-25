/*
#Вспомогательная ветвь state, хранящая данные об элементах интерфейса, не работающих через redux-form
- Календарь для фильтрации времени из Info
 */
const INFO_SET_TIME = "INFO_SET_TIME";

const DEFAULT_STATE = {
    InfoTime:{}
};

export default function HelpReducer(state = DEFAULT_STATE, action){
    switch (action.type){
        case INFO_SET_TIME:
            return {...state,InfoTime:action.time};
        default: return state;
    }
}

const setInfoTime = (time) =>({type:INFO_SET_TIME,time:time});

export {
    setInfoTime
}