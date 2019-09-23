import React from "react"
import FormData from "./FormData"
import css from "./account.module.css"

/**
 * Элемент формы input с выводом ошибки
 * @param props
 * @returns {*}
 * @constructor
 */
export function Input(props) {
    return <FormData.Consumer>
        {
            context => <><input
                {...props.input}
                placeholder={props.label}
                type={props.type}
                disabled={context.disabled || props.disabled}
                onChange={(e) => {
                    props.input.onChange(e)
                }}
            />
                {props.meta.touched &&
                ((props.meta.error && <span className={css.error}>{props.meta.error}</span>) ||
                    (props.meta.warning && <span className={css.warning}>{props.meta.warning}</span>))}
            </>
        }
    </FormData.Consumer>
}

/**
 * Простой инпут без интеграции с redux form.
 * Предназначен для задания дополни тельных параметров кнопкам
 * @param props
 * @returns {*}
 * @constructor
 */
export function SimpleInput(props) {
    return (
    <FormData.Consumer>
        {(context) => <input
            { ...props}
            disabled={context.disabled || props.disabled}
        /> }
    </FormData.Consumer>)
}