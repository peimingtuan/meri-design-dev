import CountYear from '../../static/utils/datePicker/CountYear';
import { SetYearsArrayDisabled } from '../../static/utils/datePicker/SetDataArrayDisabled';
import { DateFormat } from './DateFormatUtils';

const CountYearArray = (date) => {
    const countYear = new CountYear(date); // 当前计算年的对象
    return countYear.getYearsArray();
};

// endYearPanel-选择的开始结束年是否都在结束时间面板
const checkYearEndPanel = (thisObj, yearsArray) => {
    const { clickYearSelectedStart, clickYearSelectedEnd } = thisObj;
    return (yearsArray.some(d => d.year === clickYearSelectedStart) && yearsArray.some(d => d.year === clickYearSelectedEnd)); // 是否在结束年面板
};

// endYearPanel-选择的开始结束年是否都在结束时间面板
const YearInitStart = (thisObj, date) => {
    const { panelYearStart, ymdLimitStart } = thisObj;
    const yearsArrayStart = SetYearsArrayDisabled(ymdLimitStart, CountYearArray(date));
    thisObj.yearActiveStartLeft = yearsArrayStart[0].year;
    thisObj.yearActiveStartRight = yearsArrayStart[11].year;
    const { toggleVal, clickYearSelectedStart, clickYearSelectedEnd } = thisObj;

    if (!panelYearStart && toggleVal) {
        if (clickYearSelectedStart) {
            if (clickYearSelectedEnd) {
                const endYearPanel = checkYearEndPanel(thisObj, yearsArrayStart);
                if (endYearPanel) {
                    yearsArrayStart.forEach(d => {
                        if (d.year === clickYearSelectedStart) {
                            d.selected = 'selected';
                        } else if (d.year > clickYearSelectedStart) {
                            d.multiple = 'multiple';
                        } else if (d.year < 1900) {
                            d.disabled = 'disabled';
                        } else {
                            d.selected = '';
                            d.multiple = '';
                            // d.disabled = '';
                        }
                    });
                } else {
                    yearsArrayStart.forEach(d => {
                        if (d.year === clickYearSelectedStart || d.year === clickYearSelectedEnd) {
                            d.selected = 'selected';
                        } else if (d.year > clickYearSelectedStart && d.year < clickYearSelectedEnd) {
                            d.multiple = 'multiple';
                        } else if (d.year < 1900) {
                            d.disabled = 'disabled';
                        } else {
                            d.selected = '';
                            d.multiple = '';
                            // d.disabled = '';
                        }
                    });
                }
            } else {
                yearsArrayStart.forEach(d => {
                    if (d.year === clickYearSelectedStart) d.selected = 'selected';
                    else if (d.year < 1900) d.disabled = 'disabled';
                    else d.selected = '';
                });
            }
        } else {
            yearsArrayStart.forEach(d => {
                if (d.year < 1900) d.disabled = 'disabled';
            });
        }
    } else {
        yearsArrayStart.forEach(d => {
            if (d.year === clickYearSelectedStart) d.selected = 'selected';
            else if (d.year < 1900) d.disabled = 'disabled';
            else d.selected = '';
        });
    }
    thisObj.yearsArrayStart = yearsArrayStart;
};

const YearInitEnd = (thisObj, date) => {
    const { panelYearEnd, ymdLimitEnd } = thisObj;
    const yearsArrayEnd = SetYearsArrayDisabled(ymdLimitEnd, CountYearArray(date));
    thisObj.yearActiveEndLeft = yearsArrayEnd[0].year;
    thisObj.yearActiveEndRight = yearsArrayEnd[11].year;
    const { clickYearSelectedStart, clickYearSelectedEnd } = thisObj;
    if (panelYearEnd) {
        yearsArrayEnd.forEach(d => {
            if (d.year === clickYearSelectedEnd) d.selected = 'selected';
            else d.selected = '';
        });
    } else {
        if (clickYearSelectedStart) {
            if (clickYearSelectedEnd) {
                const endYearPanel = checkYearEndPanel(thisObj, yearsArrayEnd);
                if (endYearPanel) {
                    yearsArrayEnd.forEach(d => {
                        if (d.year === clickYearSelectedStart || d.year === clickYearSelectedEnd) {
                            d.selected = 'selected';
                        } else if (d.year > clickYearSelectedStart && d.year < clickYearSelectedEnd) {
                            d.multiple = 'multiple';
                        } else if (d.year < 1900) {
                            d.disabled = 'disabled';
                        } else {
                            d.selected = '';
                            d.multiple = '';
                            // d.disabled = '';
                        }
                    });
                } else {
                    yearsArrayEnd.forEach(d => {
                        if (d.year === clickYearSelectedEnd) {
                            d.selected = 'selected';
                        } else if (d.year > clickYearSelectedStart && d.year < clickYearSelectedEnd) {
                            d.multiple = 'multiple';
                        } else if (d.year < 1900) {
                            d.disabled = 'disabled';
                        } else {
                            d.selected = '';
                            d.multiple = '';
                            // d.disabled = '';
                        }
                    });
                }
            } else {
                yearsArrayEnd.forEach(d => {
                    if (d.year === clickYearSelectedStart) d.selected = 'selected';
                    else d.selected = '';
                });
            }
        }
    }
    thisObj.yearsArrayEnd = yearsArrayEnd;
};

/**
 * 年初始化
 * @param thisObj DateDrop的this
 * @param date 传入的日期
 * @param toggleVal
 * @constructor
 */
const YearInit = (thisObj, date, toggleVal) => {
    if (toggleVal) {
        const [dateStart, dateEnd] = DateFormat(date);
        YearInitEnd(thisObj, dateEnd);
        YearInitStart(thisObj, dateStart);
    } else {
        YearInitStart(thisObj, date);
    }
};

export { YearInitStart, YearInitEnd, YearInit };
