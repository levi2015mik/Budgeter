import React, {useEffect} from "react";
import {arrayPush, Field, FieldArray, initialize, reduxForm} from "redux-form";
import css from "./account.module.css"
import store from "../../redux/mystore";
import {Provider} from "react-redux";
import moment from "moment";

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
function NamesList(props){
    function pushEmptyElement(e,index) {
        if(e.target.value && index === (props.fields.length - 1)) props.fields.push("")
    }
    function removeElement(index) {
        if(props.fields.length > 1) props.fields.remove(index)
    }
    return <div>
        {props.fields.map((el,index)=>
            <div key={index}>
                <Field component="input" name={el} onChange={e=>pushEmptyElement(e,index)}/>
                <input type="button" value="X" onClick={()=>removeElement(index)}/>
            </div>)
        }
    </div>
}

/**
 * Таблица дополнительных параметров
 * TODO Попробовать без FieldArray
 * @param props
 * @returns {*}
 * @constructor
 */
function Params(props) {
    function removeElement(index) {
        if(props.fields.length > 1) props.fields.remove(index)
    }
    function pushEmptyElement(e,index) {
        console.log(9);
        if(e.target.value && index === (props.fields.length - 1)) props.fields.push(["", ""])
    }
    return <table>
        <tbody>
        {props.fields.map((el,index)=> <tr key={index}>
            <FieldArray onChange={(e)=>{pushEmptyElement(e,index)}} component={Param} name={el}/>
            <td><input type={"button"} value={"X"} onClick={()=>{removeElement(index)}}/></td>
        </tr>
        )}
        </tbody>
    </table>
}

function Param(props) {

    let out = props.fields.map((el,index)=><td key={index}><Field onChange={(e)=>props.onChange(e)} component="input" name={el}/></td>);
    return <>{out}</>
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

        // store.dispatch(initialize("account", {params: [{name:"aaa",value:""}]}));
        store.dispatch(arrayPush("account","params",["12",""]));
    }
    return <form>
        <div>
            <h3>List of names:</h3>
            <FieldArray component={NamesList} name={"names"}/>
        </div>
        <div>
            <h3>Price:</h3>
            <Field component={"input"} name={"price"}/>
        </div>
        <div>
            <h3>Parameters</h3>
            <FieldArray component={Params} name={"params"}/>
        </div>
        <input type={"submit"}/><input type={"reset"} onClick={clicker}/>
    </form>
}

// HOC AccountReduxForm Он необходим для корректной работы ReduxForm
const Formed = reduxForm({form:"account", initialValues:{name:"1234"}})(AccountForm);
let AccountReduxForm = ()=><Provider store={store}><Formed/></Provider>;


function Account(props) {
    let isAccepted = props.match.params.id !== undefined;
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
        rawNames = account.tasks.map((el) => ({name:props.tasks[el].name,activated:props.tasks[el].activated}));
    } catch(err){
        props.history.push("/")
    }
    for(let i = 0;i < rawNames.length;i++){
        rawNames[i].name.split(",").forEach(el=>{names.push(el)})
    }
    // Инициализация данных формы ввода при создании
    useEffect(()=>{store.dispatch(initialize("account",{names:[...names,""], params:[["NN","221"],["",""]]}))},[names]);

    return <div className={css.account}>
        <h2>Account №: {id}</h2>
        <time dateTime={moment(account.time).format("YYYY-MM-DD")}>{moment(account.time).format("DD.MM.YY")}</time>
            <AccountReduxForm accepted={isAccepted}/>
        </div>
}

export default Account;