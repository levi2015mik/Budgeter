import React from "react";
import css from "./Entry.module.css"

function Entry(props) {
    let unique = props.unique;
    return(
        <div className={css.entry}>
            <input type="checkbox" id={unique}/>
            <span className={css.textContainer}>
                <label htmlFor={unique}>{props.name}</label>
            </span>
            <span className={css.btnContainer}>
                <input type="button" value="V"/>
                <input type="button" value="X"/>
            </span>

        </div>
    )
}

export default Entry;