import DisableArrow from './DisableArrow';
import { MonthInitStart, MonthInitEnd } from './MonthInit';
import { YearInitStart, YearInitEnd } from './YearInit';

const YearArrowHandleStart = (thisObj, sign) => {
    const {
        yearActiveStart, monthActiveStart,
        yearActiveStartLeft, yearActiveStartRight,
        panelYearStart,
        clickYearSelectedStart,
        clickYearSelectedEnd
    } = thisObj;
    const yearActive = String((sign === '+') ? (Number(yearActiveStart) + 1) : (yearActiveStart - 1));
    thisObj.yearActiveStart = yearActive;
    if (panelYearStart) {
        const year = (sign === '-') ? String(yearActiveStartLeft - 1) : String(Number(yearActiveStartRight) + 12);
        YearInitStart(thisObj, year);
    } else {
        const dateYM = `${yearActive}.${monthActiveStart}`;
        MonthInitStart(thisObj, dateYM, (clickYearSelectedStart === clickYearSelectedEnd));
    }
};

const YearArrowHandleEnd = (thisObj, sign) => {
    const {
        yearActiveEnd, monthActiveEnd,
        yearActiveEndLeft, yearActiveEndRight,
        panelYearEnd,
        clickYearSelectedStart,
        clickYearSelectedEnd
    } = thisObj;
    const yearActive = String((sign === '+') ? (Number(yearActiveEnd) + 1) : (yearActiveEnd - 1));
    thisObj.yearActiveEnd = yearActive;
    if (panelYearEnd) {
        const year = (sign === '-') ? String(yearActiveEndLeft - 1) : String(Number(yearActiveEndRight) + 12);
        YearInitEnd(thisObj, year);
    } else {
        const dateYM = `${yearActive}.${monthActiveEnd}`;
        MonthInitEnd(thisObj, dateYM, (clickYearSelectedStart === clickYearSelectedEnd));
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
