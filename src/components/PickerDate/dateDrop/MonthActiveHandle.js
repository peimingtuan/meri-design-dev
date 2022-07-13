import { MonthInitStart, MonthInitEnd } from './MonthInit';
/**
 * 点击激活的月-显示月面板
 * @param thisObj DateDrop的this
 * @param panel
 * @constructor
 */
const MonthActiveHandle = (thisObj, panel) => {
    const {
        tabKey,
        yearActiveStart, monthActiveStart,
        yearActiveEnd, monthActiveEnd
    } = thisObj;
    if (tabKey === 'year' || tabKey === 'month') return;
    if (panel === 'start') {
        thisObj.panelMonthStart = true;
        MonthInitStart(thisObj, `${yearActiveStart}.${monthActiveStart}`);
    } else {
        thisObj.panelMonthEnd = true;
        MonthInitEnd(thisObj, `${yearActiveEnd}.${monthActiveEnd}`);
    }
};

export default MonthActiveHandle;
