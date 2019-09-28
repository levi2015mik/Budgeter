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
        localStorage.clear()
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
        </div>
    </div>)
}

export default connect(null,{refresh:Refresh})(Data);