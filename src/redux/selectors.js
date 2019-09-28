import {createSelector} from "reselect"
import moment from "moment"

function CalendarCallback(conditions){
    if( typeof conditions ===  "undefined" || typeof conditions.selector ===  "undefined") {
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

/**
 * Расчет количества периодов (дней, недель, месяцев или лет в заданном массиве счетов)
 * @param accounts
 * @param period
 * @returns {number}
 */
function countTimePeriodsInAccounts(accounts, period) {
    let counter = 0;
    let time = moment(0);
    accounts.forEach((el)=>{
        let now = moment(el.time);
        if(!now.isSame(time,period)){
            counter ++;
            time = now;
        }
    });
    return counter;
}

/**
 * Расчет среднех расходов за период
 * @param accounts
 * @param period
 * @returns {number}
 * @constructor
 */
function AVGOfPeriod(accounts, period) {
    let avgRes = 0;
    let periods = countTimePeriodsInAccounts(accounts,period);
    accounts.forEach((el)=>{
        avgRes += Number(el.price);
    });
    let res = avgRes / periods;
    return !isNaN(res)? res : "-"
}

/**
 * Среднее количество счетов за период
 * @param accounts
 * @param period
 * @returns {number}
 * @constructor
 */
function AVGAccountsOfPeriod(accounts, period) {
    let periods = countTimePeriodsInAccounts(accounts,period);
    let res = accounts.length / periods;
    return !isNaN(res) ? res :  "-"
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

export const CountTasksOfSelected = createSelector(FilteredAccounts,(accounts)=>
    accounts.reduce((tasks,el)=>el.tasks.length + tasks,0)
);

export const AVGDay = createSelector([getAccounts],
    (accounts)=> {
        return AVGOfPeriod(accounts,"d")});

export const AVWeek = createSelector([getAccounts],
    (accounts)=> {
        return AVGOfPeriod(accounts,"W")});

export const AVGMonth = createSelector([getAccounts],
    (accounts)=> {
        return AVGOfPeriod(accounts,"M")});

export const AVGYear = createSelector([getAccounts],
    (accounts)=> {
        return AVGOfPeriod(accounts,"Y")});


export const getAVGAccountsOfDay = createSelector([getAccounts],(accounts)=>AVGAccountsOfPeriod(accounts,"d"));
export const getAVGAccountsOfWeek = createSelector([getAccounts],(accounts)=>AVGAccountsOfPeriod(accounts,"W"));
export const getAVGAccountsOfMonth = createSelector([getAccounts],(accounts)=>AVGAccountsOfPeriod(accounts,"M"));
export const getAVGAccountsOfYear = createSelector([getAccounts],(accounts)=>AVGAccountsOfPeriod(accounts,"Y"));