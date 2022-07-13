import { SetYear } from './SetArray';
import { DayInitStart, DayInitEnd } from './DayInit';
import { WeekInitStart, WeekInitEnd } from './WeekInit';
import { MonthInitStart, MonthInitEnd } from './MonthInit';
import DisableArrow from './DisableArrow';

/**
 * 点击日期
 * @param thisObj DateDrop的this
 * @param obj {year}
 * @param panel 目前点击的是哪个面板
 */
const YearPanelChange = (thisObj, { year }, panel) => {
    const {
        toggleVal, tabKey, sort,
        clickYearSelectedStart, clickMonthSelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd,
        yearsArrayStart, yearsArrayEnd,
        panelYearStart, panelYearEnd,
        panelMonthStart, panelMonthEnd,
        monthActiveStart, dayActiveStart,
        monthActiveEnd, dayActiveEnd
    } = thisObj;
    let clearOther = false,
        same;
    if (tabKey === 'month') same = clickYearSelectedStart === clickYearSelectedEnd;
    else same = (clickYearSelectedStart + clickMonthSelectedStart) === (clickYearSelectedEnd + clickMonthSelectedEnd);
    if (panel === 'start' && panelYearStart) {
        // 如果是快速选择年情况下
        if (panelMonthStart) {
            // 月快速切换面板情况下
            MonthInitStart(thisObj, `${year}.${monthActiveStart}`, same);
        } else {
            if (tabKey === 'day') {
                DayInitStart(thisObj, `${year}.${monthActiveStart}.${dayActiveStart}`);
            } else if (tabKey === 'week') {
                WeekInitStart(thisObj, `${year}.${monthActiveStart}.${dayActiveStart}`, sort, same);
            } else {
                // tabKey === 'month'
                MonthInitStart(thisObj, `${year}.${monthActiveStart}`, same);
            }
            setTimeout(() => {
                DisableArrow(thisObj);
            });
        }
        thisObj.yearActiveStart = year;
        thisObj.panelYearStart = false;
        return;
    }
    if (panel === 'end' && panelYearEnd) {
        if (panelMonthEnd) {
            MonthInitEnd(thisObj, `${year}.${monthActiveEnd}`, same);
        } else {
            if (tabKey === 'day') {
                DayInitEnd(thisObj, `${year}.${monthActiveEnd}.${dayActiveEnd}`);
            } else if (tabKey === 'week') {
                WeekInitEnd(thisObj, `${year}.${monthActiveEnd}.${dayActiveEnd}`, sort, same);
            } else {
                // tabKey === 'month'
                MonthInitEnd(thisObj, `${year}.${monthActiveEnd}`, same);
            }
            setTimeout(() => {
                DisableArrow(thisObj);
            });
        }
        thisObj.yearActiveEnd = year;
        thisObj.panelYearEnd = false;
        return;
    }
    if (toggleVal) {
        if (clickYearSelectedStart) {
            if (clickYearSelectedEnd) {
                thisObj.clickYearSelectedStart = year;
                // thisObj.clickMonthSelectedStart = '';
                // thisObj.clickDaySelectedStart = '';
                thisObj.clickSelectedDateStart = year;

                thisObj.clickYearSelectedEnd = '';
                thisObj.clickMonthSelectedEnd = '';
                thisObj.clickDaySelectedEnd = '';
                thisObj.clickSelectedDateEnd = '';

                thisObj.clickThTextSelectedEnd = '';
                clearOther = true;
            } else {
                if (year < clickYearSelectedStart) {
                    thisObj.clickYearSelectedEnd = clickYearSelectedStart;
                    thisObj.clickSelectedDateEnd = clickYearSelectedStart;
                    thisObj.clickYearSelectedStart = year;
                    thisObj.clickSelectedDateStart = year;
                } else {
                    thisObj.clickYearSelectedEnd = year;
                    thisObj.clickSelectedDateEnd = year;
                }
            }
        } else {
            thisObj.clickYearSelectedStart = year;
            thisObj.clickSelectedDateStart = year;
        }

        if (thisObj.clickYearSelectedStart && thisObj.clickYearSelectedEnd) thisObj.btnType = 'primary';
        else thisObj.btnType = 'disabled';
        if (panel === 'start') {
            thisObj.yearsArrayStart = SetYear(yearsArrayStart, { year }, clearOther, toggleVal);
            if (!thisObj.clickSelectedDateEnd) thisObj.yearsArrayEnd = SetYear(yearsArrayEnd, { year: '' }, true, toggleVal);
        } else {
            thisObj.yearsArrayEnd = SetYear(yearsArrayEnd, { year }, clearOther, toggleVal);
            if (!thisObj.clickSelectedDateEnd) thisObj.yearsArrayStart = SetYear(yearsArrayStart, { year: '' }, true, toggleVal);
        }
    } else {
        // 单选
        thisObj.clickYearSelectedStart = year;
        thisObj.clickSelectedDateStart = year;
        thisObj.yearsArrayStart = SetYear(yearsArrayStart, { year });
        thisObj.btnType = 'primary';
    }
};

const YearPanelEnter = (thisObj, { year }, panel) => {
    const {
        clickYearSelectedStart,
        yearsArrayStart, yearsArrayEnd
    } = thisObj;
    const dateS = clickYearSelectedStart,
        dateN = year;
    if (panel === 'start') {
        // 点击的时间小于结束面板的active时间
        if (dateN < dateS) {
            thisObj.yearsArrayStart = yearsArrayStart.map(d => {
                const dateC = d.year;
                if (!d.disabled && dateC >= dateN && dateC < dateS) d.multiple = 'multiple';
                else d.multiple = '';
                return d;
            });
            if (yearsArrayEnd.findIndex(d => d.year === dateS)) {
                thisObj.yearsArrayEnd = yearsArrayEnd.map(d => {
                    const dateC = d.year;
                    if (!d.disabled && dateC < dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
            }
        } else {
            thisObj.yearsArrayStart = yearsArrayStart.map(d => {
                const dateC = d.year;
                if (!d.disabled && dateC <= dateN && dateC > dateS) d.multiple = 'multiple';
                else d.multiple = '';
                return d;
            });
        }
    } else {
        // panel === 'end'
        if (dateN < dateS) {
            thisObj.yearsArrayEnd = yearsArrayEnd.map(d => {
                const dateC = d.year;
                if (!d.disabled && dateC >= dateN && dateC < dateS) d.multiple = 'multiple';
                else d.multiple = '';
                return d;
            });
        } else {
            thisObj.yearsArrayStart = yearsArrayStart.map(d => {
                const dateC = d.year;
                if (!d.disabled && dateC > dateS) d.multiple = 'multiple';
                else d.multiple = '';
                return d;
            });
            thisObj.yearsArrayEnd = yearsArrayEnd.map(d => {
                const dateC = d.year;
                if (!d.disabled && dateC <= dateN && dateC > dateS) d.multiple = 'multiple';
                else d.multiple = '';
                return d;
            });
        }
    }
};

export {
    YearPanelChange, YearPanelEnter
};
