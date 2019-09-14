import React from "react";
import css from "./home.module.css"
import Entry from "./Entry"
import Calendar from "../Calendar/Calendar";


function Home(props) {
    function addNewEntry(ev) {
        console.log(ev);
    }

    function changeField(ev) {
        props.changeTextField(ev.target.value)
    }
    const entries = props.entries;

    // TODO Transform DataSelect to separated element
    const day = new Date().toLocaleDateString();


    return(
        <div className={css.home}>
            <div className={css.dateSelect}>
                <Calendar locale="ru" conditions={()=>{}}/>
                <input value={props.textFieldValue} type="text" onChange={changeField} placeholder="Name of entry" />
                <input value="Add new entry" type="button" onClick={props.addNewEntry}/>
            </div>
                <input value="Accept selected" type="button" onClick={props.acceptSelected}/>
                <input value="Delete selected" type="button" onClick={props.deleteSelected}/>

                <input
                    value="Select all"
                    type="button"
                    onClick={()=>{props.changeSelectedAll(true)}}/>

                <input
                    value="deselect all"
                    type="button"
                    onClick={()=>{props.changeSelectedAll(false)}}/>

                <hr/>
            {entries.map(el=>
                <Entry
                       name={el.name}
                       id={el.id}
                       accepted={el.accepted}
                       selected={el.selected}
                       toggleElSelect = {props.changeElSelection}
                       accept={props.acceptElement}
                       del={props.deleteEntrie}
                />
            )}
        </div>
    )
}

export default Home