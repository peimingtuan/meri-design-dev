import CountWeek from '../../static/utils/datePicker/CountWeek';
import { SetWeeksArrayDisabled } from '../../static/utils/datePicker/SetDataArrayDisabled';
import { DateFormat } from './DateFormatUtils';
import CountPrevMonth from '../../static/utils/datePicker/CountPrevMonth';
import CountNextMonth from '../../static/utils/datePicker/CountNextMonth';

/**
 * 计算日数组
 * @param date
 * @param sort
 * @constructor
 */
const CountWeekArray = (date, sort) => {
    const countWeek = new CountWeek({ date, sort });
    return countWeek.getWeeksArray();
};

const WeekInitStart = (thisObj, date, sort, sameMonth) => {
    const reg = /[.第周]/g;
    const weeksArrayStart = SetWeeksArrayDisabled(thisObj.ymdLimitStart, CountWeekArray(date, sort));
    thisObj.weeksArrayStart = weeksArrayStart;
    if (sameMonth) return;
    const {
        toggleVal,
        clickYearSelectedStart: Y, clickMonthSelectedStart: M, clickDaySelectedStart: D,
        clickYearSelectedEnd: YE, clickMonthSelectedEnd: ME, clickDaySelectedEnd: DE
    } = thisObj;
    if (D) {
        let weeks = [],
            thText = '',
            thTextE = '',
            flag,
            dateStartInit,
            selectedDateStart;
        const obj = weeksArrayStart.find(d => d.weeks.some(d2 => d2.year === Y && d2.month === M && d2.day === D));
        if (obj && obj.hasOwnProperty('weeks')) {
            const { weeks: W, thText: T, flag: F } = obj;
            weeks = W;
            thText = T;
            flag = F;
        }
        if (!toggleVal) {
            if (flag === 'p') dateStartInit = CountPrevMonth(date.split('.')); // 计算上一个月
            else if (flag === 'f') dateStartInit = CountNextMonth(date.split('.')); // 计算下一个月
            // 重新计算周
            if (dateStartInit) {
                const [y, m, d] = dateStartInit.split('.');
                thisObj.yearActiveStart = y;
                thisObj.monthActiveStart = m;
                thisObj.dayActiveStart = d;
                WeekInitStart(thisObj, dateStartInit, sort);
                return;
            }
        }

        if (!weeks || !weeks.length) return;
        const objE = weeksArrayStart.find(d => d.weeks.some(d2 => d2.year === YE && d2.month === ME && d2.day === DE));
        if (objE && objE.hasOwnProperty('weeks')) {
            const { thText } = objE;
            thTextE = thText;
        }
        const ws1 = weeks[0],
            ws2 = weeks[6];
        if (toggleVal) {
            selectedDateStart = `${ws1.year}.${ws1.month}.${ws1.day}`;
            const dateS = thText.replace(reg, ''),
                dateE = thTextE.replace(reg, '');
            if (dateS && dateE) {
                weeksArrayStart.forEach(d => {
                    if (d.flag === 'n') {
                        const dateC = d.thText.replace(reg, '');
                        if (dateC === dateS || dateC === dateE) {
                            d.selected = 'selected';
                        } else if (dateC > dateS && dateC < dateE) {
                            d.multiple = 'multiple';
                        } else {
                            d.selected = '';
                            d.multiple = '';
                        }
                    }
                });
            } else {
                weeksArrayStart.forEach(d => {
                    if (d.flag === 'n') {
                        const dateC = d.thText.replace(reg, '');
                        if (dateC === dateS) {
                            d.selected = 'selected';
                        } else if (dateC > dateS) {
                            d.multiple = 'multiple';
                        } else {
                            d.selected = '';
                            d.multiple = '';
                        }
                    }
                });
            }
        } else {
            selectedDateStart = `${ws1.year}.${ws1.month}.${ws1.day}-${ws2.year}.${ws2.month}.${ws2.day}`;
            weeksArrayStart.forEach(d => {
                if (d.flag === 'n' && d.thText === thText) d.selected = 'selected';
                else d.selected = '';
            });
        }
        thisObj.clickSelectedDateStart = selectedDateStart;
        thisObj.weeksSelectedStart = weeks;
        thisObj.thTextSelectedStart = thText;
        thisObj.clickThTextSelectedStart = thText;
    }
    thisObj.weeksArrayStart = weeksArrayStart;
};

