import Info from "./Info"
import {connect} from "react-redux"
import * as selectors from "../../redux/selectors"

import * as HelpReducer from "../../redux/HelpReducer"

const mapStateToProps = (state) => ({
    FilteredAccounts:selectors.FilteredAccounts(state), // Only for example
    CurrentSum:selectors.CurrentSum(state),
    CountAccountsFromFiltered: selectors.CountAccountsFromFiltered(state),
    CountTasksOfSelected: selectors.CountTasksOfSelected(state),
    AVGDay: selectors.AVGDay(state),
    AVWeek: selectors.AVWeek(state),
    AVGMonth: selectors.AVGMonth(state),
    AVGYear: selectors.AVGYear(state),
    getAVGAccountsOfDay: selectors.getAVGAccountsOfDay(state),
    getAVGAccountsOfWeek: selectors.getAVGAccountsOfWeek(state),
    getAVGAccountsOfMonth: selectors.getAVGAccountsOfMonth(state),
    getAVGAccountsOfYear: selectors.getAVGAccountsOfYear(state),
});
const mapDispatchToProps = {
    setTime:HelpReducer.setInfoTime
};
export default connect(mapStateToProps,mapDispatchToProps)(Info);
