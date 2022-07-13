/**
 * tabKey切换初始化日期设置
 * @param thisObj DateDrop的this
 * @return {string}
 * @constructor
 */
const DisableArrow = (thisObj) => {
    const {
        toggleVal,
        yearActiveStart,
        yearActiveEnd,
        panelYearStart, panelYearEnd,
        yearActiveStartLeft, yearActiveStartRight,
        yearActiveEndLeft
    } = thisObj;
    if (toggleVal) {
        if (panelYearStart) {
            thisObj.disableYearStartLeft = yearActiveStartLeft <= 1900;
            let year;
            if (panelYearEnd) year = yearActiveEndLeft;
            else year = yearActiveEnd;
            const status = yearActiveStartRight >= (year - 1);
            thisObj.disableYearStartRight = status;
            thisObj.disableYearEndLeft = status;
        } else if (panelYearEnd) {
            let year;
            if (panelYearStart) year = yearActiveStartRight;
            else year = yearActiveStart;
            const status = (yearActiveEndLeft - 1) <= year;
            thisObj.disableYearEndLeft = status;
            thisObj.disableYearStartRight = status;
        } else {
            thisObj.disableYearStartLeft = yearActiveStart <= 1900;
            const activeStart = yearActiveStart,
                activeEnd = yearActiveEnd;
            thisObj.disableYearStartRight = (activeEnd - 1) <= activeStart;
            thisObj.disableYearEndLeft = (activeEnd - 1) <= activeStart;
        }
    } else {
        thisObj.disableYearStartLeft = yearActiveStart <= 1900;
        thisObj.disableYearStartRight = false;
    }
};

export default DisableArrow;
