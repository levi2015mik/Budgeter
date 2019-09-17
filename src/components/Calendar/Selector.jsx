import React from "react"

/**
 * Модуль выбора месяца и года с выводом текущей позиции
 * TODO Добавить кастомизацию через css
 * @param {Object} props
 * {
 *  day? Дата
 *  month
 *  year
 *  {boolean} showYear? Показывать ли кнопки смены года
 *  {function} subNow Уменьшение даты
 *  {function} addDate Увеличение даты
 *  {function} toggleEl Показать / скрыть календарь
 * }
 * @constructor
 */
function Selector(props) {
    let day = typeof(props.day) !== "undefined"? props.day:"";
    let showYear = typeof(props.showYear) !== "undefined"? props.showYear : "false";
    return <>
        {showYear &&
            <input type="button" value="<<" onClick={() => {
                props.subNow("Y")
            }}/>
        }
        <input type="button" value="<" onClick={()=>{
            props.subNow("M")
        }}/>
        <button onClick={props.toggleEl}>{`${day} ${props.month} ${props.year}`}</button>
        <input type="button" value=">" onClick={()=>{
            props.addDate("M")
        }}/>
        {showYear &&
            <input type="button" value=">>" onClick={() => {
                props.addDate("Y")
            }}/>
        }

    </>
}

export default Selector;