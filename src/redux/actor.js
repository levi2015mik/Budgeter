import * as HomeReducer from "./HomeReducer"
import * as TasksCcountsReducer from "./TasksAccountsReducer"
import moment from "moment";
/**
 * Этот фацйл содержит функции, манипулирующие данными store
 * - Создание ногого таска и его запись в две ветки store.
 * - Фильтрация тасков по времени и закидывание в HomeReducer
 * - Удаление ненужного таска из обеих веток
 **/

/**
 * Добавление новой таски. Создает объект и вносит его в хранилище.
 * @returns {Function}
 */
function addTask() {
    return (dispatch, getState) =>{
        let state = getState();
        let activateTaskTime = state.HomeReducer.activateTaskTime;
        let nextTaskId = state.TasksAccountsReducer.tasks.length;
        let newEntryName = state.HomeReducer.newEntryName;
        let newTask = {
            name:newEntryName,
            id:nextTaskId,
            accepted:false,
            activateTaskTime: activateTaskTime
        };
        dispatch(TasksCcountsReducer.addNewTask(newTask));
        dispatch(HomeReducer.addNewEntry());
        dispatch(tasksFilter());
    }
}

// Фильтрация данных, выводимых пользователю
function tasksFilter(conditions){
    if(typeof conditions ===  "undefined"){
        let now = moment();
        conditions = {
            year: now.year(),
            month:now.month(),
            date:now.date(),
            selector:"W"
        };
    }

    let filterTime = moment({
        year:conditions.year,
        month:conditions.month,
        date:conditions.date
    });

    return (dispatch, getState) =>{
        let insertedData = getState().TasksAccountsReducer.tasks;

        insertedData = insertedData.filter(el =>{
            let time = moment(el.activated);
            return time.isSame(filterTime,conditions.selector)
        });

        insertedData = insertedData.map((el) => ({...el,selected:false}));

        dispatch(HomeReducer.refreshEntries(insertedData));
        dispatch(HomeReducer.changeFilter(conditions));
    }
}

/**
 * Синхронное удаление данных из хранилища и внешнего вида
 * @param id?
 * @returns {Function}
 */
function delTask(id) {
    return (dispatch, getState) =>{
        function delForId(id) {
            dispatch(HomeReducer.deleteEntry(id));
            dispatch(TasksCcountsReducer.delTask(id));
        }

        if(id && typeof(id) === "number") delForId(id);
        else {
            getState().HomeReducer.filteredEntries.forEach((el)=>{
                if(el.selected)delForId(el.id);
            })
        }
    }
}

function preAcceptElement(id) {
    return (dispatch)=>{
        dispatch(TasksCcountsReducer.addNewAccount([id],Date.now()));
    }
}

function preAcceptSelected() {
    return (dispatch, getState)=>{
        let entries = getState().HomeReducer.filteredEntries;
        let selected = entries.filter((el)=> el.selected).map(el=>el.id);
        dispatch(TasksCcountsReducer.addNewAccount(selected,Date.now()));
    }
}

export default {
    addTask,
    tasksFilter,
    delTask,
    preAcceptElement: preAcceptElement,
    preAcceptSelected: preAcceptSelected

}