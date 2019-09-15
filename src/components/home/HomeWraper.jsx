import Home from "./Home"
import {connect} from "react-redux";
import * as importedData from "../../redux/HomeReducer"

/*
* Контейнер для передачи State в Home
* */

function mapStateToProps(state){
    return {
        entries: state.HomeReducer.filteredEntries,
        textFieldValue: state.HomeReducer.newEntryName
    }
}
const mapDispatchToProps = {
    changeTextField:importedData.changeTextField,
    addNewEntry:importedData.addNewEntry,
    acceptElement:importedData.acceptElement,
    acceptSelected:importedData.acceptSelected,
    deleteEntrie:importedData.deleteEntrie,
    deleteSelected:importedData.deleteSelected,
    changeElSelection:importedData.changeElSelection,
    changeSelectedAll:importedData.changeSelectedAll
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)