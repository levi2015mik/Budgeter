import {createSelector} from "reselect"
import moment from "moment"

function CalendarCallback(conditions){
    if(typeof conditions.selector ===  "undefined") {
        let now = moment();
        conditions = {
            year: now.year(),
            month: now.month(),
            date: now.date(),
            selector: "M"
        };
    }
    let filterTime = moment({
        year:conditions.year,
        month:conditions.month,
        date:conditions.date
    });

    return [filterTime,conditions.selector]
}

export const getAccounts = (state) => state.TasksAccountsReducer.accounts;

export const getTimeFilterFromInfo = (state) => state.HelpReducer.InfoTime;

/*
Селектор фильтрации счетов, выбранных по времени с помощью getTimeFilterFromInfo
 */
export const FilteredAccounts = createSelector([getAccounts,getTimeFilterFromInfo],(accounts,filter) =>{
    let [currentTimeFilter,conditions] = CalendarCallback(filter);
    return accounts.filter((el)=>moment(el.time).isSame(currentTimeFilter,conditions));
});

/*
Суммарная стоимость отфильтрованных данных
 */
export const CurrentSum = createSelector(FilteredAccounts,(accounts)=>{
    return accounts.reduce((sum,el) => {
        let price = el.price !== undefined ? el.price:0;
        return sum + Number(price);
    },0)
});

export const CountAccountsFromFiltered = createSelector(FilteredAccounts,(accounts)=>accounts.length);

export const CountTasks = createSelector(FilteredAccounts,(accounts)=>
    accounts.reduce((tasks,el)=>el.tasks.length + tasks,0)
);