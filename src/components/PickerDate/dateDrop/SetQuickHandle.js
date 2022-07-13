// 快速选择-日期切换

import { DayInit } from './DayInit';
import { WeekInit } from './WeekInit';
import { MonthInit } from './MonthInit';
import { YearInit } from './YearInit';
import CountBeforeOrAfterDay from '../../static/utils/datePicker/CountBeforeOrAfterDay';
import CountLeftOrRightMonth from '../../static/utils/datePicker/CountLeftOrRightMonth';

/**
 * 日切换
 * @param thisObj DateDrop的this
 * @param panel
 * @constructor
 */
const SetQuickDay = (thisObj, panel) => {
    const {
        toggleVal, format,
        clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd, clickDaySelectedEnd,
        timeStart, timeEnd
    } = thisObj;
    if (toggleVal) {
        const y1 = clickYearSelectedStart,
            m1 = clickMonthSelectedStart,
            d1 = clickDaySelectedStart,
            y2 = clickYearSelectedEnd,
            m2 = clickMonthSelectedEnd,
            d2 = clickDaySelectedEnd;
        let sy,
            sm,
            sd, // 计算后的开始年月日
            ey,
            em,
            ed, // 计算后的结束年月日
            initDate;
        // 天差值
        const diff = (new Date(y2, m2 - 1, d2).getTime() - new Date(y1, m1 - 1, d1).getTime()) / (1000 * 60 * 60 * 24);
        if (panel === 'left') {
            // 计算结束时间
            const [ey1, em1, ed1] = CountBeforeOrAfterDay(y1, m1, d1, -1);
            ey = ey1;
            em = em1;
            ed = ed1;
            // 计算开始时间
            const [sy1, sm1, sd1] = CountBeforeOrAfterDay(ey1, em1, ed1, -diff);
            sy = sy1;
            sm = sm1;
            sd = sd1;
        } else {
            // 计算开始时间
            const [sy1, sm1, sd1] = CountBeforeOrAfterDay(y2, m2, d2, 1);
            sy = sy1;
            sm = sm1;
            sd = sd1;
            // 计算结束时间
            const [ey1, em1, ed1] = CountBeforeOrAfterDay(sy1, sm1, sd1, diff);
            ey = ey1;
            em = em1;
            ed = ed1;
        }

        const dateStart = `${sy}.${sm}.${sd}${format && timeStart ? ` ${timeStart}` : ''}`,
            dateEnd = `${ey}.${em}.${ed}${format && timeEnd ? ` ${timeEnd}` : ''}`;

        thisObj.selectedDateStart = dateStart;
        thisObj.selectedDateEnd = dateEnd;
        thisObj.yearSelectedStart = sy;
        thisObj.monthSelectedStart = sm;
        thisObj.daySelectedStart = sd;
        thisObj.yearActiveStart = sy;
        thisObj.monthActiveStart = sm;
        thisObj.dayActiveStart = sd;
        thisObj.clickYearSelectedStart = sy;
        thisObj.clickMonthSelectedStart = sm;
        thisObj.clickDaySelectedStart = sd;
        thisObj.yearSelectedEnd = ey;
        thisObj.monthSelectedEnd = em;
        thisObj.daySelectedEnd = ed;
        thisObj.yearActiveEnd = ey;
        thisObj.monthActiveEnd = em;
        thisObj.dayActiveEnd = ed;
        thisObj.clickYearSelectedEnd = ey;
        thisObj.clickMonthSelectedEnd = em;
        thisObj.clickDaySelectedEnd = ed;
        const selectedDate = `${dateStart}-${dateEnd}`;
        thisObj.selectedDate = selectedDate;

        initDate = selectedDate;
        if ((sy + sm) === (ey + em)) {
            let y = sy,
                m = sm - 1;
            if (m === 0) {
                m = 12;
                y = String(sy - 1);
            }
            m = m < 10 ? `0${m}` : `${m}`;
            initDate = `${y}.${m}.${sd}-${ey}.${em}.${ed}`;
            thisObj.yearActiveStart = y;
            thisObj.monthActiveStart = m;
        }
        DayInit(thisObj, initDate, toggleVal);
        thisObj.$emit('change', {
            selectedDate,
            selectedDateStart: dateStart,
            selectedDateEnd: dateEnd,
            timeStart,
            timeEnd,
            thTextSelectedStart: thisObj.thTextSelectedStart,
            thTextSelectedEnd: thisObj.thTextSelectedEnd
        });
    } else {
        // 单选
        const [Y, M, D] = CountBeforeOrAfterDay(clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart, panel === 'left' ? -1 : 1);
        const selectedDate = `${Y}.${M}.${D}${format && timeStart ? ` ${timeStart}` : ''}`;
        thisObj.yearActiveStart = Y;
        thisObj.monthActiveStart = M;
        thisObj.dayActiveStart = D;
        thisObj.yearSelectedStart = Y;
        thisObj.monthSelectedStart = M;
        thisObj.daySelectedStart = D;
        thisObj.clickYearSelectedStart = Y;
        thisObj.clickMonthSelectedStart = M;
        thisObj.clickDaySelectedStart = D;
        thisObj.selectedDate = selectedDate;
        thisObj.selectedDateStart = selectedDate;
        thisObj.clickSelectedDateStart = selectedDate;

        DayInit(thisObj, selectedDate, toggleVal);
        thisObj.$emit('change', { selectedDate, selectedDateStart: selectedDate, thTextSelectedStart: '' });
    }
};
/**
 * 周切换
 * @param thisObj DateDrop的this
 * @param panel
 * @constructor
 */
