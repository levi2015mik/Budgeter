import Home from "./Home"
import {connect} from "react-redux";
/*
* Контейнер для передачи State в Home
* */

function mapStateToProps(state){
    return {entries: state.HomeReducer.filteredEntries}
}
const mapDispatchToProps = (store) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Home)