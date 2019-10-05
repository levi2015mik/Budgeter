import {connect} from "react-redux"
import React, {createRef, useEffect, useState} from "react";
import {load} from "redux-localstorage-simple"
import css from "./Data.module.css"
import {Refresh} from "../../redux/TasksAccountsReducer"
import FileLoader from "./FileLoader";

function Data(props) {

    // Видимость поля для ввода
    let [showTextareaField,setshowTextareaField] = useState(false);
    function toggleTextarea() {
        setshowTextareaField(!showTextareaField)
    }

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

    // Работа со ссылками для экспорта данных
    let JSONLink = createRef();
    useEffect(()=>{
        let data = new Blob([jsonDump],{type:"application/json"});
        JSONLink.current.href = URL.createObjectURL(data)
    },[jsonDump,JSONLink]);

    //////////////////
    async function chFile(file) {
        // корректное чтение файла из кодировки 1251 + разнесение на массивы по строкам
        //TODO Перенести в Actor и сделать заполнение tasks accounts categories с контролем коллизий по времени и обработкой ошибок
        let reader = new FileReader();
        reader.readAsText(file,"CP1251");
        reader.onload = function(event) {
            let fileData = event.target.result;
            let type = file.name.split(".")[1];
            switch (type) {
                case "csv": break;
                case "json":
                    setJsonDump(fileData);
                    save();
                    break;
                default: alert("Uncorrect file type")
            }
        };
    }

    return (<div className={css.data}>
        <div>
            It is the stored application information. You can copy it and move to enouther device
            or clear it.<br/>

        </div>
        <div className={css.spoiler} onClick={toggleTextarea}>{showTextareaField?"-":"+"}</div>

        {showTextareaField && <div className={css.hided} >
            <div className={css.warn}><b>Warning!</b> Change data here may be danger.</div>
            <div>
                <textarea cols={60} rows={30} value={jsonDump} onChange={changeDump}/>
            </div>
                <input type={"button"} value={"clear"} onClick={clearStored}/>
                <input type={"button"} value={"save"} onClick={save}/>
            </div>
        }

        <div>
            <a href={"#"} download="data.json" ref={JSONLink} >Load data as json</a><br/>
            <a href={"aefessgff"} download={"data.csv"}>Load data as csv</a>
            <FileLoader onLoad={chFile}/>
        </div>
    </div>)
}

export default connect(null,{refresh:Refresh})(Data);