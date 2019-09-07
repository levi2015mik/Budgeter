import React from "react";
import css from "./home.module.css"
import Entry from "./Entry"
function Home(props) {
    function addNewEntry(ev) {
        console.log(ev);
    }
    // Временный хардкод позиций
    const entrys = [
        {name:"Торт с марципаном", unique:0},
        {name:"Укроп", unique:1},
        {name:"Горчица", unique:2},
        {name:"Набор юный террорист из супермаркета", unique:3},
    ];

    // TODO Transform DataSelect to separated element
    const day = new Date().toLocaleDateString();

    return(
        <div className={css.home}>
            <div className={css.dateSelect}>
                <input value="<" type="button" onClick={addNewEntry}/>
                <button>{day}</button>
                <input value=">" type="button" onClick={addNewEntry}/>
                <input placeholder="Name of entry" size="40"/>
                <input value="Add new entry" type="button" onClick={addNewEntry}/>
            </div>
                <input value="Accept selected" type="button" onClick={addNewEntry}/>
                <input value="Delete selected" type="button" onClick={addNewEntry}/>
                <input value="Select all" type="button" onClick={addNewEntry}/>
                <input value="deselect all" type="button" onClick={addNewEntry}/>
                <hr/>
            {entrys.map(el=>
                <Entry name={el.name} unique={el.unique} />
            )}
        </div>
    )
}

export default Home