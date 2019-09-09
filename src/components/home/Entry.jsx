import React from "react";
import css from "./Entry.module.css"

function Entry(props) {
    let id = props.id;
    let gray = props.accepted? {color: "#bbbbbb"}: {color:"#000"};
    return(
        <div className={css.entry}>
            <input
                type="checkbox"
                id = {id}
                key = {id}
                disabled = {props.accepted}
                onChange = {()=>{props.toggleElSelect(id)}}
                checked={props.selected}
            />

            <span className={css.textContainer}>
                <span style={gray}><label htmlFor={id}>{props.name}</label></span>
            </span>
            <span className={css.btnContainer}>
                <input
                    type="button"
                    value="V"
                    disabled={props.accepted}
                    onClick={()=>{props.accept(id)}}
                />

                <input
                    type="button"
                    value="X"
                    disabled={props.accepted}
                    onClick={()=>{props.del(id)}}
                />
            </span>

        </div>
    )
}

export default Entry;