import { SetMonth } from './SetArray';
import LeapYear from '../../static/utils/datePicker/LeapYear';
import { DayInit, DayInitStart, DayInitEnd } from './DayInit';
import { WeekInit, WeekInitStart, WeekInitEnd } from './WeekInit';
import DisableArrow from './DisableArrow';
/**
 * 点击日期
 * @param thisObj DateDrop的this
 * @param obj {year, month}
 * @param panel 目前点击的是哪个面板
 */
const MonthPanelChange = (thisObj, { year, month }, panel) => {
    let clearOther = false;
    const {
        toggleVal, tabKey, format, sort,
        panelMonthStart, panelMonthEnd,
        dayActiveStart,
        dayActiveEnd,
        timeStart,
        clickYearSelectedStart, clickMonthSelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd,
        monthsArrayStart, monthsArrayEnd,
        clickSelectedDateStart
    } = thisObj;
    const same = (clickYearSelectedStart + clickMonthSelectedStart) === (clickYearSelectedEnd + clickMonthSelectedEnd);
    // const same = clickMonthSelectedStart && (clickYearSelectedStart + clickMonthSelectedStart) === (clickYearSelectedEnd + clickMonthSelectedEnd);
    if (panel === 'start' && panelMonthStart) {
        thisObj.panelMonthStart = false;
        if (tabKey === 'day') {
            DayInitStart(thisObj, `${year}.${month}.${dayActiveStart}`, same);
            // DayInitStart(thisObj, `${year}.${month}.${dayActiveStart}`, clickSelectedDateStart);
        } else {
            // tabKey === 'week'
            WeekInitStart(thisObj, `${year}.${month}.${dayActiveStart}`, sort, same);
        }
        thisObj.yearActiveStart = year;
        thisObj.monthActiveStart = month;
        // thisObj.panelMonthStart = false;
        DisableArrow(thisObj);
        return;
    }
    if (panel === 'end' && panelMonthEnd) {
        thisObj.panelMonthEnd = false;
        if (tabKey === 'day') {
            // DayInitEnd(thisObj, `${year}.${month}.${dayActiveEnd}`, same);
            DayInitEnd(thisObj, `${year}.${month}.${dayActiveEnd}`, clickSelectedDateStart);
        } else {
            // tabKey === 'week'
            WeekInitEnd(thisObj, `${year}.${month}.${dayActiveEnd}`, sort, same);
        }
        thisObj.yearActiveEnd = year;
        thisObj.monthActiveEnd = month;
        // thisObj.panelMonthEnd = false;
        DisableArrow(thisObj);
        return;
    }
    if (toggleVal) {
        // if (panelMonthStart) {}
        if (clickYearSelectedStart) {
            if (clickYearSelectedEnd) {
                thisObj.clickYearSelectedStart = year;
                thisObj.clickMonthSelectedStart = month;
                // thisObj.clickDaySelectedStart = '';
                thisObj.clickSelectedDateStart = `${year}.${month}`;

                thisObj.clickYearSelectedEnd = '';
                thisObj.clickMonthSelectedEnd = '';
                thisObj.clickDaySelectedEnd = '';
                thisObj.clickSelectedDateEnd = '';

                thisObj.clickThTextSelectedEnd = '';
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
    } else {
        // 单选
        if (panelMonthStart) {
            thisObj.yearActiveStart = year;
            thisObj.monthActiveStart = month;
            let d = dayActiveStart;
            const y = year,
                m = month;
            if (tabKey === 'day') {
                if (m === '02' && d >= 29) {
                    if (LeapYear(y)) d = '29';
                    else d = '28';
                }
                const date = `${y}.${m}.${d}${format ? ` ${timeStart}` : ''}`;
                DayInit(thisObj, date, toggleVal);
            } else {
                // tabKey==='week'
                WeekInit(thisObj, `${y}.${m}.${d}`, toggleVal);
            }
            thisObj.panelMonthStart = false;
            thisObj.btnType = 'disabled';
        } else {
            thisObj.clickYearSelectedStart = year;
            thisObj.clickMonthSelectedStart = month;
            thisObj.clickSelectedDateStart = `${year}.${month}`;
            thisObj.monthsArrayStart = SetMonth(monthsArrayStart, { year, month });
            thisObj.btnType = 'primary';
        }
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
                    if (!d.disabled && dateC >= dateN && dateC < dateS) d.multiple = 'multiple';
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
