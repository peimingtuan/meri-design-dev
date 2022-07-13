import CountMonth from '../../static/utils/datePicker/CountMonth';
import { DateFormat } from '../../PickerDate/dateDrop/DateFormatUtils';
import LockMonthHandle from './LockMonthHandle';
import SetMaxLenDisable from './SetMaxLenDisable';

const CountMonthArray = (date, yearNow, monthNow, lockCycle) => {
    const countMonth = new CountMonth(date); // 当前计算年、月的对象
    const dateN = yearNow + monthNow,
        dateL = LockMonthHandle({ year: yearNow, month: monthNow }, '-').join('');
    return countMonth.getMonthsArray().map(d => {
        const dateC = d.year + d.month;
        if (dateC > dateN || dateC < 190001) d.disabled = 'disabled';
        else if (lockCycle && dateC <= dateN && dateC > dateL) d.grey = 'grey';
        return d;
    });
};

const MonthInitStart = (thisObj, date) => {
    const {
        toggleVal, lockCycle,
        yearNow, monthNow,
        clickYearSelectedStart, clickMonthSelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd,
        maxLen
    } = thisObj;
    const monthsArrayStart = CountMonthArray(date, yearNow, monthNow, (toggleVal && lockCycle));
    const dateS = clickYearSelectedStart + clickMonthSelectedStart,
        dateE = clickYearSelectedEnd + clickMonthSelectedEnd;
    if (toggleVal) {
        if (clickMonthSelectedEnd) {
            monthsArrayStart.forEach(d => {
                const dateC = d.year + d.month;
                if (dateC === dateS || dateC === dateE) d.selected = 'selected';
                else if (dateC > dateS && dateC < dateE) d.multiple = 'multiple';
                else {
                    d.selected = '';
                    d.multiple = '';
                }
            });
        } else {
            monthsArrayStart.forEach(d => {
                const dateC = d.year + d.month;
                if (dateC === dateS) d.selected = 'selected';
                else d.selected = '';
            });
        }
    } else {
        // 设置月单选面板
        monthsArrayStart.forEach(d => {
            const dateC = d.year + d.month;
            if (dateC === dateS) d.selected = 'selected';
            else d.selected = '';
        });
    }
    thisObj.monthsArrayStart = monthsArrayStart;
    if (toggleVal && maxLen && clickYearSelectedStart && !clickYearSelectedEnd) {
        SetMaxLenDisable(thisObj);
    }
};

const MonthInitEnd = (thisObj, date) => {
    const {
        lockCycle,
        yearNow, monthNow,
        clickYearSelectedStart, clickMonthSelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd,
        maxLen
    } = thisObj;
    const monthsArrayEnd = CountMonthArray(date, yearNow, monthNow, lockCycle);
    const dateS = clickYearSelectedStart + clickMonthSelectedStart,
        dateE = clickYearSelectedEnd + clickMonthSelectedEnd;
    if (clickMonthSelectedStart) {
        if (clickMonthSelectedEnd) {
            monthsArrayEnd.forEach(d => {
                const dateC = d.year + d.month;
                if (dateC === dateS || dateC === dateE) {
                    d.selected = 'selected';
                } else if (dateC > dateS && dateC < dateE) {
                    d.multiple = 'multiple';
                } else {
                    d.selected = '';
                    d.multiple = '';
                }
            });
        } else {
            monthsArrayEnd.forEach(d => {
                const dateC = d.year + d.month;
                if (dateC === dateS) d.selected = 'selected';
                else d.selected = '';
            });
        }
    }
    thisObj.monthsArrayEnd = monthsArrayEnd;
    if (maxLen && clickYearSelectedStart && !clickYearSelectedEnd) {
        SetMaxLenDisable(thisObj);
    }
};

/**
 * 周初始化
 * @param thisObj DateDrop的this
 * @param date 传入的日期
 * @param toggleVal
 * @constructor
 */
const MonthInit = (thisObj, date, toggleVal) => {
    if (toggleVal) {
        const [dateStart, dateEnd] = DateFormat(date);
        const { clickYearSelectedStart, clickYearSelectedEnd } = thisObj;
        const sameYear = clickYearSelectedStart === clickYearSelectedEnd; // 是否在同一年
        MonthInitEnd(thisObj, dateEnd, sameYear);
        MonthInitStart(thisObj, dateStart, sameYear);
    } else {
        MonthInitStart(thisObj, date);
    }
};

export { MonthInitStart, MonthInitEnd, MonthInit };
