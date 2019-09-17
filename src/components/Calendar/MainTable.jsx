import React from "react"
import css from "./Calendar.module.css"
import moment from "moment"

/**
 * Календарь на один месяц, представленный в виде таблицы.
 * Компонент практически полностью управляем извне и не имеет представления о текущей дате
 * TODO Добавить поддержку написания справа налево для иврита
 * TODO Добавить праздники с локализацией
 * @param {Object} props {
 *  {string} locale (ru, en, he ...)
 *  {number} startMonth Первый день недели для месяца в парадигме javascript (начиная от нуля)
 *  {number} endMonth Количество дней в месяце
 *  {string} selector
 *  {number} selectedDate
 *  {function} changeSelectedDate
 * }
 * @returns {*}
 * @constructor
 */
function MainTable(props) {

    moment.locale(props.locale);
    let weekStr = [];
    let weekCorrector = 0;
    let startMonth = props.startMonth;
    let endMonth = props.endMonth;
    let dayNames = [];
    let week = moment.weekdaysShort();
    let dayNum = 0;

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
                if(dayNum === props.selectedDate) {
                    dayNames[i].selected = true;
                    dayNames[i][j].selected = true;
                }
                continue;
            }
            if(dayNum > 0 && dayNum < endMonth){
                dayNum ++ ;
                dayNames[i][j] = {value:dayNum};
                if(dayNum === props.selectedDate) {
                    dayNames[i].selected = true;
                    dayNames[i][j].selected = true;
                }
                continue;
            }

            dayNames[i][j] = {value:""};
        }
    }


    return<>
        <table>
            <thead>
            <tr>
                {weekStr.map((el,i)=>
                    <th key={i}>{el}</th>
                )}
            </tr>
            </thead>
            <tbody className={props.selector === "M" || props.selector === "Y"? `${css.selected} ${css.targeted}`: "" }>
            {dayNames.map((el,i) =>
                <tr
                    className={`${el.selected? css.selected: ""} ${props.selector === "w"? css.targeted:""}`}
                    key={i}
                >{
                    el.map((val,j)=>
                        <td
                            className={`${val.selected? css.selected: ""} ${props.selector === "d"? css.targeted:""}`}
                            onClick={()=>{props.changeSelectedDate(val.value)}}
                            key={j}
                        >{val.value}</td>
                    )
                }</tr>
            )}</tbody>
        </table>

    </>
}

export default MainTable;