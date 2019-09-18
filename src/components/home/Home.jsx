import React, {useEffect} from "react";
import css from "./home.module.css"
import Entry from "./Entry"
import Calendar from "../Calendar/Calendar";
import SmallCalendar from "../Calendar/SmallCalendar";


function Home(props) {
    // Запуск фильтрации для вывода данных. Запускается только один раз
    useEffect(props.activateDataFilter,[]);

    function changeField(ev) {
        props.changeTextField(ev.target.value)
    }
    const entries = props.entries;
    return(
        <div className={css.home}>
            <div className={css.dateSelect}>
                <input value={props.textFieldValue} type="text" onChange={changeField} placeholder="Name of entry" />
                <SmallCalendar
                    locale={"ru"}
                    label={"Enter date to activate task"}
                    output={props.changeActivateTime}
                />
                <input value="Add new entry" type="button" onClick={props.addNewEntry}/>
            </div>
            <div>
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

                <Calendar locale="ru" label="Filter" output={props.activateDataFilter}/>

                <hr/>
            </div>
            <div>
            {entries.map(el=>
                <Entry
                       key={el.id}
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
        </div>
    )
}

export default Home