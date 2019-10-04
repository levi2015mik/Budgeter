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
            <tr className={css.infoTb}>
                <td className={css.infoTb}>Current time expenses</td>
                <td className={css.infoTb}>{props.CurrentSum.toFixed(2)}</td>
                <td className={css.infoTb}>Accounts: {props.CountAccountsFromFiltered}</td>
                <td className={css.infoTb}>Tasks: {props.CountTasksOfSelected}</td>
                </tr>
            <tr className={css.infoTb}><td className={css.infoTb}>Average day expenses</td>
                <td className={css.infoTb}>{props.AVGDay.toFixed(2)}</td>
                <td className={css.infoTb}> </td>
                <td className={css.infoTb}> </td>
            </tr>
            <tr className={css.infoTb}><td className={css.infoTb}>Average accounts of day</td>
                <td className={css.infoTb}>{props.getAVGAccountsOfDay.toFixed(2)}</td>
                <td className={css.infoTb}> </td>
                <td className={css.infoTb}> </td>
            </tr>
            <tr className={css.infoTb}>
                <td className={css.infoTb}>Average week expenses</td>
                <td className={css.infoTb}>{props.AVWeek.toFixed(2)}</td>
                <td className={css.infoTb}> </td>
                <td className={css.infoTb}> </td>
            </tr>
            <tr className={css.infoTb}><td className={css.infoTb}>Average accounts of week</td>
                <td className={css.infoTb}>{props.getAVGAccountsOfWeek.toFixed(2)}</td>
                <td className={css.infoTb}> </td>
                <td className={css.infoTb}> </td>
            </tr>
            <tr className={css.infoTb}>
                <td className={css.infoTb}>Average month expenses</td>
                <td className={css.infoTb}>{props.AVGMonth.toFixed(2)}</td>
                <td className={css.infoTb}> </td>
                <td className={css.infoTb}> </td>
            </tr>
            <tr className={css.infoTb}>
                <td className={css.infoTb}>Average accounts of month</td>
                <td className={css.infoTb}>{props.getAVGAccountsOfMonth.toFixed(2)}</td>
                <td className={css.infoTb}> </td>
                <td className={css.infoTb}> </td>
            </tr>
            <tr className={css.infoTb}>
                <td className={css.infoTb}>Average year expenses</td>
                <td className={css.infoTb}>{props.AVGYear.toFixed(2)}</td>
                <td className={css.infoTb}> </td>
                <td className={css.infoTb}> </td>
            </tr>
            <tr className={css.infoTb}>
                <td className={css.infoTb}>Average accounts of year</td>
                <td className={css.infoTb}>{props.getAVGAccountsOfYear.toFixed(2)}</td>
                <td className={css.infoTb}> </td>
                <td className={css.infoTb}> </td>
            </tr>
            </tbody>
        </table>
    </div>
}

export default Info;
