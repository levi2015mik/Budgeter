import * as HomeReducer from "./HomeReducer"
import * as TasksCcountsReducer from "./Tasks&ccountsReducer"
/**
 * Этот фацйл содержит функции, манипулирующие данными store
 * - Создание ногого таска и его запись в две ветки store.
 * - Фильтрация тасков по времени и закидывание в HomeReducer
 * - Удаление ненужного таска из обеих веток
 **/

function addTask() {
    return (dispatch, getState) =>{
        dispatch(HomeReducer.addNewEntry())
    }
}

function tasksFilter(){
    return (dispatch, getState) =>{}
}

function delTask(id) {
    return (dispatch, getState) =>{
        dispatch(HomeReducer.deleteEntry(id))
    }
}

export default {
    addTask,
    tasksFilter,
    delTask
}