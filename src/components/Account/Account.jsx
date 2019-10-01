import React, {useEffect,useState} from "react";
import { Field, FieldArray, Form, initialize, reduxForm} from "redux-form";
import css from "./account.module.css"
import store from "../../redux/mystore";
import {Provider} from "react-redux";
import moment from "moment";

import {Input, SimpleInput} from "./elements"
import FormData from "./FormData"
import validate from "./validate"

/**
 * Вывод списка наименований через FieldsArray
 * @param props
 * @returns {*}
 */
function NamesList(props) {

    let [lockBtn,setLockBtn] = useState(false);
    useEffect(()=>{
        if(props.fields.length === 1) setLockBtn(true);
        else if(props.fields.length > 1) setLockBtn(false);
    },[props.fields.length]);

    function pushEmptyElement(e, index) {
        if (e.target.value && index === (props.fields.length - 1)) props.fields.push("")
    }

    function removeElement(index) {
        if (props.fields.length > 1) props.fields.remove(index)
    }


    return <div>
        {props.fields.map((el, index) =>
            <div key={index}>
                <Field component={Input} name={el} onChange={e => pushEmptyElement(e, index)}/>
                <SimpleInput type="button" disabled={lockBtn} value="X" onClick={() => removeElement(index)}/>
            </div>)
        }
        {props.meta.error && <div className={css.error}>{props.meta.error}</div>}
    </div>
}

/**
 * Таблица дополнительных параметров
 * @param props
 * @returns {*}
 * @constructor
 */
function Params(props) {

    let [lockBtn,setLockBtn] = useState(false);
    useEffect(()=>{
        if(props.fields.length === 1) setLockBtn(true);
        else if(props.fields.length > 1) setLockBtn(false);
    },[props.fields.length]);

    function removeElement(index) {
        if (props.fields.length > 1) props.fields.remove(index)
    }

    function pushEmptyElement(e, index) {
        if (e.target.value && index === (props.fields.length - 1)) props.fields.push(["", ""])
    }



    return <table>
        <tbody>
        {props.fields.map((el, index) => <tr key={index}>
                <FieldArray onChange={(e) => {
                    pushEmptyElement(e, index)
                }} component={Param} name={el}/>
                <td><SimpleInput disabled={lockBtn} type={"button"} value={"X"} onClick={() => {
                    removeElement(index)
                }}/></td>
            </tr>
        )}
        </tbody>
    </table>
}

function Param(props) {

    let out = props.fields.map((el, index) => <td key={index}><Field onChange={(e) => props.onChange(e)}
                                                                     component={Input} name={el}/></td>);
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
 * Сообщения могут быть выданы синхронной валидацией.
 * Блокировка клавиш и полей через селекторы redux-form и возможно action creaters
 * @param props
 * @returns {*}
 * @constructor
 */
function AccountForm(props) {
    let {handleSubmit} = props;

    return <Form onSubmit={handleSubmit}>
            <div>
                <h3>List of names:</h3>
                <FieldArray component={NamesList} name={"names"}/>
            </div>
            <div>
                <h3>Price:</h3>
                <Field component={Input} name={"price"}/>
            </div>
            <div>
                <h3>Parameters</h3>
                <FieldArray component={Params} name={"params"}/>
            </div>
            <SimpleInput disabled={!props.valid} type={"submit"}/>
            <input type={"button"} value={"exit"} onClick={props.exit}/>
    </Form>
}

// HOC AccountReduxForm Он необходим для корректной работы ReduxForm
const Formed = reduxForm({form: "account", initialValues: {name: "1234"}, validate})(AccountForm);
let AccountReduxForm = (props) => <Provider store={store}><Formed { ...props} /></Provider>;

/**
 * Компонент страницы, на которой выводится форма и заносятся ее данные.
 * TODO Преобразовать в классовый
 * @param props
 * @returns {*}
 * @constructor
 */
function Account(props) {
    let isAccepted = props.match.params.id !== undefined;
    let id = props.match.params.id !== undefined ? props.match.params.id : props.currentAccountId;
    let account = props.accounts[id];
    let timeData = "",timeString = "";
    /*
        Подготовка массива names - списка покупок в том числе из наборов, перечисленных через запятую вида
        Макароны, яйца, помидоры, майонез
        TODO Зарефакторить этоу логику и перенести в бизнес.
     */
    let names = [], ids = [], rawNames = [];
    // Эта ошибка возникает при перезагрузке страницы. Идут неверные параметры
    // Решение - редирект
    try {
        rawNames = account.tasks.map((el) => ({name: props.tasks[el].name, id: props.tasks[el].id}));
        timeData = moment(account.time).format("YYYY-MM-DD");
        timeString = moment(account.time).format("DD.MM.YY");
    } catch (err) {
        props.history.push("/")
    }
    for (let i = 0; i < rawNames.length; i++) {
        rawNames[i].name.split(",").forEach(el => {
            names.push(el);
            ids.push(rawNames[i].id)
        })
    }

    //Чистка names
    names = names.map(el=>el.toLowerCase().trim());


    /**
     * Формирует объект для запуска actionCreater Accept
     * Этот объект содержит обновленный набор names вида [Идентификатор элемента tasks, Идентификатор элемента tasks ...]
     * и прочие параметры
     * @param values
     */
    function accept(values){

        props.accept(id,values,names,ids);
        props.addCategories(names,values.price,id);
        props.history.push("/")

        // names - важный бизнес объект. Его задача - хранение наименований Здесь они диспатчатся в Categorys
    }

    // Инициализация данных формы ввода при создании
    useEffect(() => {
        store.dispatch(initialize("account", {names: [...names, ""],price:account.price, params: [["NN", "221"], ["", ""]]}))
    }, [names]);

    return <div className={css.account}>
        <h2>Account №: {id}</h2>
        <time dateTime={timeData}>{timeString}</time>
        <FormData.Provider value={{disabled:isAccepted}}>
            <AccountReduxForm
                onSubmit={accept}
                exit={()=>{props.history.push("/")}}  // Возврат на верхний уровень без сохранения
            />
        </FormData.Provider>
    </div>
}

export default Account;