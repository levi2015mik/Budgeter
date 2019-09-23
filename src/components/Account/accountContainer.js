import Account from "./Account"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import actor from "../../redux/actor";

function mapStateToProps(state) {
    return {
        tasks: state.TasksAccountsReducer.tasks,
        accounts: state.TasksAccountsReducer.accounts,
        currentAccountId: state.TasksAccountsReducer.newAccountId,
        newTaskId:state.TasksAccountsReducer.nextTaskId,
    }
}
const mapDispatchToProps = {
  accept: actor.accept
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Account));