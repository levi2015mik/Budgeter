import React from "react";
import css from "./info.module.css"
import Calendar from "../Calendar/Calendar"


/**
 * Вывод информации о затратах на выбранный месяц, день, неделю, год, а также средних за день, неделю или месяц
 * @param props
 * @returns {*}
 * @constructor
 */
function Info(props) {
    return <div className={css.info}>Info
        <table className={css.infoTb}>
            <caption className={css.infoTb}>
                <span className={css.infoTb}>Data of expenses</span>
                <Calendar
                    locale="ru"
                    output={props.setTime}
                />
            </caption>
            <tbody className={css.infoTb}>
            <tr className={css.infoTb}><td className={css.infoTb}>Current time expenses</td><td className={css.infoTb}>2999</td></tr>
            <tr className={css.infoTb}><td className={css.infoTb}>Average day expenses</td><td className={css.infoTb}>2999</td></tr>
            <tr className={css.infoTb}><td className={css.infoTb}>Average week expenses</td><td className={css.infoTb}>2999</td></tr>
            <tr className={css.infoTb}><td className={css.infoTb}>Average month expenses</td><td className={css.infoTb}>2999</td></tr>
            <tr className={css.infoTb}><td className={css.infoTb}>Average year expenses</td><td className={css.infoTb}>2999</td></tr>
            </tbody>
        </table>
    </div>
}

export default Info;
