import { MonthInitStart, MonthInit } from './MonthInit';
import DisableArrow from './DisableArrow';

/**
 * 开关切换
 * @param thisObj DateDrop的this
 * @param toggle
 * @constructor
 */
const ToggleHandle = (thisObj, toggle) => {
    const {
        yearNow, monthNow,
        yearActiveStart, monthActiveStart,
        clickYearSelectedStart, clickMonthSelectedStart
    } = thisObj;
    // 切换到时间点时 清空结束时间面板的状态
    thisObj.clickYearSelectedEnd = '';
    thisObj.clickMonthSelectedEnd = '';
    thisObj.clickDaySelectedEnd = '';
    thisObj.clickSelectedDateEnd = '';
    thisObj.clickThTextSelectedEnd = '';
    if (toggle) {
        // 切换到时间段时 清空开始时间面板的状态
        thisObj.clickYearSelectedStart = '';
        thisObj.clickMonthSelectedStart = '';
        thisObj.clickDaySelectedStart = '';
        thisObj.clickSelectedDateStart = '';
        thisObj.clickThTextSelectedStart = '';
        let ys, ye;
        if (yearActiveStart === yearNow) {
            ys = String(yearActiveStart - 1);
            ye = yearActiveStart;
        } else {
            ys = yearActiveStart;
            ye = String(Number(yearActiveStart) + 1);
        }
        thisObj.yearActiveStart = ys;
        thisObj.yearActiveEnd = ye;
        const initDate = `${ys}.${monthActiveStart}-${ye}.${monthActiveStart}`;
        MonthInit(thisObj, initDate, true);
        thisObj.btnType = 'disabled';
    } else {
        let y = yearNow,
            m = monthNow;
        if (clickYearSelectedStart) {
            y = clickYearSelectedStart;
            m = clickMonthSelectedStart;
        }
        const initDate = `${y}.${m}`;
        MonthInitStart(thisObj, initDate);
        thisObj.yearActiveStart = y;
        thisObj.monthActiveStart = m;

        const dateYMS = clickYearSelectedStart + clickMonthSelectedStart;
        if (dateYMS) thisObj.btnType = 'primary';
        else thisObj.btnType = 'disabled';
    }
    DisableArrow(thisObj);
};

export default ToggleHandle;
