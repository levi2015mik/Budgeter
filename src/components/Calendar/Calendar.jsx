import moment from "moment"
import "moment/locale/ru"
import "moment/locale/he"
import React, {useState} from "react";
import css from "./Calendar.module.css"
import Selector from "./Selector";
import MainTable from "./MainTable";

/**
 * Календарь - компонент выбора дня - недели - месяца - года, имеющий собственное состояние
 * Умеет рпботать с русским форматом
 * TODO Сделать компонент управляемым (через state.HomeReducer)
 * @param {Object} props {
 *  {string} locale
 *  {string) label
 *  {function} output
 * }
 * @returns {*}
 * @constructor
 */
function Calendar(props){
    moment.locale(props.locale);
    // Названия месяцев и дней недели из локализаторов moment
    let monthNames = moment.months();
    // Инициализация текущей даты через хук
    let [now, setNow] = useState(moment());
    function addDate(pos) {
        let newNow = moment(now.add(1,pos));
        setNow(newNow)
    }

    function subNow(pos) {
        let newNow = moment(now.subtract(1,pos));
        setNow(newNow)
    }

    function today() {
        let now = moment();
        setNow(moment());
        setSelectedDate(now.date())
    }

    // Видимость календаря
    let [viewType, setViewType] = useState(false);
    function toggleEl() {
        setViewType(!viewType);
    }

    // Селектор выбора день/ месяц/ год
    let [selector, setSelector] = useState("d");
    function selectorChange(ev) {
        setSelector(ev.currentTarget.value)
    }

    // Выбранная дата
    let [selectedDate, setSelectedDate] = useState(moment().date());
    function changeSelectedDate(date) {
        if(date)
        setSelectedDate(date)
    }

    function output() {
        setViewType(false);
        props.output({year:now.year(),month:now.month(),date:selectedDate,selector:selector})
    }

    // Задание первого и последнего дней
    let startMonth = now.date(1).day();
    let endMonth = now.daysInMonth();

    return <div className={css.element}>
        <div className={css.header}>
            <span className={css.label}>{props.label}</span>
            <div style={{display:"inline-block"}}>
            <Selector
                showYear={true}
                toggleEl={toggleEl}
                subNow={subNow}
                addDate={addDate}
                month={monthNames[now.month()]}
                year={now.year()}
            />
            {viewType &&
            <div className={css.cal}>
                <MainTable
                    locale={props.locale}
                    startMonth={startMonth}
                    endMonth={endMonth}
                    selector={selector}
                    selectedDate={selectedDate}
                    changeSelectedDate={changeSelectedDate}
                />

                <div className={css.selector}>
                    <h3>Select</h3>
                    <label><input type="radio" value={"Y"} name="selector" onChange={selectorChange} checked={selector === "Y"} />Year</label><br/>
                    <label><input type="radio" value={"M"} name="selector" onChange={selectorChange} checked={selector === "M"} />Month</label><br/>
                    <label><input type="radio" value={"w"} name="selector" onChange={selectorChange} checked={selector === "w"} />Week</label><br/>
                    <label><input type="radio" value={"d"} name="selector" onChange={selectorChange} checked={selector === "d"} />Day</label>
                </div>
                <div>
                    <input type="button" value="Reset" onClick={()=>setViewType(false)}/>
                    <input type="button" value="Now" onClick={today}/>
                    <input type="button" value="OK" onClick={output}/>
                </div>
            </div>}
            </div>
        </div>
    </div>
}

export default Calendar;