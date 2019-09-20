import React, {useEffect, useState} from "react";
import css from "./home.module.css"
import Entry from "./Entry"
import Calendar from "../Calendar/Calendar";
import SmallCalendar from "../Calendar/SmallCalendar";
import {Redirect} from "react-router-dom";

function Home(props) {
    // Запуск фильтрации для вывода данных. Запускается только один раз
    useEffect(props.activateDataFilter,[]);

    let [redirect, setRedirect] = useState({go:false,path:"/account/1"});

    function changeField(ev) {
        props.changeTextField(ev.target.value);
    }

    function preAcceptEl(id) {
        props.preAcceptElement(id);
        setRedirect({go:true,to:"/account"})
    }
    function preAcceptSelected() {

        props.preAcceptSelected();
        setRedirect({go:true,to:"/account"})

    }

    const entries = props.entries;

    return(
        <div className={css.home}>
            {redirect.go && <Redirect to={redirect.to}/>}
            <div className={css.dateSelect}>
                <input value={props.textFieldValue} type="text" onChange={changeField} placeholder="Name of entry" />
                <SmallCalendar
                    locale={"ru"}
                    label={"Enter date to activate task"}
                    output={props.changeActivateTime}
                    value={props.activateTaskTime}
                />
                <input value="Add new entry" type="button" onClick={props.addNewEntry}/>
            </div>
            <div>
                <input value="Accept selected" type="button" onClick={preAcceptSelected}/>
                <input value="Delete selected" type="button" onClick={props.deleteSelected}/>

                <input
                    value="Select all"
                    type="button"
                    onClick={()=>{props.changeSelectedAll(true)}}/>

                <input
                    value="deselect all"
                    type="button"
                    onClick={()=>{props.changeSelectedAll(false)}}/>

                <Calendar
                    locale="ru"
                    label="Filter"
                    value={props.filter}
                    output={props.activateDataFilter}
                />

                <hr/>
            </div>
            <div>
            {entries.map(el=>
                <Entry
                       key={el.id}
                       name={el.name}
                       id={el.id}
                       accepted={el.accepted}
                       account={el.account}
                       selected={el.selected}
                       toggleElSelect = {props.changeElSelection}
                       accept={preAcceptEl}
                       del={props.deleteEntrie}
                />
            )}
            </div>
        </div>
    )
}

export default Home;