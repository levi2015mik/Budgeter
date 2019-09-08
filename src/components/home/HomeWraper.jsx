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
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Home)