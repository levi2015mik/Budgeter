import Home from "./Home"
import {connect} from "react-redux";
import * as importedData from "../../redux/HomeReducer"
import actor from "../../redux/actor"
/*
* Контейнер для передачи State в Home
* */

function mapStateToProps(state){
    return {
        entries: state.HomeReducer.filteredEntries,
        textFieldValue: state.HomeReducer.newEntryName,
        filter:state.HomeReducer.filter,
        activateTaskTime:state.HomeReducer.activateTaskTime
    }
}
const mapDispatchToProps = {
    changeTextField:importedData.changeTextField,
    addNewEntry:actor.addTask,
    activateDataFilter:actor.tasksFilter,
    acceptElement:importedData.acceptElement,
    acceptSelected:importedData.acceptSelected,
    deleteEntrie:actor.delTask,
    deleteSelected:actor.delTask,
    changeElSelection:importedData.changeElSelection,
    changeSelectedAll:importedData.changeSelectedAll,
    changeActivateTime:importedData.changeActivateTime,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)