const SetQuickWeek = (thisObj, panel) => {
    const {
        toggleVal,
        weeksSelectedStart, weeksSelectedEnd,
        timeStart, timeEnd
    } = thisObj;
    if (toggleVal) {
        const ws = weeksSelectedStart,
            { year: ys, month: ms, day: ds } = ws[0],
            we = weeksSelectedEnd,
            { year: ye, month: me, day: de } = we[6];
        const diff = (new Date(ye, me - 1, de).getTime() - new Date(ys, ms - 1, ds).getTime()) / (1000 * 60 * 60 * 24);

        let sy,
            sm,
            sd, // 计算后的开始年月日
            ey,
            em,
            ed, // 计算后的结束年月日
            dateStart,
            dateEnd;
        if (panel === 'left') {
            const [ey1, em1, ed1] = CountBeforeOrAfterDay(ys, ms, ds, -1);
            const [sy1, sm1, sd1] = CountBeforeOrAfterDay(ey1, em1, ed1, -diff);
            dateStart = `${sy1}.${sm1}.${sd1}`;
            dateEnd = `${ey1}.${em1}.${ed1}`;
            sy = sy1;
            sm = sm1;
            sd = sd1;
            ey = ey1;
            em = em1;
            ed = ed1;
        } else {
            const [sy1, sm1, sd1] = CountBeforeOrAfterDay(ye, me, de, 1);
            const [ey1, em1, ed1] = CountBeforeOrAfterDay(sy1, sm1, sd1, diff);
            dateStart = `${sy1}.${sm1}.${sd1}`;
            dateEnd = `${ey1}.${em1}.${ed1}`;
            sy = sy1;
            sm = sm1;
            sd = sd1;
            ey = ey1;
            em = em1;
            ed = ed1;
        }

        thisObj.selectedDateStart = dateStart;
        thisObj.selectedDateEnd = dateEnd;
        thisObj.yearSelectedStart = sy;
        thisObj.monthSelectedStart = sm;
        thisObj.daySelectedStart = sd;
        thisObj.yearActiveStart = sy;
        thisObj.monthActiveStart = sm;
        thisObj.dayActiveStart = sd;
        thisObj.clickYearSelectedStart = sy;
        thisObj.clickMonthSelectedStart = sm;
        thisObj.clickDaySelectedStart = sd;
        thisObj.yearSelectedEnd = ey;
        thisObj.monthSelectedEnd = em;
        thisObj.daySelectedEnd = ed;
        thisObj.yearActiveEnd = ey;
        thisObj.monthActiveEnd = em;
        thisObj.dayActiveEnd = ed;
        thisObj.clickYearSelectedEnd = ey;
        thisObj.clickMonthSelectedEnd = em;
        thisObj.clickDaySelectedEnd = ed;
        const selectedDate = `${dateStart}-${dateEnd}`;
        thisObj.selectedDate = selectedDate;

        WeekInit(thisObj, selectedDate, toggleVal);
        thisObj.$emit('change', {
            selectedDate,
            selectedDateStart: dateStart,
            selectedDateEnd: dateEnd,
            timeStart,
            timeEnd,
            thTextSelectedStart: thisObj.thTextSelectedStart,
            thTextSelectedEnd: thisObj.thTextSelectedEnd
        });
    } else {
        // 单选
        const ws = weeksSelectedStart,
            { year: y1, month: m1, day: d1 } = ws[0],
            { year: y2, month: m2, day: d2 } = ws[6];

        let selectedDate,
            y,
            m,
            d;
        if (panel === 'left') {
            const [ey, em, ed] = CountBeforeOrAfterDay(y1, m1, d1, -1);
            const [sy, sm, sd] = CountBeforeOrAfterDay(ey, em, ed, -6);
            const start = `${sy}.${sm}.${sd}`;
            const end = `${ey}.${em}.${ed}`;
            selectedDate = `${start}-${end}`;
            y = sy;
            m = sm;
            d = sd;
        } else {
            const [sy, sm, sd] = CountBeforeOrAfterDay(y2, m2, d2, 1);
            const [ey, em, ed] = CountBeforeOrAfterDay(sy, sm, sd, 6);
            const start = `${sy}.${sm}.${sd}`;
            const end = `${ey}.${em}.${ed}`;
            selectedDate = `${start}-${end}`;
            y = sy;
            m = sm;
            d = sd;
        }
        thisObj.yearActiveStart = y;
        thisObj.monthActiveStart = m;
        thisObj.dayActiveStart = d;
        thisObj.yearSelectedStart = y;
        thisObj.monthSelectedStart = m;
        thisObj.daySelectedStart = d;
        thisObj.clickYearSelectedStart = y;
        thisObj.clickMonthSelectedStart = m;
        thisObj.clickDaySelectedStart = d;

        thisObj.selectedDate = selectedDate;
        thisObj.selectedDateStart = selectedDate;
        thisObj.clickSelectedDateStart = selectedDate;

        WeekInit(thisObj, `${y}.${m}.${d}`, toggleVal);
        thisObj.$emit('change', { selectedDate, selectedDateStart: selectedDate, thTextSelectedStart: thisObj.thTextSelectedStart });
    }
};
/**
 * 月切换
 * @param thisObj DateDrop的this
 * @param panel
 * @constructor
 */
