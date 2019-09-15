import moment from "moment"
import "moment/locale/ru"
import "moment/locale/he"
import React, {useState} from "react";
import css from "./Calendar.module.css"

/**
 * Календарь - компонент выбора дня - недели - месяца - года, имеющий собственное состояние
 * Умеет рпботать с русским форматом
 * @param props
 * @returns {*}
 * @constructor
 */
function Calendar(props){
    window.moment = moment;
    moment.locale(props.locale);

    // Названия месяцев и дней недели из локализаторов moment
    let week = moment.weekdaysShort();
    let monthNames = moment.months();
    let weekStr = [];

    let weekCorrector = 0;
    let dayNames = [];
    let dayNum = 0;

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
        setSelectedDate(date)
    }

    function output() {
        setViewType(false);
        props.conditions(now.year(),now.month(),selectedDate,selector)
    }

    // Задание первого и последнего дней
    let startMonth = now.date(1).day();
    let endMonth = now.daysInMonth();

    // Русская корректировка
    if(props.locale === "ru") {
        weekCorrector = 1;
        if(startMonth === 0) startMonth = 6;
        else startMonth = startMonth - 1
    }

    for(let i = 0;i < 7;i ++){
        weekStr[i] = week[i + weekCorrector];
        if(i === 6 && weekCorrector) weekStr[i] = week[0];
    }
    for(let i = 0;i < 6;i ++){
        dayNames[i] = [];

        for(let j = 0;j < 7;j ++){
            if(j >= startMonth && dayNum === 0){
                dayNum ++ ;
                dayNames[i][j] = {value:dayNum};
                if(dayNum === selectedDate) {
                    dayNames[i].selected = true;
                    dayNames[i][j].selected = true;
                }
                continue;
            }
            if(dayNum > 0 && dayNum < endMonth){
                dayNum ++ ;
                dayNames[i][j] = {value:dayNum};
                if(dayNum === selectedDate) {
                    dayNames[i].selected = true;
                    dayNames[i][j].selected = true;
                }
                continue;
            }

            dayNames[i][j] = {value:""};
        }
    }
    return <div>
        <div className={css.header}>
            <input type="button" value="<<" onClick={()=>{
                subNow("Y")
            }}/>
            <input type="button" value="<" onClick={()=>{
                subNow("M")
            }}/>
            <button onClick={toggleEl}>{`${monthNames[now.month()]} ${now.year()}`}</button>
            <input type="button" value=">" onClick={()=>{
                addDate("M")
            }}/>
            <input type="button" value=">>" onClick={()=>{
                addDate("Y")
            }}/>
        </div>
        {viewType &&
        <div className={css.cal}>
        <table>
            <thead>
            <tr>
                {weekStr.map((el)=>
                    <th>{el}</th>
                )}
            </tr>
            </thead>
            <tbody className={selector === "M" || selector === "Y"? `${css.selected} ${css.targeted}`: "" }>
        {dayNames.map(el =>
            <tr
                className={`${el.selected? css.selected: ""} ${selector === "w"? css.targeted:""}`}
            >{
                el.map(val=>
                    <td
                        className={`${val.selected? css.selected: ""} ${selector === "d"? css.targeted:""}`}
                        onClick={()=>{changeSelectedDate(val.value)}}>{val.value}</td>
                )
            }</tr>
        )}</tbody>
        </table>
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
}

export default Calendar;