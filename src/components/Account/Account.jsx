import React from "react";
import {Field, initialize, reduxForm} from "redux-form";
import store from "../../redux/mystore";
import {Provider} from "react-redux";

/**
 * Форма ввода и просмотра счета. Использует redux-form
 * При наличии параметра пути id - просмотр
 * При отсутствии - ввод данных по id из state.TasksAccounts
 * @param props
 * @returns {*}
 * @constructor
 */

/**
 * Вывод списка наименований через FieldsArray
 * @param props
 * @returns {*}
 */
function namesList(props){
    return<> </>
}

/**
 * Форма счета.
 * ##Пункты:
 * - Список наименований с возможностью удаления и добавления
 * - Общая цена
 * - Дата активации и дата акцепта (только чтение)
 * - Таблица дополнительнеых параметров типа ключ - значение
 * - Кнопки принять, отменить
 * @param props
 * @returns {*}
 * @constructor
 */
function AccountForm(props){
    function clicker() {

        store.dispatch(initialize("account",{name:"Mi"}))
    }
    return <form>
        <Field name="name" component="input" placeholder="Nop"/>
        <input type={"button"} onClick={clicker}/>
        <input type={"submit"}/>
    </form>
}

// HOC AccountReduxForm Он необходим для корректной работы ReduxForm
const Formed = reduxForm({form:"account", initialValues:{name:"1234"}})(AccountForm);
let AccountReduxForm = ()=><Provider store={store}><Formed/></Provider>;


function Account(props) {
    let id = props.match.params.id !== undefined? props.match.params.id: props.currentAccountId;
    let account = props.accounts[id];
    /*
        Подготовка массива names - списка покупок в том числе из наборов, перечисленных через запятую вида
        Макароны, яйца, помидоры, майонез
     */
    let names=[], rawNames = [];
    // Эта ошибка возникает при перезагрузке страницы. Идут неверные параметры
    // Решение - редирект
    try {
        rawNames = account.tasks.map((el) => props.tasks[el].name);
    } catch(err){
        props.history.push("/")
    }
    for(let i = 0;i < rawNames.length;i++){
        rawNames[i].split(",").forEach(el=>{names.push(el)})
    }

    console.log(names);

    return <div>Account
        {id}
            <AccountReduxForm/>
        </div>
}

export default Account;