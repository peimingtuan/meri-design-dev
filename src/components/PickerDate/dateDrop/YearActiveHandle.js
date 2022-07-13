import { YearInitStart, YearInitEnd } from './YearInit';
import DisableArrow from './DisableArrow';
/**
 * 点击激活的年-显示年面板
 * @param thisObj DateDrop的this
 * @param panel
 * @constructor
 */
const YearActiveHandle = (thisObj, panel) => {
    const {
        tabKey,
        yearActiveStart,
        yearActiveEnd,
        panelYearStart, panelYearEnd,
        yearActiveStartRight,
        yearActiveEndLeft
    } = thisObj;
    if (tabKey === 'year') return;
    if (panel === 'start') {
        let year = yearActiveEnd || yearActiveStart;
        if (panelYearEnd && yearActiveEndLeft) year = yearActiveEndLeft;
        const activeYear = String(year - 1);
        thisObj.panelYearStart = true;
        YearInitStart(thisObj, activeYear);
    } else {
        let year = yearActiveStart;
        if (panelYearStart && yearActiveStartRight) year = yearActiveStartRight;
        const activeYear = String(Number(year) + 12);
        thisObj.panelYearEnd = true;
        YearInitEnd(thisObj, activeYear);
    }
    DisableArrow(thisObj);
};

export default YearActiveHandle;
