
const ADD_TASK = "ADD_TASK";
const DELETE = "DELETE";

const DEFAULT_STATE = {
    tasks:[
        {name:"Торт с марципаном", id:0, accepted:false, activated:1568581200000},
        {name:"Укроп", id:1, accepted:false, activated:1568581200640},
        {name:"Горчица", id:2, accepted:false, activated:1568667600000},
        {name:"Набор юный террорист из супермаркета", id:3, accepted:false, activated:1568667600500},
        {name:"Шакшука с кофе", id:4, accepted:false, activated:1568667600720}
    ],
    nextTaskId: 5
};

function TasksAccountsReducer(state = DEFAULT_STATE, action) {
    switch (action.type){
        case ADD_TASK:
            let tasksArr = [...state.tasks,action.newTask];
            return {...state,tasks:tasksArr,nextTaskId:tasksArr.length};
        case DELETE:
            return {...state,tasks:state.tasks.filter((el)=> el.id !== action.id)};

        default: return state;
    }
}

// actions
const addNewTask = (newTask) => ({
    type: ADD_TASK,
    newTask:newTask
});

const delTask = (id) => ({
    type:DELETE,
    id:id
});
export {
    addNewTask,
    delTask
}
export default TasksAccountsReducer;