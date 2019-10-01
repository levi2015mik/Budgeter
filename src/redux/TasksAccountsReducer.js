const ADD_TASK = "ADD_TASK";
const DELETE = "DELETE";
const ADD_EMPTY_ACCOUNT = "ADD_EMPTY_ACCOUNT";
const SUBMIT_ACCOUNT = "SUBMIT_ACCOUNT";
const LINK_TASKS_TO_ACCOUNT = "LINK_TASKS_TO_ACCOUNT";
const REFRASH_ALL = "REFRASH_ALL";
const ADD_CATEGORIES = "ADD_CATEGORIES";


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
    nextTaskId: 5,
    categories:{}
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

            return {
                ...state,
                accounts:[ ...state.accounts,newAccount],
                newAccountId: accountId
            }; // Композиция всех данных - счетов и тасков

        case LINK_TASKS_TO_ACCOUNT:
            let newTasksData = state.tasks.map((el)=>{ // Вносим ссылку в таски
                if(action.tasks.some((num)=>num === el.id)){ // Проверяем, входит ли таск в число выбранных
                    el.account = action.accountId; //заносим идентификатор
                    el.accepted = true      // Устанавливаем статус accepted

                }
                return el;
            });
            return { ...state,tasks: newTasksData};

        case SUBMIT_ACCOUNT:
            let result = { ...state,accounts:[ ...state.accounts]};
            result.accounts[action.id] = {
                ...result.accounts[action.id],
                ...action.content,
                accepted:true};
            return result;

        case REFRASH_ALL:
            return {
                ...state,
                tasks:action.data.tasks,
                accounts:action.data.accounts,
                newTaskId:action.data.newTaskId,
                newAccountId:action.data.newAccountId,
                categories:action.data.categories
            };

        case ADD_CATEGORIES:

            let categories = state.categories;
            const price = action.names.length === 1? action.price : null;
            const insertedObj = {price:price,time:Date.now(),id: action.id};

            action.names.forEach(el=>{
                if(categories[el] === undefined) categories[el] = [];
                categories[el].push(insertedObj);
            });

            return { ...state,categories:categories };
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
 * @param time
 * @returns {{type: string, tasks: *}}
 */
const addNewAccount = (tasks,time) => ({type:ADD_EMPTY_ACCOUNT,tasks:tasks,time:time});

/**
 * Внесение в таски ссылок на аккаунт
 * @param accountId Идентификатор счета
 * @param {Array} tasks Массив идентификаторов тасков
 * @returns {{type: string, accountId: *, tasks: *}}
 */
const linkTasks = (accountId,tasks) =>({type:LINK_TASKS_TO_ACCOUNT,accountId:accountId,tasks:tasks});
/**
 * Внесение в счет данных
 * @param {Number} id Идентификатор аккаунта
 * @param {Object} data Набор параметров счета
 * @returns {{type: string, id: *, content: *}}
 * @constructor
 */
const SubmitAccount = (id, data) =>({type: SUBMIT_ACCOUNT,id:id,content:data});

const Refresh = (data) =>({type: REFRASH_ALL,data:data});

/**
 * Добавление информации о покупке товара определенной категории
 * @param {array} names
 * @param {number} price
 * @param {number} id
 * @returns {{type: string, names: *, price: *,id: number}}
 * @constructor
 */
const AddCategories = (names,price,id) => ({type: ADD_CATEGORIES,names:names,price:price,id:id});

export {
    addNewTask,
    delTask,
    addNewAccount,
    linkTasks,
    SubmitAccount,
    Refresh,
    AddCategories
}
export default TasksAccountsReducer;