import Info from "./Info"
import {connect} from "react-redux"
import * as selectors from "../../redux/selectors"

import * as HelpReducer from "../../redux/HelpReducer"

const mapStateToProps = (state) => ({
    FilteredAccounts:selectors.FilteredAccounts(state) // Only for example
});
const mapDispatchToProps = {
    setTime:HelpReducer.setInfoTime
};
export default connect(mapStateToProps,mapDispatchToProps)(Info);
