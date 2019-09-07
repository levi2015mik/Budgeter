import React from "react";
import css from "./home.module.css"
import Entry from "./Entry"
function Home(props) {
    function addNewEntry(ev) {
        console.log(ev);
        alert(0)
    }
    // Временный хардкод позиций
    const entrys = [
        {name:"Торт с марципаном", unique:0},
        {name:"Укроп", unique:1},
        {name:"Горчица", unique:2},
        {name:"Набор юный террорист из супермаркета", unique:3},
    ];
    return(
        <div className={css.home}>
            <input placeholder="Name of entry" size="40"/>
                <input value="Add new entry" type="button" onClick={addNewEntry}/>
                <input value="Accept selected" type="button" onClick={addNewEntry}/>
                <input value="Delete selected" type="button" onClick={addNewEntry}/>
            {entrys.map(el=>
                <Entry name={el.name} unique={el.unique} />
            )}
        </div>
    )
}

export default Home