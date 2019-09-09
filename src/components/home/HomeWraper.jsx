import Home from "./Home"
import {connect} from "react-redux";
import * as d from "../../redux/HomeReducer"

/*
* Контейнер для передачи State в Home
* */

function mapStateToProps(state){
    return {
        entries: state.HomeReducer.filteredEntries,
        textFieldValue: state.HomeReducer.newEntryName
    }
}
const mapDispatchToProps = (dispatch) => ({
    changeTextField(value){
        dispatch({type:d.CHANGE_ENTER_FIELD,value:value})
    },
    addNewEntry(){
        dispatch({type:d.ADD_NEW_ENTRY})
    },
    acceptElement(id){
        dispatch({type:d.ACCEPT,value:id})
    },
    acceptSelected(){
        dispatch({type:d.ACCEPT})
    },
    deleteEntrie(id){
        dispatch({type:d.DELETE,value:id})
    },
    deleteSelected(){
        dispatch({type:d.DELETE})
    },
    changeElSelection(id){
        dispatch({type:d.CHANGE_SELECTION,value:id})
    },
    changeSelectedAll(sign){
        dispatch({type:d.CHANGE_SELECTION_ALL,value:sign})
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Home)