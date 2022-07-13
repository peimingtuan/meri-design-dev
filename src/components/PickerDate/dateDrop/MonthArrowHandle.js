import DisableArrow from './DisableArrow';
import { DayInitStart, DayInitEnd } from './DayInit';
import { WeekInitStart, WeekInitEnd } from './WeekInit';

const MonthArrowHandleStart = (thisObj, panel, sign) => {
    const {
        tabKey, sort, toggleVal,
        yearActiveStart, monthActiveStart, dayActiveStart
    } = thisObj;

    let yearActive, monthActive; // 当前激活的年
    const ma = (sign === '+') ? (Number(monthActiveStart) + 1) : (monthActiveStart - 1);
    if (ma === 0) {
        monthActive = '12';
        yearActive = String(yearActiveStart - 1);
    } else if (ma === 13) {
        monthActive = '01';
        yearActive = String(Number(yearActiveStart) + 1);
    } else {
        monthActive = ma < 10 ? `0${ma}` : `${ma}`;
        yearActive = yearActiveStart;
    }
    thisObj.yearActiveStart = yearActive;
    thisObj.monthActiveStart = monthActive;
    const date = `${yearActive}.${monthActive}.${dayActiveStart}`;

    if (tabKey === 'day') {
        DayInitStart(thisObj, date);
    } else {
        // tabKey === 'week'
        WeekInitStart(thisObj, date, sort);
    }
};
const MonthArrowHandleEnd = (thisObj, panel, sign) => {
    const {
        tabKey, sort,
        yearActiveEnd, monthActiveEnd, dayActiveEnd
    } = thisObj;

    let yearActive, monthActive; // 当前激活的年
    const ma = (sign === '+') ? (Number(monthActiveEnd) + 1) : (monthActiveEnd - 1);
    if (ma === 0) {
        monthActive = '12';
        yearActive = String(yearActiveEnd - 1);
    } else if (ma === 13) {
        monthActive = '01';
        yearActive = String(Number(yearActiveEnd) + 1);
    } else {
        monthActive = ma < 10 ? `0${ma}` : `${ma}`;
        yearActive = yearActiveEnd;
    }
    thisObj.yearActiveEnd = yearActive;
    thisObj.monthActiveEnd = monthActive;
    const date = `${yearActive}.${monthActive}.${dayActiveEnd}`;

    if (tabKey === 'day') {
        DayInitEnd(thisObj, date);
    } else {
        // tabKey === 'week'
        WeekInitEnd(thisObj, date, sort);
    }
};
/**
 * 上一月箭头切换
 * @param thisObj DateDrop的this
 * @param panel
 * @param sign [-, +]
 * @constructor
 */
const MonthArrowHandle = (thisObj, panel, sign) => {
    if (panel === 'start') {
        // 时间段、点选择时切换（多选、单选）
        MonthArrowHandleStart(thisObj, panel, sign);
    } else {
        // 结束面板时间段选择时切换（多选）
        MonthArrowHandleEnd(thisObj, panel, sign);
    }

    setTimeout(() => {
        DisableArrow(thisObj);
    });
};

export default MonthArrowHandle;
