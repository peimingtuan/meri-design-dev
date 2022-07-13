import CountNextMonth from '../../static/utils/datePicker/CountNextMonth';
// tabKey日周情况下
const CountStartYMD = (thisObj) => {
    const {
        yearNow, monthNow, dayNow,
        clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart,
        clickYearSelectedEnd
    } = thisObj;
    let DATE, clickSelectedDateStart;
    if (clickYearSelectedStart && clickMonthSelectedStart && clickDaySelectedStart) {
        // 如果存在选中时间，切换到有选择时间的面板
        DATE = `${clickYearSelectedStart}.${clickMonthSelectedStart}.${clickDaySelectedStart}`;
        clickSelectedDateStart = `${clickYearSelectedStart}.${clickMonthSelectedStart}.${clickDaySelectedStart}`;
        thisObj.yearActiveStart = clickYearSelectedStart;
        thisObj.monthActiveStart = clickMonthSelectedStart;
        thisObj.dayActiveStart = clickDaySelectedStart;
    } else if (clickYearSelectedStart && clickMonthSelectedStart && !clickDaySelectedStart) {
        DATE = `${clickYearSelectedStart}.${clickMonthSelectedStart}.01`;
        clickSelectedDateStart = '';
        thisObj.yearActiveStart = clickYearSelectedStart;
        thisObj.monthActiveStart = clickMonthSelectedStart;
        thisObj.dayActiveStart = '01';
    } else if (clickYearSelectedStart && !clickMonthSelectedStart && !clickDaySelectedStart) {
        let year = clickYearSelectedStart;
        if (clickYearSelectedEnd && clickYearSelectedStart === clickYearSelectedEnd) year = String(clickYearSelectedStart - 1);
        DATE = `${year}.01.01`;
        clickSelectedDateStart = '';
        thisObj.yearActiveStart = year;
        thisObj.monthActiveStart = '01';
        thisObj.dayActiveStart = '01';
    } else {
        DATE = `${yearNow}.${monthNow}.${dayNow}`;
        clickSelectedDateStart = '';
        thisObj.yearActiveStart = yearNow;
        thisObj.monthActiveStart = monthNow;
        thisObj.dayActiveStart = dayNow;
    }

    return [DATE, clickSelectedDateStart];
};
const CountEndYMD = (thisObj) => {
    const {
        yearNow, monthNow, dayNow,
        clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd, clickDaySelectedEnd
    } = thisObj;
    let DATE, clickSelectedDateEnd;
    if (clickYearSelectedEnd && clickMonthSelectedEnd && clickDaySelectedEnd) {
        // 如果存在选中时间，切换到有选择时间的面板
        DATE = `${clickYearSelectedEnd}.${clickMonthSelectedEnd}.${clickDaySelectedEnd}`;
        clickSelectedDateEnd = `${clickYearSelectedEnd}.${clickMonthSelectedEnd}.${clickDaySelectedEnd}`;
        thisObj.yearActiveEnd = clickYearSelectedEnd;
        thisObj.monthActiveEnd = clickMonthSelectedEnd;
        thisObj.dayActiveEnd = clickDaySelectedEnd;
    } else if (clickYearSelectedEnd && clickMonthSelectedEnd && !clickDaySelectedEnd) {
        DATE = `${clickYearSelectedEnd}.${clickMonthSelectedEnd}.01`;
        clickSelectedDateEnd = '';
        thisObj.yearActiveEnd = clickYearSelectedEnd;
        thisObj.monthActiveEnd = clickMonthSelectedEnd;
        thisObj.dayActiveEnd = '01';
    } else if (clickYearSelectedEnd && !clickMonthSelectedEnd && !clickDaySelectedEnd) {
        DATE = `${clickYearSelectedEnd}.01.01`;
        clickSelectedDateEnd = '';
        thisObj.yearActiveEnd = clickYearSelectedEnd;
        thisObj.monthActiveEnd = '01';
        thisObj.dayActiveEnd = '01';
    } else if (clickYearSelectedStart) {
        // let year = String(Number(clickYearSelectedStart) + 1),
        let year = clickYearSelectedStart,
            month;
        const day = clickDaySelectedStart || '01';
        if (clickMonthSelectedStart) {
            const m = Number(clickMonthSelectedStart) + 1;
            if (m === 13) {
                month = '01';
                year = String(Number(clickYearSelectedStart) + 1);
            } else {
                month = m < 10 ? `0${m}` : `${m}`;
            }
        } else {
            year = String(Number(clickYearSelectedStart) + 1);
            month = '01';
        }
        DATE = `${year}.${month}.${day}`;
        clickSelectedDateEnd = '';
        thisObj.yearActiveEnd = year;
        thisObj.monthActiveEnd = month;
        thisObj.dayActiveEnd = day;
    } else {
        const countDateE = CountNextMonth([yearNow, monthNow, dayNow]);
        const [y, m, d] = countDateE.split('.');
        DATE = `${y}.${m}.${d}`;
        clickSelectedDateEnd = '';
        thisObj.yearActiveEnd = y;
        thisObj.monthActiveEnd = m;
        thisObj.dayActiveEnd = d;
    }

    return [DATE, clickSelectedDateEnd];
};

