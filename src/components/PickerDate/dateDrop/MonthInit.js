import CountMonth from '../../static/utils/datePicker/CountMonth';
import { SetMonthsArrayDisabled } from '../../static/utils/datePicker/SetDataArrayDisabled';
import { DateFormat } from './DateFormatUtils';

const CountMonthArray = (date) => {
    const countMonth = new CountMonth(date); // 当前计算年、月的对象
    return countMonth.getMonthsArray();
};

const MonthInitStart = (thisObj, date, sameYear) => {
    const {
        toggleVal,
        clickYearSelectedStart, clickMonthSelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd,
        yearActiveEnd, monthActiveEnd,
        panelMonthStart,
        ymdLimitStart
    } = thisObj;
    const monthsArrayStart = SetMonthsArrayDisabled(ymdLimitStart, CountMonthArray(date));
    const dateS = clickYearSelectedStart + clickMonthSelectedStart,
        dateE = clickYearSelectedEnd + clickMonthSelectedEnd;
    if (toggleVal) {
        if (panelMonthStart) {
            const dateE2 = dateE || (yearActiveEnd + monthActiveEnd);
            monthsArrayStart.forEach(d => {
                const dateC = d.year + d.month;
                /*
                if (dateC === dateS) d.selected = 'selected';
                else if (dateC >= dateE) d.disabled = 'disabled';
                else d.selected = '';
                */
                if (dateC >= dateE2) d.disabled = 'disabled';
                else if (dateC === dateS) d.selected = 'selected';
                else d.selected = '';
            });
        } else {
            if (sameYear) {
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
                if (clickMonthSelectedEnd) {
                    monthsArrayStart.forEach(d => {
                        const dateC = d.year + d.month;
                        if (dateC === dateS) d.selected = 'selected';
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
            }
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
};

const MonthInitEnd = (thisObj, date, sameYear) => {
    const {
        clickYearSelectedStart, clickMonthSelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd,
        yearActiveStart, monthActiveStart,
        panelMonthEnd,
        ymdLimitEnd
    } = thisObj;
    const monthsArrayEnd = SetMonthsArrayDisabled(ymdLimitEnd, CountMonthArray(date));
    const dateS = clickYearSelectedStart + clickMonthSelectedStart,
        dateE = clickYearSelectedEnd + clickMonthSelectedEnd;
    if (panelMonthEnd) {
        const dateS2 = dateS || (yearActiveStart + monthActiveStart);
        // 设置月active面板
        monthsArrayEnd.forEach(d => {
            const dateC = d.year + d.month;
            if (dateC === dateE) d.selected = 'selected';
            else if (dateC <= dateS2) d.disabled = 'disabled';
            else d.selected = '';
        });
    } else {
        if (clickMonthSelectedStart) {
            if (clickMonthSelectedEnd) {
                if (sameYear) {
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
                        if (dateC === dateE) {
                            d.selected = 'selected';
                        } else if (dateC > dateS && dateC < dateE) {
                            d.multiple = 'multiple';
                        } else {
                            d.selected = '';
                            d.multiple = '';
                        }
                    });
                }
            } else {
                monthsArrayEnd.forEach(d => {
                    const dateC = d.year + d.month;
                    if (dateC === dateS) d.selected = 'selected';
                    else d.selected = '';
                });
            }
        }
    }
    thisObj.monthsArrayEnd = monthsArrayEnd;
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
