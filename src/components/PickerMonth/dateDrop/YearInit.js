import CountYear from '../../static/utils/datePicker/CountYear';
import { DateFormat } from '../../PickerDate/dateDrop/DateFormatUtils';
import SetMaxLenDisable from './SetMaxLenDisable';

const CountYearArray = (date) => {
    const countYear = new CountYear(date); // 当前计算年的对象
    return countYear.getYearsArray();
};

// endYearPanel-选择的开始结束年是否都在结束时间面板
const YearInitStart = (thisObj, date, endYearPanel) => {
    const { panelYearStart } = thisObj;
    const yearsArrayStart = CountYearArray(date);
    thisObj.yearActiveStartLeft = yearsArrayStart[0].year;
    thisObj.yearActiveStartRight = yearsArrayStart[11].year;
    const {
        toggleVal, clickYearSelectedStart, clickYearSelectedEnd, maxLen
    } = thisObj;

    if (!panelYearStart && toggleVal) {
        if (clickYearSelectedStart) {
            if (clickYearSelectedEnd) {
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
                    else d.selected = '';
                });
            }
        }
    } else {
        yearsArrayStart.forEach(d => {
            if (d.year === clickYearSelectedStart) d.selected = 'selected';
            else if (d.year < 1900) d.disabled = 'disabled';
            else d.selected = '';
        });
    }
    thisObj.yearsArrayStart = yearsArrayStart;
    if (maxLen && clickYearSelectedStart && !clickYearSelectedEnd) {
        SetMaxLenDisable(thisObj);
    }
};

const YearInitEnd = (thisObj, date, endYearPanel) => {
    const { panelYearEnd } = thisObj;
    const yearsArrayEnd = CountYearArray(date);
    thisObj.yearActiveEndLeft = yearsArrayEnd[0].year;
    thisObj.yearActiveEndRight = yearsArrayEnd[11].year;
    const { clickYearSelectedStart, clickYearSelectedEnd, maxLen } = thisObj;
    if (panelYearEnd) {
        yearsArrayEnd.forEach(d => {
            if (d.year === clickYearSelectedEnd) d.selected = 'selected';
            else d.selected = '';
        });
    } else {
        if (clickYearSelectedStart) {
            if (clickYearSelectedEnd) {
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
    if (maxLen && clickYearSelectedStart && !clickYearSelectedEnd) {
        SetMaxLenDisable(thisObj);
    }
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
        const {
            clickYearSelectedStart, clickYearSelectedEnd,
            yearsArrayEnd
        } = thisObj;
        const [dateStart, dateEnd] = DateFormat(date);
        // endYearPanel-选择的开始结束年是否都在结束时间面板
        const endYearPanel = (
            yearsArrayEnd.some(d => d.year === clickYearSelectedStart) && yearsArrayEnd.some(d => d.year === clickYearSelectedEnd)
        ); // 是否在结束年面板
        YearInitEnd(thisObj, dateEnd, endYearPanel);
        YearInitStart(thisObj, dateStart, endYearPanel);
    } else {
        YearInitStart(thisObj, date);
    }
};

export { YearInitStart, YearInitEnd, YearInit };
