import { SetMonth } from '../../PickerDate/dateDrop/SetArray';
import LockMonthHandle from './LockMonthHandle';
// import { MonthInit, MonthInitStart } from './MonthInit';
import { MonthInit } from './MonthInit';
import SetMaxLenDisable from './SetMaxLenDisable';

/**
 * 点击日期
 * @param thisObj DateDrop的this
 * @param obj {year, month}
 * @param panel 目前点击的是哪个面板
 */
const MonthPanelChange = (thisObj, { year, month }, panel) => {
    let clearOther = false;
    const {
        toggleVal, lockCycle, maxLen,
        clickYearSelectedStart, clickMonthSelectedStart,
        clickYearSelectedEnd,
        monthsArrayStart, monthsArrayEnd
    } = thisObj;
    if (toggleVal) {
        if (lockCycle) {
            // 锁定周期开启
            const [ys, ms] = LockMonthHandle({ year, month }, '+');
            thisObj.clickYearSelectedStart = year;
            thisObj.clickMonthSelectedStart = month;
            thisObj.clickSelectedDateStart = `${year}.${month}`;
            thisObj.yearActiveStart = year;
            thisObj.monthActiveStart = month;
            thisObj.clickYearSelectedEnd = ys;
            thisObj.clickMonthSelectedEnd = ms;
            thisObj.clickSelectedDateEnd = `${ys}.${ms}`;
            let y = ys;
            if (year === ys) y = String(Number(ys) + 1);
            thisObj.yearActiveEnd = y;
            thisObj.monthActiveEnd = ms;
            const initDate = `${year}.${month}-${y}.${ms}`;
            MonthInit(thisObj, initDate, true);
            thisObj.btnType = 'primary';
            return;
        }
        if (clickYearSelectedStart) {
            if (clickYearSelectedEnd) {
                thisObj.clickYearSelectedStart = year;
                thisObj.clickMonthSelectedStart = month;
                thisObj.clickDaySelectedStart = '';
                thisObj.clickSelectedDateStart = `${year}.${month}`;

                thisObj.clickYearSelectedEnd = '';
                thisObj.clickMonthSelectedEnd = '';
                thisObj.clickDaySelectedEnd = '';
                thisObj.clickSelectedDateEnd = '';
                clearOther = true;
            } else {
                const nowSelected = year + month,
                    clickSelected = clickYearSelectedStart + clickMonthSelectedStart;
                if (nowSelected < clickSelected) {
                    thisObj.clickYearSelectedEnd = clickYearSelectedStart;
                    thisObj.clickMonthSelectedEnd = clickMonthSelectedStart;
                    thisObj.clickSelectedDateEnd = `${clickYearSelectedStart}.${clickMonthSelectedStart}`;
                    thisObj.clickYearSelectedStart = year;
                    thisObj.clickMonthSelectedStart = month;
                    thisObj.clickSelectedDateStart = `${year}.${month}`;
                } else {
                    thisObj.clickYearSelectedEnd = year;
                    thisObj.clickMonthSelectedEnd = month;
                    thisObj.clickSelectedDateEnd = `${year}.${month}`;
                }
            }
        } else {
            thisObj.clickYearSelectedStart = year;
            thisObj.clickMonthSelectedStart = month;
            // thisObj.clickDaySelectedStart = '';
            thisObj.clickSelectedDateStart = `${year}.${month}`;

            thisObj.clickYearSelectedEnd = '';
            thisObj.clickMonthSelectedEnd = '';
            // thisObj.clickDaySelectedEnd = '';
            thisObj.clickSelectedDateEnd = '';
        }

        if (thisObj.clickYearSelectedStart && thisObj.clickYearSelectedEnd) thisObj.btnType = 'primary';
        else thisObj.btnType = 'disabled';

        if (panel === 'start') {
            thisObj.monthsArrayStart = SetMonth(monthsArrayStart, { year, month }, clearOther, toggleVal);
            if (!thisObj.clickSelectedDateEnd) thisObj.monthsArrayEnd = SetMonth(monthsArrayEnd, { year: '', month: '' }, true, toggleVal);
        } else {
            thisObj.monthsArrayEnd = SetMonth(monthsArrayEnd, { year, month }, clearOther, toggleVal);
            if (!thisObj.clickSelectedDateEnd) thisObj.monthsArrayStart = SetMonth(monthsArrayStart, { year: '', month: '' }, true, toggleVal);
        }
        if (!!maxLen && thisObj.clickYearSelectedStart) {
            if (thisObj.clickYearSelectedEnd) {
                SetMaxLenDisable(thisObj, true);
            } else {
                SetMaxLenDisable(thisObj);
            }
        }
    } else {
        // 单选
        thisObj.clickYearSelectedStart = year;
        thisObj.clickMonthSelectedStart = month;
        thisObj.clickSelectedDateStart = `${year}.${month}`;
        thisObj.monthsArrayStart = SetMonth(monthsArrayStart, { year, month });
        thisObj.btnType = 'primary';
    }
};

const MonthPanelEnter = (thisObj, { year, month }, panel) => {
    const {
        clickYearSelectedStart, clickMonthSelectedStart,
        yearActiveStart: activeYMS,
        yearActiveEnd,
        monthsArrayStart, monthsArrayEnd
    } = thisObj;
    const dateS = clickYearSelectedStart + clickMonthSelectedStart,
        dateN = year + month,
        clickYMS = clickYearSelectedStart,
        activeYME = yearActiveEnd;

    if (panel === 'start') {
        // 点击的时间小于结束面板的active时间
        if (clickYMS <= activeYME) {
            // 当前hover的时间小于开始时间
            if (dateN < dateS) {
                thisObj.monthsArrayStart = monthsArrayStart.map(d => {
                    const dateC = d.year + d.month;
                    if (!d.disabled && dateC >= dateN && dateC < dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
            } else {
                thisObj.monthsArrayStart = monthsArrayStart.map(d => {
                    const dateC = d.year + d.month;
                    if (!d.disabled && dateC <= dateN && dateC > dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
            }
            // 根据条件判断是否清空结束面板-当选择的时间在开始面板里清空结束面板的multiple
            if (clickYMS === activeYME) {
                thisObj.monthsArrayEnd = monthsArrayEnd.map(d => {
                    const dateC = d.year + d.month;
                    if (!d.disabled && dateC < dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
            } else {
                thisObj.monthsArrayEnd = monthsArrayEnd.map(d => {
                    d.multiple = '';
                    return d;
                });
            }
        }
    } else {
        // panel === 'end'
        if (clickYMS <= activeYME) {
            if (dateN < dateS) {
                thisObj.monthsArrayEnd = monthsArrayEnd.map(d => {
                    const dateC = d.year + d.month;
                    if (!d.disabled && ((dateC >= dateN && dateC < dateS) || (dateC <= dateN && dateC > dateS))) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
                if (clickYMS >= activeYMS) {
                    thisObj.monthsArrayStart = monthsArrayStart.map(d => {
                        d.multiple = '';
                        return d;
                    });
                }
            } else {
                thisObj.monthsArrayStart = monthsArrayStart.map(d => {
                    const dateC = d.year + d.month;
                    if (!d.disabled && dateC > dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
                thisObj.monthsArrayEnd = monthsArrayEnd.map(d => {
                    const dateC = d.year + d.month;
                    if (!d.disabled && dateC <= dateN && dateC > dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
            }
        }
    }
};

export {
    MonthPanelChange, MonthPanelEnter
};
