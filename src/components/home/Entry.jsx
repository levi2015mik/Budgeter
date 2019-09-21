import React from "react";
import css from "./Entry.module.css"
import {NavLink} from "react-router-dom";

function Entry(props) {
    let id = props.id;
    let gray = props.accepted? {color: "#bbbbbb"}: {color:"#000"};
    let NameStr = (props.accepted)? (<NavLink to={"/account/" + props.account}>{props.name}</NavLink>):props.name;
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

            <span className={css.textContainer} style={gray}>
                <label htmlFor={id}>
                    {NameStr}
                </label>
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