const WeekInitEnd = (thisObj, date, sort, sameMonth, dateStart) => {
    const reg = /[.第周]/g;
    const weeksArrayEnd = SetWeeksArrayDisabled(thisObj.ymdLimitEnd, CountWeekArray(date, sort));
    const { clickYearSelectedEnd: Y, clickMonthSelectedEnd: M, clickDaySelectedEnd: D } = thisObj;
    if (D) {
        let weeks = [],
            thText = '',
            flag,
            dateEndInit,
            weeksS = [],
            thTextS = '';
        const obj = weeksArrayEnd.find(d => d.weeks.some(d2 => d2.year === Y && d2.month === M && d2.day === D));
        if (obj && obj.hasOwnProperty('weeks')) {
            const { weeks: W, thText: T, flag: F } = obj;
            weeks = W;
            thText = T;
            flag = F;
        }
        if (flag === 'p') dateEndInit = CountPrevMonth(date.split('.')); // 计算上一个月
        else if (flag === 'f') dateEndInit = CountNextMonth(date.split('.')); // 计算下一个月
        if (dateEndInit && dateStart) {
            const [y, m, d] = dateEndInit.split('.');
            thisObj.yearActiveEnd = y;
            thisObj.monthActiveEnd = m;
            thisObj.dayActiveEnd = d;
            WeekInitEnd(thisObj, dateEndInit, sort, sameMonth);
            return;
        }
        if (weeks && weeks.length) {
            thisObj.weeksSelectedEnd = weeks;
            thisObj.thTextSelectedEnd = thText;
            thisObj.clickThTextSelectedEnd = thText;
            const { year, month, day } = weeks[6];
            thisObj.clickSelectedDateEnd = `${year}.${month}.${day}`;
        }
        const dateE = thText.replace(reg, '');
        // 开始结束时间是否在同一月
        const { clickYearSelectedStart: YS, clickMonthSelectedStart: MS, clickDaySelectedStart: DS } = thisObj;
        const objStart = weeksArrayEnd.find(d => d.weeks.some(d2 => d2.year === YS && d2.month === MS && d2.day === DS));
        if (objStart && objStart.hasOwnProperty('weeks')) {
            const { weeks, thText } = objStart;
            weeksS = weeks;
            thTextS = thText;
            thisObj.weeksSelectedStart = weeksS;
            thisObj.thTextSelectedStart = thTextS;
            thisObj.clickThTextSelectedStart = thTextS;
        }
        if (sameMonth || (thText && thTextS)) {
            const dateS = thTextS.replace(reg, '');
            weeksArrayEnd.forEach(d => {
                if (d.flag === 'n') {
                    const dateC = d.thText.replace(reg, '');
                    if (dateC === dateS || dateC === dateE) {
                        d.selected = 'selected';
                    } else if ((thText !== thTextS) && ((dateC > dateS && dateC < dateE) || (dateC < dateS && dateC > dateE))) {
                        d.multiple = 'multiple';
                    } else {
                        d.selected = '';
                        d.multiple = '';
                    }
                }
            });
        } else {
            weeksArrayEnd.forEach(d => {
                if (d.flag === 'n') {
                    const dateC = d.thText.replace(reg, '');
                    if (dateC === dateE) {
                        d.selected = 'selected';
                    } else if (dateC < dateE) {
                        d.multiple = 'multiple';
                    } else {
                        d.selected = '';
                        d.multiple = '';
                    }
                }
            });
        }
    }
    thisObj.weeksArrayEnd = weeksArrayEnd;
    if (!dateStart) return;
    // 重新计算开始时间
    const dateStartInit = CountPrevMonth(date.split('.'));
    let DSI = dateStartInit;
    if (dateStart.replace(/\./g, '') < dateStartInit.replace(/\./g, '')) DSI = dateStart;
    const [ys, ms, ds] = DSI.split('.');
    thisObj.yearActiveStart = ys;
    thisObj.monthActiveStart = ms;
    thisObj.dayActiveStart = ds;
    WeekInitStart(thisObj, DSI, sort);
};

/**
 * 周初始化
 * @param thisObj DateDrop的this
 * @param date 传入的日期
 * @param toggleVal
 * @constructor
 */
const WeekInit = (thisObj, date, toggleVal) => {
    const { sort } = thisObj;
    if (toggleVal) {
        const [dateStart, dateEnd] = DateFormat(date);
        const ds = dateStart.substr(0, 7),
            de = dateEnd.substr(0, 7);
        const sameMonth = ds === de;
        WeekInitEnd(thisObj, dateEnd, sort, sameMonth, dateStart);
    } else {
        WeekInitStart(thisObj, date, sort);
    }
};

export { WeekInitStart, WeekInitEnd, WeekInit };
