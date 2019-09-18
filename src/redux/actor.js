import * as HomeReducer from "./HomeReducer"
import * as TasksCcountsReducer from "./Tasks&ccountsReducer"
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
        let nextTaskId = state.HomeReducer.nextTaskId;
        let newEntryName = state.HomeReducer.newEntryName;
        let newTask = {
            name:newEntryName,
            id:nextTaskId,
            accepted:false,
            activateTaskTime: activateTaskTime
        };
        dispatch(TasksCcountsReducer.addNewTask(newTask));
        dispatch(tasksFilter());
    }
}

// Фильтрация данных, выводимых пользователю
function tasksFilter(conditions){
    return (dispatch, getState) =>{
        let insertedData = getState().TasksAccoountsReducer.tasks;
        //TODO Add filter with date
        insertedData = insertedData.map((el) => ({...el,selected:false}));
        dispatch(HomeReducer.refrashEntrys(insertedData))
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

export default {
    addTask,
    tasksFilter,
    delTask
}