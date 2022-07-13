import CountDay from '../../static/utils/datePicker/CountDay';
import CountPrevMonth from '../../static/utils/datePicker/CountPrevMonth';
import CountNextMonth from '../../static/utils/datePicker/CountNextMonth';
import { SetDaysArrayDisabled } from '../../static/utils/datePicker/SetDataArrayDisabled';

import { DateFormat, DateTimeFormat } from './DateFormatUtils';

/**
 * 计算日数组
 * @param date
 * @constructor
 */
const CountDayArray = (date) => {
    const countDay = new CountDay(date); // 当前计算天的对象
    return countDay.getDaysArray();
};

const DayInitStart = (thisObj, date) => {
    const {
        toggleVal,
        clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd, clickDaySelectedEnd,
        panelYearStart, panelYearEnd, panelMonthStart, panelMonthEnd,
        ymdLimitStart
    } = thisObj;
    let daysArrayStart = SetDaysArrayDisabled(ymdLimitStart, CountDayArray(date));

    if (toggleVal) {
        if (clickDaySelectedStart) {
            const dateS = `${clickYearSelectedStart}${clickMonthSelectedStart}${clickDaySelectedStart}`;
            if (clickDaySelectedEnd) {
                if (panelYearStart || panelYearEnd || panelMonthStart || panelMonthEnd) {
                    thisObj.daysArrayStart = daysArrayStart.map(d => {
                        d.selected = '';
                        d.multiple = '';
                        return d;
                    });
                    return;
                }
                const dateE = `${clickYearSelectedEnd}${clickMonthSelectedEnd}${clickDaySelectedEnd}`,
                    sd = dateS.substr(0, 6),
                    ed = dateE.substr(0, 6);
                if (sd === ed) {
                    daysArrayStart = daysArrayStart.map(d => {
                        if (d.flag === 'n') {
                            const cDate = d.year + d.month + d.day;
                            if (cDate === dateS || cDate === dateE) {
                                d.selected = 'selected';
                            } else if (cDate > dateS && cDate < dateE) {
                                d.multiple = 'multiple';
                            } else {
                                d.selected = '';
                                d.multiple = '';
                            }
                        }
                        return d;
                    });
                } else {
                    daysArrayStart = daysArrayStart.map(d => {
                        if (d.flag === 'n') {
                            const cDate = d.year + d.month + d.day;
                            if (cDate === dateS) {
                                d.selected = 'selected';
                            } else if (cDate > dateS) {
                                d.multiple = 'multiple';
                            } else {
                                d.selected = '';
                                d.multiple = '';
                            }
                        }
                        return d;
                    });
                }
            } else {
                daysArrayStart = daysArrayStart.map(d => {
                    if (d.flag === 'n') {
                        const cDate = d.year + d.month + d.day;
                        if (cDate === dateS) d.selected = 'selected';
                        else d.selected = '';
                    }
                    return d;
                });
            }
        }
    } else {
        if (clickDaySelectedStart) {
            daysArrayStart.forEach(d => {
                if (d.year === clickYearSelectedStart && d.month === clickMonthSelectedStart && d.day === clickDaySelectedStart) d.selected = 'selected';
                else d.selected = '';
            });
        }
    }

    thisObj.daysArrayStart = daysArrayStart;
};

const DayInitEnd = (thisObj, date, dateStart) => {
    const {
        toggleVal,
        clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd, clickDaySelectedEnd,
        ymdLimitEnd
    } = thisObj;
    // debugger;
    let daysArrayEnd = SetDaysArrayDisabled(ymdLimitEnd, CountDayArray(date)),
        dateStartInit = dateStart;
    const obj = daysArrayEnd.find(d => (`${d.year}.${d.month}.${d.day}`) === (`${clickYearSelectedEnd}.${clickMonthSelectedEnd}.${clickDaySelectedEnd}`));
    if (obj && obj.flag) {
        const { flag } = obj;
        const strategyFlag = {
            p: () => CountPrevMonth(date.split('.')), // 计算上一月
            f: () => CountNextMonth(date.split('.')), // 计算下一月
            n: () => ''
        };
        const dateE2 = strategyFlag[flag]();
        if (dateE2 && dateStart) {
            const [y, m, d] = dateE2.split('.');
            thisObj.yearActiveEnd = y;
            thisObj.monthActiveEnd = m;
            thisObj.dayActiveEnd = d;
            daysArrayEnd = SetDaysArrayDisabled(ymdLimitEnd, CountDayArray(dateE2));
        }
    }

    if (clickDaySelectedStart) {
        const dateS = `${clickYearSelectedStart}${clickMonthSelectedStart}${clickDaySelectedStart}`,
            dateE = `${clickYearSelectedEnd}${clickMonthSelectedEnd}${clickDaySelectedEnd}`;
        const sd = dateS.substr(0, 6),
            ed = dateE.substr(0, 6);
        const sDate = dateS,
            eDate = dateE;

        if (clickDaySelectedEnd) {
            if (sd === ed) { // 开始结束时间是否在同一月
                daysArrayEnd = daysArrayEnd.map(d => {
                    if (d.flag === 'n') {
                        const cDate = `${d.year}${d.month}${d.day}`;
                        if (cDate === sDate || cDate === eDate) {
                            d.selected = 'selected';
                        } else if (cDate > sDate && cDate < eDate) {
                            d.multiple = 'multiple';
                        } else {
                            d.selected = '';
                            d.multiple = '';
                        }
                    }
                    return d;
                });
            } else {
                daysArrayEnd = daysArrayEnd.map(d => {
                    if (d.flag === 'n') {
                        const cDate = `${d.year}${d.month}${d.day}`;
                        if (cDate === eDate) {
                            d.selected = 'selected';
                        } else if (cDate < eDate) {
                            d.multiple = 'multiple';
                        } else {
                            d.selected = '';
                            d.multiple = '';
                        }
                    }
                    return d;
                });
            }
        } else {
            daysArrayEnd = daysArrayEnd.map(d => {
                if (d.flag === 'n') {
                    const cDate = `${d.year}${d.month}${d.day}`;
                    if (cDate === sDate) d.selected = 'selected';
                    else d.selected = '';
                }
                return d;
            });
        }
    }
    thisObj.daysArrayEnd = daysArrayEnd;
    if (!dateStart) return;
    const ds = dateStart.substr(0, 7),
        de = date.substr(0, 7);
    if (ds === de) dateStartInit = CountPrevMonth(dateStart.split('.'));
    if (dateStartInit) {
        const [yas, mas, das] = dateStartInit.split('.');
        thisObj.yearActiveStart = yas;
        thisObj.monthActiveStart = mas;
        thisObj.dayActiveStart = das;
    }
    DayInitStart(thisObj, dateStartInit, toggleVal);
};

/**
 * 日初始化
 * @param thisObj DateDrop的this
 * @param date 传入的日期
 * @param toggleVal
 * @constructor
 */
const DayInit = (thisObj, date, toggleVal) => {
    if (toggleVal) {
        const [dateStart, dateEnd] = DateFormat(date),
            [dateS, timeS] = DateTimeFormat(dateStart),
            [dateE, timeE] = DateTimeFormat(dateEnd);
        if (timeS) thisObj.timeStart = timeS;
        if (timeE) thisObj.timeEnd = timeE;
        DayInitEnd(thisObj, dateE, dateStart);
    } else {
        DayInitStart(thisObj, date);
    }
};

export { DayInitStart, DayInitEnd, DayInit };
