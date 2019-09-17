import React, {useState} from "react"
import moment from "moment"
import "moment/locale/ru"
import "moment/locale/he"
import css from "./Calendar.module.css"
import Selector from "./Selector";
import MainTable from "./MainTable";

/**
 * Маленький календарь с возможностью выбора только даты
 * @param {Object} props {
 *  {string} locale
 *  {string) label
 *  {function} output
 * }
 * @returns {*}
 * @constructor
 */
function SmallCalendar(props) {
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
    // Выбранная дата
    let [selectedDate, setSelectedDate] = useState(moment().date());
    function changeSelectedDate(date) {
        if(date)
            setSelectedDate(date)
    }

    function output() {
        setViewType(false);
        let date = moment();
        date.year(now.year());
        date.month(now.month());
        date.date(selectedDate);
        console.log(date.valueOf());
        props.output(date.valueOf());
    }
    // Задание первого и последнего дней
    let startMonth = now.date(1).day();
    let endMonth = now.daysInMonth();

    return <div className={css.element} style={{"float":"none",marginRight:"0.3em"}}>
        <div className={css.header}>
            <span className={css.label}>{props.label}</span>
            <div style={{display:"inline-block"}}>
            <Selector
                showYear={false}
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
                    selector={"d"}
                    selectedDate={selectedDate}
                    changeSelectedDate={changeSelectedDate}
                />
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

export default SmallCalendar;