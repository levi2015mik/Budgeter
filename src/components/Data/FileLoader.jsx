import React, {createRef, useState} from "react"
import css from "./Data.module.css"


class FileLoader extends React.Component{

    constructor(props){
        super(props);
        this.state = {text:"Drag data file or click hear for open new data"};

        this.fileRef = createRef();
        this.dropField = createRef();
    }

    componentDidMount(){

        function drag(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        let dropEl = this.dropField.current;

        dropEl.addEventListener('dragenter', drag, false);
        dropEl.addEventListener('dragleave', drag, false);
        dropEl.addEventListener('dragover', drag, false);
        dropEl.addEventListener("drop",this.dropData.bind(this),false);
    }

    FileClick() {
        this.fileRef.current.click();
    }

    chFile(e) {
        let files;
        if(e.target.files !== undefined) files = e.target.files;
        else if(e.dataTransfer !== undefined) files = e.dataTransfer.files;
        else return;
        if (files.length === 0) return;
        this.setState({text:files[0].name});
        this.props.onLoad(files[0]);
    }

    dropData(e) {
        e.preventDefault();
        e.stopPropagation();
        this.chFile(e)
    }


    render() {
        return (
            <div ref={this.dropField} className={css.fileLoader} onClick={this.FileClick.bind(this)}>
                <span>{this.state.text}</span>
                <input ref={this.fileRef} type={"file"} id={"fi"} onChange={this.chFile.bind(this)}/>
            </div>
        )
    }
}

export default FileLoader;