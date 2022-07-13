import CountNextYear from '../../static/utils/datePicker/CountNextYear';
import CountNextMonth from '../../static/utils/datePicker/CountNextMonth';
import CountPrevYear from '../../static/utils/datePicker/CountPrevYear';
import CountPrevMonth from '../../static/utils/datePicker/CountPrevMonth';

/**
 * tabKey切换初始化日期设置
 * @param thisObj DateDrop的this
 * @return {string}
 * @constructor
 */
const DisableArrow = (thisObj) => {
    const {
        toggleVal, tabKey,
        yearActiveStart, monthActiveStart, dayActiveStart,
        yearActiveEnd, monthActiveEnd, dayActiveEnd,
        panelYearStart, panelYearEnd,
        panelMonthStart, panelMonthEnd,
        yearActiveStartLeft, yearActiveStartRight,
        yearActiveEndLeft
    } = thisObj;
    if (toggleVal) {
        const strategy = {
            // 年开始面板打开状态
            panelYearStart() {
                thisObj.disableYearStartLeft = yearActiveStartLeft <= 1900;
                let year;
                if (panelYearEnd) year = yearActiveEndLeft;
                else year = yearActiveEnd;
                const status = yearActiveStartRight >= (year - 1);
                thisObj.disableYearStartRight = status;
                thisObj.disableYearEndLeft = status;
            },
            // 年结束面板打开状态
            panelYearEnd() {
                let year;
                if (panelYearStart) year = yearActiveStartRight;
                else year = yearActiveStart;
                const status = (yearActiveEndLeft - 1) <= year;
                thisObj.disableYearEndLeft = status;
                thisObj.disableYearStartRight = status;
            },
            // 月开始或者结束面板打开状态
            panelMsOrMe() {
                thisObj.disableYearStartLeft = yearActiveStart <= 1900;
                const status = yearActiveStart >= yearActiveEnd;
                thisObj.disableYearStartRight = status;
                thisObj.disableYearEndLeft = status;
            },
            // 年、月面板都是关闭状态
            panelElse() {
                const tabKeyHandle = {
                    day() {
                        thisObj.disableYearStartLeft = yearActiveStart <= 1900;
                        thisObj.disableMonthStartLeft = (yearActiveStart + monthActiveStart) <= 190001;
                        const yas = yearActiveStart,
                            yae = yearActiveEnd;
                        const mas = monthActiveStart,
                            mae = monthActiveEnd;
                        const das = dayActiveStart,
                            dae = dayActiveEnd;
                        const activeStart = yas + mas,
                            activeEnd = yae + mae;
                        const reg = /\./g;
                        const nextYear = CountNextYear([yas, mas, das]).replace(reg, '').substr(0, 6);
                        const nextMonth = CountNextMonth([yas, mas, das]).replace(reg, '').substr(0, 6);
                        const prevYear = CountPrevYear([yae, mae, dae]).replace(reg, '').substr(0, 6);
                        const prevMonth = CountPrevMonth([yae, mae, dae]).replace(reg, '').substr(0, 6);
                        thisObj.disableYearStartRight = (activeEnd <= nextYear);
                        thisObj.disableMonthStartRight = (activeEnd <= nextMonth);
                        thisObj.disableYearEndLeft = (prevYear <= activeStart);
                        thisObj.disableMonthEndLeft = (prevMonth <= activeStart);
                    },
                    week() {
                        this.day();
                    },
                    month() {
                        thisObj.disableYearStartLeft = yearActiveStart <= 1900;
                        const activeStart = yearActiveStart,
                            activeEnd = yearActiveEnd;
                        thisObj.disableYearStartRight = (activeEnd - 1) <= activeStart;
                        thisObj.disableYearEndLeft = (activeEnd - 1) <= activeStart;
                    },
                    year() {
                        thisObj.disableYearStartLeft = yearActiveStartLeft <= 1900;
                        const yearStartRight = (tabKey === 'year' || panelYearStart) ? yearActiveStartRight : yearActiveStart,
                            yearEndLeft = yearActiveEndLeft;
                        thisObj.disableYearStartRight = (yearEndLeft - 1) <= yearStartRight;
                        thisObj.disableYearEndLeft = (yearEndLeft - 1) <= yearStartRight;
                    }
                };
                tabKeyHandle[tabKey]();
            }
        };
        strategy[panelYearStart ? 'panelYearStart' : panelYearEnd ? 'panelYearEnd' : (panelMonthStart || panelMonthEnd) ? 'panelMsOrMe' : 'panelElse']();
    } else {
        const tabKeyHandle = {
            day() {
                thisObj.disableYearStartLeft = yearActiveStart <= 1900;
                thisObj.disableMonthStartLeft = (yearActiveStart + monthActiveStart) <= 190001;
                thisObj.disableYearStartRight = false;
                thisObj.disableMonthStartRight = false;
            },
            week() {
                this.day();
            },
            month() {
                thisObj.disableYearStartLeft = yearActiveStart <= 1900;
                thisObj.disableYearStartRight = false;
            },
            year() {
                thisObj.disableYearStartLeft = yearActiveStartLeft <= 1900;
                thisObj.disableYearStartRight = false;
            }
        };
        tabKeyHandle[tabKey]();
    }
};

export default DisableArrow;