// tabKey月情况下
const CountStartYM = (thisObj) => {
    const {
        yearNow, monthNow,
        clickYearSelectedStart, clickMonthSelectedStart,
        clickYearSelectedEnd
    } = thisObj;
    let DATE, clickSelectedDateStart, year;
    if (clickYearSelectedStart && clickYearSelectedEnd && clickYearSelectedStart === clickYearSelectedEnd) year = String(clickYearSelectedStart - 1);
    else year = clickYearSelectedStart;
    if (clickYearSelectedStart && clickMonthSelectedStart) {
        DATE = `${year}.${clickMonthSelectedStart}`;
        clickSelectedDateStart = `${clickYearSelectedStart}.${clickMonthSelectedStart}`;
        thisObj.yearActiveStart = year;
        thisObj.monthActiveStart = clickMonthSelectedStart;
    } else if (clickYearSelectedStart && !clickMonthSelectedStart) {
        DATE = `${year}.01`;
        clickSelectedDateStart = '';
        thisObj.yearActiveStart = year;
        thisObj.monthActiveStart = '01';
    } else {
        DATE = `${yearNow}.${monthNow}`;
        clickSelectedDateStart = '';
        thisObj.yearActiveStart = yearNow;
        thisObj.monthActiveStart = monthNow;
    }

    return [DATE, clickSelectedDateStart];
};
const CountEndYM = (thisObj) => {
    const {
        yearNow, monthNow,
        clickYearSelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd
    } = thisObj;
    let DATE, clickSelectedDateEnd;
    if (clickYearSelectedEnd && clickMonthSelectedEnd) {
        DATE = `${clickYearSelectedEnd}.${clickMonthSelectedEnd}`;
        clickSelectedDateEnd = `${clickYearSelectedEnd}.${clickMonthSelectedEnd}`;
        thisObj.yearActiveEnd = clickYearSelectedEnd;
        thisObj.monthActiveEnd = clickMonthSelectedEnd;
    } else if (clickYearSelectedEnd && !clickMonthSelectedEnd) {
        DATE = `${clickYearSelectedEnd}.01`;
        clickSelectedDateEnd = '';
        thisObj.yearActiveEnd = clickYearSelectedEnd;
        thisObj.monthActiveEnd = '01';
    } else if (clickYearSelectedStart) {
        const year = String(Number(clickYearSelectedStart) + 1),
            month = '01';
        DATE = `${year}.${month}`;
        clickSelectedDateEnd = '';
        thisObj.yearActiveEnd = year;
        thisObj.monthActiveEnd = month;
    } else {
        const y = String(Number(yearNow) + 1);
        DATE = `${y}.${monthNow}`;
        clickSelectedDateEnd = '';
        thisObj.yearActiveEnd = y;
        thisObj.monthActiveEnd = monthNow;
    }

    return [DATE, clickSelectedDateEnd];
};

