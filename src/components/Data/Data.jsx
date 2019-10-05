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

    /**
     * Сохранение данных из Textarea-> jsonDump или из файла, полученных в параметре val в state
     * @param {string} val
     */
    function save(val){
        let data = typeof val === "string"? val:jsonDump;
        // Это val нужно для исправления ошибки - из-за асинхронности хука данные не могут быть сохранены
        let dataObj = {};
        try{
            dataObj = JSON.parse(data);
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

    /**
     * Обработка полученного файла.
     * - JSON просто заменяет пользовательские данные, подменив собой файл state.TaskAccountReducer
     * @param file
     */
    function chFile(file) {

        let type = file.name.split(".")[1];
        if(type === "json"){
            let reader = new FileReader();
            reader.readAsText(file,"utf8");
            reader.onload = function(event) {
                let fileData = event.target.result;
                let next = window.confirm("Reload all user information from file?");
                if(!next) return;
                setJsonDump(fileData); // Хук асинхронный. Поэтому save просто не получает его данные
                save(fileData);
            }
        }
        else if(type === "csv"){}
        else{}
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