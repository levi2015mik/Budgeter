import React from "react";

/**
 * Форма ввода и просмотра счета. Использует redux-form
 * При наличии параметра пути id - просмотр
 * При отсутствии - ввод данных по id из state.TasksAccounts
 * @param props
 * @returns {*}
 * @constructor
 */
function Account(props) {

    return <div>Account
        {props.match.params.id}
        </div>
}

export default Account;