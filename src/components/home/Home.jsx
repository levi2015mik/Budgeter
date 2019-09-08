import React from "react";
import css from "./home.module.css"
import Entry from "./Entry"
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
                <input value="<" type="button" onClick={addNewEntry}/>
                <button>{day}</button>
                <input value=">" type="button" onClick={addNewEntry}/>
                <input value={props.textFieldValue} onChange={changeField} placeholder="Name of entry" size="40"/>
                <input value="Add new entry" type="button" onClick={addNewEntry}/>
            </div>
                <input value="Accept selected" type="button" onClick={addNewEntry}/>
                <input value="Delete selected" type="button" onClick={addNewEntry}/>
                <input value="Select all" type="button" onClick={addNewEntry}/>
                <input value="deselect all" type="button" onClick={addNewEntry}/>
                <hr/>
            {entries.map(el=>
                <Entry name={el.name} unique={el.unique} />
            )}
        </div>
    )
}

export default Home