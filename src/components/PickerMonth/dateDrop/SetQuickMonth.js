import CountLeftOrRightMonth from '../../static/utils/datePicker/CountLeftOrRightMonth';
import { MonthInit } from './MonthInit';

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

export default SetQuickMonth;
