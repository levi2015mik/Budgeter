
const ADD_TASK = "ADD_TASK";
const DEL_TASK = "DEL_TASK";

const DEFAULT_STATE = {
    tasks:[
        {name:"Торт с марципаном", id:0, accepted:false, activated:122324354},
        {name:"Укроп", id:1, accepted:false, activated:122324354},
        {name:"Горчица", id:2, accepted:false, activated:122324354},
        {name:"Набор юный террорист из супермаркета", id:3, accepted:false, activated:122324354},
        {name:"Шакшука с кофе", id:4, accepted:false, activated:122324354}
    ],
    nextTaskId: 5
};

function TasksCcountsReducer(state = DEFAULT_STATE, action) {
    switch (action.type){
        case ADD_TASK:
            let tasksArr = [...state.tasks,action.newTask];
            return {...state,tasks:tasksArr,nextTaskId:tasksArr.length};
        case DEL_TASK:
            return {...state,tasks:state.tasks.filter((el)=> el.id !== action.id)};
        default: return state;
    }
}

export default TasksCcountsReducer;