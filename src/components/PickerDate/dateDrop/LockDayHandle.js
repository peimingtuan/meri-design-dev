import { SetDay } from './SetArray';
import DiffTimestamp from '../../static/utils/datePicker/DiffTimestamp';
// import { DayInit, DayInitStart, DayInitEnd } from './DayInit';
import { DayInitStart, DayInitEnd } from './DayInit';
import DisableArrow from './DisableArrow';

/**
 * 日-锁定周期
 * @param thisObj DateDrop的this
 * @param obj {year, month, day}
 */
const LockDayHandle = (thisObj, { year, month, day }) => {
    const {
        format,
        timeStart, timeEnd,
        clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd, clickDaySelectedEnd,
        yearActiveStart, monthActiveStart,
        yearActiveEnd, monthActiveEnd,
        daysArrayStart, daysArrayEnd
    } = thisObj;
    const tStart = (format && timeStart) ? timeStart : '';
    const left = `${clickYearSelectedStart}.${clickMonthSelectedStart}.${clickDaySelectedStart}`,
        right = `${clickYearSelectedEnd}.${clickMonthSelectedEnd}.${clickDaySelectedEnd}`,
        diff = DiffTimestamp(left, right); // 开始和结束时间差值
    // const nowTimestamp = new Date(`${year}.${month}.${day}`).getTime(); // 当前时间戳
    const nowTimestamp = new Date(year, month, day).getTime(); // 当前时间戳
    const nextYMD = (diff + nowTimestamp);
    // const dateObj = new Date(nextYMD); // 结束时间的时间对象
    const dateObj = new Date(nextYMD.replace(/\./g, '/')); // 结束时间的时间对象
    // 获取结束时间年月日
    const y = dateObj.getFullYear(),
        m = dateObj.getMonth() + 1,
        d = dateObj.getDate();
    // 结束年月日
    const yearEnd = `${y}`,
        monthEnd = m < 10 ? `0${m}` : `${m}`,
        dayEnd = d < 10 ? `0${d}` : `${d}`;

    thisObj.clickYearSelectedStart = year;
    thisObj.clickMonthSelectedStart = month;
    thisObj.clickDaySelectedStart = day;
    const ymdSelectedStart = `${year}.${month}.${day}`;
    thisObj.ymdSelectedStart = ymdSelectedStart;

    const tEnd = (format && timeEnd) ? timeEnd : '';
    thisObj.clickYearSelectedEnd = yearEnd;
    thisObj.clickMonthSelectedEnd = monthEnd;
    thisObj.clickDaySelectedEnd = dayEnd;
    const ymdSelectedEnd = `${yearEnd}.${monthEnd}.${dayEnd}`;
    thisObj.ymdSelectedEnd = ymdSelectedEnd;
    thisObj.btnType = 'primary';
    const dateStart = tStart ? `${ymdSelectedStart} ${tStart}` : ymdSelectedStart,
        dateEnd = tEnd ? `${ymdSelectedEnd} ${tEnd}` : ymdSelectedEnd;
    thisObj.clickSelectedDateStart = dateStart;
    thisObj.clickSelectedDateEnd = dateEnd;
    // const date = `${dateStart}-${dateEnd}`;

    const ds = dateStart.substr(0, 7), // 计算后的开始时间
        de = dateEnd.substr(0, 7), // 计算后的结束时间
        activeYMS = `${yearActiveStart}.${monthActiveStart}`,
        activeYME = `${yearActiveEnd}.${monthActiveEnd}`;
    thisObj.$nextTick(() => {
        if (ds === de) {
            // 计算后的开始结束日期在同一月
            if (ds === activeYMS) {
                // 计算后的开始结束日期在开始面板
                DayInitStart(thisObj, ymdSelectedStart);
                thisObj.daysArrayEnd = SetDay(daysArrayEnd, { year: '', month: '', day: '' }, true, true);
            } else if (ds === activeYME) {
                // 计算后的开始结束日期在结束面板
                DayInitEnd(thisObj, ymdSelectedEnd);
                thisObj.daysArrayStart = SetDay(daysArrayStart, { year: '', month: '', day: '' }, true, true);
            }
        } else {
            thisObj.yearActiveStart = year;
            thisObj.monthActiveStart = month;
            thisObj.dayActiveStart = day;
            thisObj.yearActiveEnd = yearEnd;
            thisObj.monthActiveEnd = monthEnd;
            thisObj.dayActiveEnd = dayEnd;
            // DayInit(thisObj, date);
            DayInitEnd(thisObj, dateEnd, dateStart);
        }
        DisableArrow(thisObj);
        thisObj.btnType = 'primary';
    });
};

export default LockDayHandle;
