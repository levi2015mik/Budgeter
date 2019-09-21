const ADD_TASK = "ADD_TASK";
const DELETE = "DELETE";
const ADD_EMPTY_ACCOUNT = "ADD_EMPTY_ACCOUNT";
const SUBMIT_ACCOUNT = "SUBMIT_ACCOUNT";

const DEFAULT_STATE = {
    tasks:[
        {name:"Торт с марципаном", id:0, accepted:false, activated:1568581200000},
        {name:"Укроп", id:1, accepted:false, activated:1568581200640},
        {name:"Горчица", id:2, accepted:false, activated:1568667600000},
        {name:"Набор юный террорист из супермаркета", id:3, accepted:false, activated:1568667600500},
        {name:"Шакшука с кофе", id:4, accepted:false, activated:1568667600720}
    ],
    accounts:[],
    newAccountId:0,
    nextTaskId: 5
};

function TasksAccountsReducer(state = DEFAULT_STATE, action) {
    switch (action.type){
        case ADD_TASK:
            let tasksArr = [...state.tasks,action.newTask];
            return {...state,tasks:tasksArr,nextTaskId:tasksArr.length};
        case DELETE:
            return {...state,tasks:state.tasks.filter((el)=> el.id !== action.id)};

        case ADD_EMPTY_ACCOUNT:
            /*
                Сложный элемент, требует проверки
            */

            let accountId = state.accounts.length; // Определяем идентификатор будущего счета -- Возможно потом станет зависимо от бэкенда
            let newAccount = {tasks:action.tasks, id:accountId, accepted:false,time:action.time}; // Создаем объект нового счета со ссылками на таски
            let newTasks = state.tasks.map((el)=>{ // Вносим ссылку в таски
                if(action.tasks.some((num)=>num === el.id)){ // Проверяем, входит ли таск в число выбранных
                    // TODO Переложить в другое действие на случай отмены акцепта пользователем
                    el.account = accountId; //заносим идентификатор
                    el.accepted = true      // Устанавливаем статус accepted

                }
                return el;
            });
            return {
                ...state,
                accounts:[ ...state.accounts,newAccount],
                tasks:newTasks,
                newAccountId: accountId
            }; // Композиция всех данных - счетов и тасков

        case SUBMIT_ACCOUNT:
            let result = { ...state,accounts:[ ...state.accounts]};
            result.accounts[action.id] = {
                ...result.accounts[action.id],
                ...action.content,
                accepted:true};
            return result;
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

/**
 * Создание нового счета с привязкой к таскам
 * @param {Array} tasks Перечень идентификаторов тасков
 * @returns {{type: string, tasks: *}}
 */
const addNewAccount = (tasks,time) => ({type:ADD_EMPTY_ACCOUNT,tasks:tasks,time:time});

/**
 * Внесение в счет данных
 * @param {Number} id Идентификатор аккаунта
 * @param {Object} data Набор параметров счета
 * @returns {{type: string, id: *, content: *}}
 * @constructor
 */
const SubmitAccount = (id, data) =>({type: SUBMIT_ACCOUNT,id:id,content:data});
export {
    addNewTask,
    delTask,
    addNewAccount,
    SubmitAccount
}
export default TasksAccountsReducer;