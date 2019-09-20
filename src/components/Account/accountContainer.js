import Account from "./Account"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

function mapStateToProps(state){
    return {
        tasks:state.TasksAccountsReducer.tasks,
        accounts: state.TasksAccountsReducer.accounts,
        currentAccountId: state.TasksAccountsReducer.newAccountId
    }
}

export default connect(mapStateToProps)(withRouter(Account));