const SetQuickMonth = (thisObj, panel) => {
    const {
        toggleVal,
        clickYearSelectedStart, clickMonthSelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd,
        timeStart, timeEnd
    } = thisObj;
    if (toggleVal) {
        const dateS = `${clickYearSelectedStart}.${clickMonthSelectedStart}`,
            dateE = `${clickYearSelectedEnd}.${clickMonthSelectedEnd}`;
        const [YS, MS, YE, ME] = CountLeftOrRightMonth(panel, dateS, dateE);

        const dateStart = `${YS}.${MS}`,
            dateEnd = `${YE}.${ME}`;
        thisObj.selectedDateStart = dateStart;
        thisObj.selectedDateEnd = dateEnd;
        thisObj.clickSelectedDateStart = dateStart;
        thisObj.clickSelectedDateEnd = dateEnd;

        const selectedDate = `${dateStart}-${dateEnd}`;
        thisObj.yearSelectedStart = YS;
        thisObj.monthSelectedStart = MS;
        thisObj.clickYearSelectedStart = YS;
        thisObj.clickMonthSelectedStart = MS;
        thisObj.yearActiveStart = YS;
        thisObj.monthActiveStart = MS;
        thisObj.yearSelectedEnd = YE;
        thisObj.monthSelectedEnd = ME;
        thisObj.clickYearSelectedEnd = YE;
        thisObj.clickMonthSelectedEnd = ME;
        thisObj.yearActiveEnd = YE;
        thisObj.monthActiveEnd = ME;
        thisObj.selectedDate = selectedDate;

        let selectedDateInit = selectedDate;
        if (YS === YE) {
            // 初始化月情况下，重新计算的年是同一年
            const year = String(YS - 1);
            thisObj.yearActiveStart = year;
            selectedDateInit = `${year}.${MS}-${dateEnd}`;
        }
        MonthInit(thisObj, selectedDateInit, toggleVal);
        thisObj.$emit('change', {
            selectedDate,
            selectedDateStart: dateStart,
            selectedDateEnd: dateEnd,
            timeStart,
            timeEnd,
            thTextSelectedStart: thisObj.thTextSelectedStart,
            thTextSelectedEnd: thisObj.thTextSelectedEnd
        });
    } else {
        // 单选
        const ys = Number(clickYearSelectedStart),
            ms = Number(clickMonthSelectedStart);
        const m = panel === 'left' ? ms - 1 : ms + 1;
        let Y, M;
        if (m === 0) {
            Y = (ys - 1).toString();
            M = '12';
        } else if (m === 13) {
            Y = (ys + 1).toString();
            M = '01';
        } else {
            Y = ys.toString();
            M = m > 9 ? `${m}` : `0${m}`;
        }

        const selectedDate = `${Y}.${M}`;
        thisObj.yearActiveStart = Y;
        thisObj.monthActiveStart = M;
        thisObj.yearSelectedStart = Y;
        thisObj.monthSelectedStart = M;
        thisObj.clickYearSelectedStart = Y;
        thisObj.clickMonthSelectedStart = M;
        thisObj.selectedDate = selectedDate;
        thisObj.selectedDateStart = selectedDate;
        thisObj.clickSelectedDateStart = selectedDate;

        MonthInit(thisObj, selectedDate, toggleVal);
        thisObj.$emit('change', { selectedDate, selectedDateStart: selectedDate, thTextSelectedStart: '' });
    }
};
/**
 * 年切换
 * @param thisObj DateDrop的this
 * @param panel
 * @constructor
 */