// tabKey年情况下
const CountStartY = (thisObj) => {
    const {
        yearNow,
        clickYearSelectedStart,
        yearActiveStartRight
    } = thisObj;
    let DATE, clickSelectedDateStart;
    if (clickYearSelectedStart) {
        DATE = yearActiveStartRight || clickYearSelectedStart;
        clickSelectedDateStart = clickYearSelectedStart;
    } else {
        DATE = `${yearNow}`;
        clickSelectedDateStart = '';
    }

    return [DATE, clickSelectedDateStart];
};
const CountEndY = (thisObj) => {
    const {
        yearNow,
        clickYearSelectedStart, clickYearSelectedEnd,
        yearActiveStartRight
    } = thisObj;
    let DATE, clickSelectedDateEnd;
    if (clickYearSelectedEnd) {
        // 多选
        const year = yearActiveStartRight || clickYearSelectedStart;
        DATE = String(Number(year) + 12);
        clickSelectedDateEnd = clickYearSelectedEnd;
    } else {
        // 单选
        DATE = String(Number(yearNow) + 12);
        clickSelectedDateEnd = '';
    }

    return [DATE, clickSelectedDateEnd];
};

/**
 * tabKey切换初始化日期设置
 * @param thisObj DateDrop的this
 * @param tabKey
 * @return {string}
 * @constructor
 */
const TabKeyHandle = (thisObj, tabKey) => {
    const {
        toggleVal, format,
        timeStart, timeEnd
    } = thisObj;
    let DATE;
    if (toggleVal) {
        const strategy = {
            day() {
                const [dateDayStart, clickSelectedDateStartDay] = CountStartYMD(thisObj);
                const [dateDayEnd, clickSelectedDateEndDay] = CountEndYMD(thisObj);
                let dateStart = dateDayStart,
                    dateEnd = dateDayEnd;
                const tStart = (format && timeStart) ? ` ${timeStart}` : '',
                    tEnd = (format && timeEnd) ? ` ${timeEnd}` : '';
                if (tStart) dateStart = `${dateDayStart} ${tStart}`;
                if (tEnd) dateEnd = `${dateDayEnd} ${tEnd}`;
                return [`${dateStart}-${dateEnd}`, clickSelectedDateStartDay, clickSelectedDateEndDay];
            },
            week() {
                const [dateWeekStart, clickSelectedDateStartWeek] = CountStartYMD(thisObj);
                const [dateWeekEnd, clickSelectedDateEndWeek] = CountEndYMD(thisObj);
                return [`${dateWeekStart}-${dateWeekEnd}`, clickSelectedDateStartWeek, clickSelectedDateEndWeek];
            },
            month() {
                const [dateMonthStart, clickSelectedDateStartMonth] = CountStartYM(thisObj);
                const [dateMonthEnd, clickSelectedDateEndMonth] = CountEndYM(thisObj);
                return [`${dateMonthStart}-${dateMonthEnd}`, clickSelectedDateStartMonth, clickSelectedDateEndMonth];
            },
            year() {
                const [dateYearStart, clickSelectedDateStartYear] = CountStartY(thisObj);
                const [dateYearEnd, clickSelectedDateEndYear] = CountEndY(thisObj);
                return [`${dateYearStart}-${dateYearEnd}`, clickSelectedDateStartYear, clickSelectedDateEndYear];
            }
        };
        const [date, clickSelectedDateStart, clickSelectedDateEnd] = strategy[tabKey]();
        DATE = date;
        const clickSelectedDate = `${clickSelectedDateStart}-${clickSelectedDateEnd}`;
        thisObj.clickSelectedDateStart = clickSelectedDateStart;
        thisObj.clickSelectedDateEnd = clickSelectedDateEnd;
        thisObj.changeBtnType(clickSelectedDate);
    } else {
        // 单选
        const strategy = {
            day() {
                const tStart = (format && timeStart) ? ` ${timeStart}` : '';
                const [dateDay, clickSelectedDateStartDay] = CountStartYMD(thisObj);
                let date = dateDay;
                if (tStart) date = `${dateDay} ${tStart}`;
                return [date, clickSelectedDateStartDay];
            },
            week: () => CountStartYMD(thisObj),
            month: () => CountStartYM(thisObj),
            year: () => CountStartY(thisObj)
        };
        const [date, clickSelectedDateStart] = strategy[tabKey]();
        DATE = date;
        thisObj.clickSelectedDateStart = clickSelectedDateStart;
        thisObj.changeBtnType(clickSelectedDateStart);
    }
    return DATE;
};

export default TabKeyHandle;
