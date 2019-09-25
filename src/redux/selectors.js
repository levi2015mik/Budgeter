import {createSelector} from "reselect"

export const getAccounts = (state) => state.TasksAccountsReducer.accounts;

export const getTimeFilterFromInfo = (state) => state.HelpReducer.InfoTime;

export const FilteredAccounts = createSelector([getAccounts,getTimeFilterFromInfo],(accounts,filter) =>{
    return {}
});