const SetQuickYear = (thisObj, panel) => {
    const {
        toggleVal,
        clickYearSelectedStart, clickYearSelectedEnd,
        timeStart, timeEnd
    } = thisObj;
    if (toggleVal) {
        const yss = Number(clickYearSelectedStart),
            yse = Number(clickYearSelectedEnd);
        const diff = yse - yss;
        const sds = ((panel === 'left' ? yss - 1 - diff : yse + 1)).toString(),
            sde = ((panel === 'left' ? yss - 1 : yse + 1 + diff)).toString();
        thisObj.yearSelectedStart = sds;
        thisObj.yearSelectedEnd = sde;
        thisObj.clickYearSelectedStart = sds;
        thisObj.clickYearSelectedEnd = sde;
        thisObj.yearActiveStart = sds;
        thisObj.yearActiveEnd = sde;
        thisObj.selectedDateStart = sds;
        thisObj.selectedDateEnd = sde;
        thisObj.clickSelectedDateStart = sds;
        thisObj.clickSelectedDateEnd = sde;
        const selectedDate = `${sds}-${sde}`;
        thisObj.selectedDate = selectedDate;

        let selectedDateInit = selectedDate;
        if (sde - sds < 12) {
            selectedDateInit = `${sde - 12}-${sde}`;
        }
        YearInit(thisObj, selectedDateInit, toggleVal);
        thisObj.$emit('change', {
            selectedDate,
            selectedDateStart: sds,
            selectedDateEnd: sde,
            timeStart,
            timeEnd,
            thTextSelectedStart: thisObj.thTextSelectedStart,
            thTextSelectedEnd: thisObj.thTextSelectedEnd
        });
    } else {
        // 单选
        const ys = Number(clickYearSelectedStart);
        const selectedDate = ((panel === 'left' ? ys - 1 : ys + 1)).toString();
        thisObj.yearActiveStart = selectedDate;
        thisObj.yearSelectedStart = selectedDate;
        thisObj.clickYearSelectedStart = selectedDate;
        thisObj.selectedDate = selectedDate;
        thisObj.selectedDateStart = selectedDate;
        thisObj.clickSelectedDateStart = selectedDate;

        YearInit(thisObj, selectedDate, toggleVal);
        thisObj.$emit('change', { selectedDate, selectedDateStart: selectedDate, thTextSelectedStart: '' });
    }
};

export { SetQuickDay, SetQuickWeek, SetQuickMonth, SetQuickYear };
