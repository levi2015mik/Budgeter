import {connect} from "react-redux"
import React, {useState} from "react";
import {load} from "redux-localstorage-simple"
import css from "./Data.module.css"
import {Refresh} from "../../redux/TasksAccountsReducer"

function Data(props) {

    let [jsonDump,setJsonDump] = useState(
        JSON.stringify(
            load({ states:["TasksAccountsReducer"]}),
            2, 2)
    );

    function changeDump(e){
        setJsonDump(e.target.value)
    }

    function clearStored() {
        localStorage.clear();
        window.location.reload()
    }

    function save(){
        let dataObj = {};
        try{
            dataObj = JSON.parse(jsonDump);
        }catch (e) {
            alert("Data is uncorrect");
            return;
        }

        props.refresh(dataObj.TasksAccountsReducer);
        alert("Data is saved")
    }

    async function chFile(e) {
        // корректное чтение файла из кодировки 1251 + разнесение на массивы по строкам
        //TODO Перенести в Actor и сделать заполнение tasks accounts categories с контролем коллизий по времени и обработкой ошибок
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file,"CP1251");
        reader.onload = function(event) {
            let csvData = event.target.result;
            console.log(csvData.split("\r"))
        };

    }
    return (<div className={css.data}>
        <div>
            It is the stored application information. You can copy it and move to enouther device
            or clear it.<br/>

        </div>
        <div className={css.warn}><b>Warning!</b> Change data here may be danger.</div>
        <div>
            <textarea cols={60} rows={30} value={jsonDump} onChange={changeDump}/>
        </div>
        <div>
            <input type={"button"} value={"clear"} onClick={clearStored}/>
            <input type={"button"} value={"save"} onClick={save}/>
            <input type={"file"} id={"fi"} onChange={chFile}/>
        </div>
    </div>)
}

export default connect(null,{refresh:Refresh})(Data);