import DisableArrow from './DisableArrow';
import { DayInitStart, DayInitEnd } from './DayInit';
import { WeekInitStart, WeekInitEnd } from './WeekInit';
import { MonthInitStart, MonthInitEnd } from './MonthInit';
import { YearInitStart, YearInitEnd } from './YearInit';

const YearArrowHandleStart = (thisObj, sign) => {
    const {
        tabKey, sort,
        yearActiveStart, monthActiveStart, dayActiveStart,
        yearActiveEnd, monthActiveEnd,
        yearActiveStartLeft, yearActiveStartRight,
        panelMonthStart,
        panelYearStart,
        monthsArrayEnd,
        clickYearSelectedStart, clickMonthSelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd
    } = thisObj;
    let dateY, dateYM, dateYMD; // 当前激活的年
    if (tabKey === 'year') {
        dateY = String((sign === '+') ? (Number(yearActiveStartRight) + 12) : (yearActiveStartRight - 12));
    } else {
        const yearActive = String((sign === '+') ? (Number(yearActiveStart) + 1) : (yearActiveStart - 1));
        thisObj.yearActiveStart = yearActive;
        dateYM = `${yearActive}.${monthActiveStart}`;
        dateYMD = `${yearActive}.${monthActiveStart}.${dayActiveStart}`;
    }
    if (panelMonthStart) {
        // 月快速选择面板显示状态下
        MonthInitStart(thisObj, dateYM);
        if (thisObj.yearActiveStart === yearActiveEnd) {
            const dateS = thisObj.yearActiveStart + monthActiveStart,
                dateE = yearActiveEnd + monthActiveEnd;
            thisObj.monthsArrayEnd = monthsArrayEnd.map(d => {
                const dateC = d.year + d.month;
                if (dateC === dateE) d.selected = 'selected';
                else if (dateC <= dateS) d.disabled = 'disabled';
                else d.selected = '';
                return d;
            });
        } else {
            thisObj.monthsArrayEnd = monthsArrayEnd.map(d => {
                d.disabled = '';
                return d;
            });
        }
    } else if (panelYearStart) {
        const year = (sign === '-') ? String(yearActiveStartLeft - 1) : String(Number(yearActiveStartRight) + 12);
        YearInitStart(thisObj, year);
    } else {
        if (tabKey === 'day') {
            DayInitStart(thisObj, dateYMD, ((clickYearSelectedStart + clickMonthSelectedStart) === (clickYearSelectedEnd + clickMonthSelectedEnd)));
        } else if (tabKey === 'week') {
            WeekInitStart(thisObj, dateYMD, sort, ((clickYearSelectedStart + clickMonthSelectedStart) === (clickYearSelectedEnd + clickMonthSelectedEnd)));
        } else if (tabKey === 'month') {
            MonthInitStart(thisObj, dateYM, (clickYearSelectedStart === clickYearSelectedEnd));
        } else {
            YearInitStart(thisObj, dateY);
        }
    }
};

const YearArrowHandleEnd = (thisObj, sign) => {
    const {
        tabKey, sort,
        yearActiveStart, monthActiveStart,
        yearActiveEnd, monthActiveEnd, dayActiveEnd,
        yearActiveEndLeft, yearActiveEndRight,
        panelMonthEnd,
        panelYearEnd,
        monthsArrayStart,
        clickYearSelectedStart, clickMonthSelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd
    } = thisObj;
    let dateY, dateYM, dateYMD; // 当前激活的年
    if (tabKey === 'year') {
        dateY = String((sign === '+') ? (Number(yearActiveEndRight) + 12) : (yearActiveEndRight - 12));
    } else {
        const yearActive = String((sign === '+') ? (Number(yearActiveEnd) + 1) : (yearActiveEnd - 1));
        thisObj.yearActiveEnd = yearActive;
        dateYM = `${yearActive}.${monthActiveEnd}`;
        dateYMD = `${yearActive}.${monthActiveEnd}.${dayActiveEnd}`;
    }
    if (panelMonthEnd) {
        MonthInitEnd(thisObj, dateYM);
        if (thisObj.yearActiveEnd === yearActiveStart) {
            const dateS = yearActiveStart + monthActiveStart,
                dateE = thisObj.yearActiveEnd + monthActiveEnd;
            thisObj.monthsArrayStart = monthsArrayStart.map(d => {
                const dateC = d.year + d.month;
                if (dateC === dateS) d.selected = 'selected';
                else if (dateC >= dateE) d.disabled = 'disabled';
                else d.selected = '';
                return d;
            });
        } else {
            thisObj.monthsArrayStart = monthsArrayStart.map(d => {
                d.disabled = '';
                return d;
            });
        }
    } else if (panelYearEnd) {
        const year = (sign === '-') ? String(yearActiveEndLeft - 1) : String(Number(yearActiveEndRight) + 12);
        YearInitEnd(thisObj, year);
    } else {
        if (tabKey === 'day') {
            // DayInitEnd(thisObj, dateYMD, ((clickYearSelectedStart + clickMonthSelectedStart) === (clickYearSelectedEnd + clickMonthSelectedEnd)));
            DayInitEnd(thisObj, dateYMD);
        } else if (tabKey === 'week') {
            WeekInitEnd(thisObj, dateYMD, sort, ((clickYearSelectedStart + clickMonthSelectedStart) === (clickYearSelectedEnd + clickMonthSelectedEnd)));
        } else if (tabKey === 'month') {
            MonthInitEnd(thisObj, dateYM, (clickYearSelectedStart === clickYearSelectedEnd));
        } else {
            YearInitEnd(thisObj, dateY);
        }
    }
};

/**
 * 下一年箭头切换
 * @param thisObj DateDrop的this
 * @param panel
 * @param sign [-, +]
 * @constructor
 */
const YearArrowHandle = (thisObj, panel, sign) => {
    if (panel === 'start') {
        // 时间段、点选择时切换（多选、单选）
        YearArrowHandleStart(thisObj, sign);
    } else {
        // 结束面板时间段选择时切换（多选）
        YearArrowHandleEnd(thisObj, sign);
    }

    setTimeout(() => {
        DisableArrow(thisObj);
    });
};

export default YearArrowHandle;
