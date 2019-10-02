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
    accounts.reduce((tasks,el)=>el.tasks.length + tasks,0));


export const AVGDay = createSelector([getAccounts],(accounts)=>AVGOfPeriod(accounts,"d"));
export const AVWeek = createSelector([getAccounts],(accounts)=>AVGOfPeriod(accounts,"W"));
export const AVGMonth = createSelector([getAccounts], (accounts)=>AVGOfPeriod(accounts,"M"));
export const AVGYear = createSelector([getAccounts], (accounts)=>AVGOfPeriod(accounts,"Y"));
export const getAVGAccountsOfDay = createSelector([getAccounts],(accounts)=>AVGAccountsOfPeriod(accounts,"d"));
export const getAVGAccountsOfWeek = createSelector([getAccounts],(accounts)=>AVGAccountsOfPeriod(accounts,"W"));
export const getAVGAccountsOfMonth = createSelector([getAccounts],(accounts)=>AVGAccountsOfPeriod(accounts,"M"));
export const getAVGAccountsOfYear = createSelector([getAccounts],(accounts)=>AVGAccountsOfPeriod(accounts,"Y"));




/*
Categories
 */

/**
 * Фильтрация набора данных одной категории по интервалу времени
 * @param category
 * @param startTime
 * @param endTime
 * @returns {{}}
 */
// function filterCategoryOfTimeBeetwin(category,startTime,endTime) {
//     return {};
// }

/**
 * Фильтрация набора данных одной категории на заданный день, неделю, месяц, год
 * @param category
 * @param time
 * @param selector
 * @returns {{}}
 */
// function filterCategoryOfTimeOn(category, time, selector = "M") {
//     return {}
// }

/**
 * Подсчет средней стоимости категории
 * @param category
 * @returns {number}
 */
function getCategoryAvg(category) {
    const count = category.length;
    const [sum,ignored] = category.reduce(                    // Суммирование значений. ignored
        (res, el)=> {                                         // нужен для устранения влияния непроставленных цен на результат
            res[0] += !!el.price? +el.price : 0 ;             // Дело в том, что при расчете можно учесть лишь те счета, в которых
            res[1] += !!el.price? 0: 1;                       // исследуемый товар - единственный

            return [res[0],res[1]]
        }
        ,[0,0]);
    const result = sum/(count - ignored);
    return !isNaN(result)? result : 0;
}

/**
 * Получение среднего интервала времени между двумя покупками
 * @param category
 * @returns {number}
 */
function getCategoryAVGTime(category) {
    let intervals = [];
    for(let i = 0;i < category.length;i ++){
        if(i === 0) continue;
        intervals.push(category[i].time - category[i-1].time)
    }

    let sum = intervals.reduce((memo,el)=>memo + el,0);

    let res = sum/intervals.length;
    return !isNaN(res)? res : 0;
}

/**
 * Вывод подготовленного объекта категорий без фильтрации
 * @param categories
 */
function getCategoriesWithAVG(categories) {
    let names = Object.keys(categories);
    let values = Object.values(categories);

    return values.map((el,i)=>{
        const avg = getCategoryAvg(el);
        const avgTime = getCategoryAVGTime(el);
        return {name:names[i],avg:avg,avgTime:avgTime};
    })
}

export const getCategories = (state) => state.TasksAccountsReducer.categories;
export const getUnfilteredCategories = createSelector([getCategories],getCategoriesWithAVG);


