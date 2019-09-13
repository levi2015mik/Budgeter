import moment from "moment"
import "moment/locale/ru"
import "moment/locale/he"
import React, {useState} from "react";

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

    function tooday() {
        setNow(moment())
    }

    let [viewType, setViewType] = useState(false);
    function toggleEl() {
        setViewType(!viewType);
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
        dayNames[i] = [];
        for(let j = 0;j < 7;j ++){

            if(i===0) {
                dayNames[i][j] = {value:week[j + weekCorrector]};
                if(j === 6 && weekCorrector) dayNames[i][j] = {value:week[0]};
                continue;
            }
            if(i >= 1 && j >= startMonth && dayNum === 0){
                dayNum ++ ;
                dayNames[i][j] = {value:dayNum};
                continue;
            }
            if(i >= 1 && dayNum > 0 && dayNum < endMonth){
                dayNum ++ ;
                dayNames[i][j] = {value:dayNum};
                continue;
            }
            dayNames[i][j] = {value:""};
        }
    }
    return <div>
        <div>
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
            <div>
        <table><tbody>
        {dayNames.map(el =>
            <tr>{
                el.map(val=>
                    <td>{val.value}</td>
                )
            }</tr>
        )}</tbody>
        </table>
        <div>
            Select
            <input type="radio" name="selector" id="y"/><label for="y">Year</label><br/>
            <input type="radio" name="selector" id="m"/><label for="m">Month</label><br/>
            <input type="radio" name="selector" id="d"/><label for="d">Day</label>
        </div>
        <div>
            <input type="button" value="Now" onClick={tooday}/>
            <input type="button" value="Select"/>
        </div>
        </div>}
    </div>
}

export default Calendar;