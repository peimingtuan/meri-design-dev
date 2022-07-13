import { SetWeek } from './SetArray';

/**
 * 点击日期
 * @param thisObj DateDrop的this
 * @param obj {weeks, thText}
 * @param panel 目前点击的是哪个面板
 */
const WeekPanelChange = (thisObj, { weeks, thText }, panel) => {
    let clearOther = false;
    const {
        toggleVal,
        clickThTextSelectedStart, clickThTextSelectedEnd,
        weeksSelectedStart,
        weeksArrayStart, weeksArrayEnd
    } = thisObj;
    if (toggleVal) {
        if (clickThTextSelectedStart) {
            if (clickThTextSelectedEnd) {
                const { year: y, month: m, day: d } = weeks[0];
                thisObj.weeksSelectedStart = weeks;
                thisObj.clickYearSelectedStart = y;
                thisObj.clickMonthSelectedStart = m;
                thisObj.clickDaySelectedStart = d;
                thisObj.clickThTextSelectedStart = thText;
                thisObj.clickSelectedDateStart = `${y}.${m}.${d}`;

                thisObj.weeksSelectedEnd = [];
                thisObj.clickYearSelectedEnd = '';
                thisObj.clickMonthSelectedEnd = '';
                thisObj.clickDaySelectedEnd = '';
                thisObj.clickThTextSelectedEnd = '';
                thisObj.clickSelectedDateEnd = '';
                clearOther = true;
            } else {
                const reg = /[.第周]/g;
                const nowSelected = thText.replace(reg, '');
                const clickSelected = clickThTextSelectedStart.replace(reg, '');
                if (nowSelected < clickSelected) {
                    const { year: ys, month: ms, day: ds } = weeksSelectedStart[6],
                        { year: y, month: m, day: d } = weeks[0];
                    thisObj.weeksSelectedEnd = weeksSelectedStart;
                    thisObj.clickYearSelectedEnd = ys;
                    thisObj.clickMonthSelectedEnd = ms;
                    thisObj.clickDaySelectedEnd = ds;
                    thisObj.clickThTextSelectedEnd = clickThTextSelectedStart;
                    thisObj.clickSelectedDateEnd = `${ys}.${ms}.${ds}`;

                    thisObj.weeksSelectedStart = weeks;
                    thisObj.clickYearSelectedStart = y;
                    thisObj.clickMonthSelectedStart = m;
                    thisObj.clickDaySelectedStart = d;
                    thisObj.clickThTextSelectedStart = thText;
                    thisObj.clickSelectedDateStart = `${y}.${m}.${d}`;
                } else {
                    const { year: y, month: m, day: d } = weeks[6];
                    thisObj.weeksSelectedEnd = weeks;
                    thisObj.clickYearSelectedEnd = y;
                    thisObj.clickMonthSelectedEnd = m;
                    thisObj.clickDaySelectedEnd = d;
                    thisObj.clickThTextSelectedEnd = thText;
                    thisObj.clickSelectedDateEnd = `${y}.${m}.${d}`;
                }
            }
        } else {
            const { year: y, month: m, day: d } = weeks[0];
            thisObj.weeksSelectedStart = weeks;
            thisObj.clickYearSelectedStart = y;
            thisObj.clickMonthSelectedStart = m;
            thisObj.clickDaySelectedStart = d;
            thisObj.clickThTextSelectedStart = thText;
            thisObj.clickSelectedDateStart = `${y}.${m}.${d}`;
        }

        if (thisObj.clickThTextSelectedStart && thisObj.clickThTextSelectedEnd) thisObj.btnType = 'primary';
        else thisObj.btnType = 'disabled';

        if (panel === 'start') {
            thisObj.weeksArrayStart = SetWeek(weeksArrayStart, thText, clearOther, toggleVal);
            if (!thisObj.clickThTextSelectedEnd) thisObj.weeksArrayEnd = SetWeek(weeksArrayEnd, '', true, toggleVal);
        } else {
            thisObj.weeksArrayEnd = SetWeek(weeksArrayEnd, thText, clearOther, toggleVal);
            if (!thisObj.clickThTextSelectedEnd) thisObj.weeksArrayStart = SetWeek(weeksArrayStart, '', true, toggleVal);
        }
    } else {
        // 单选
        const { year: y1, month: m1, day: d1 } = weeks[0],
            // { year: y2, month: m2, day: d2 } = weeks[6];
            { year: y2, month: m2, day: d2 } = weeks[ weeks.length-1];
        thisObj.weeksSelectedStart = weeks;
        thisObj.yearActiveStart = y1;
        thisObj.monthActiveStart = m1;
        thisObj.dayActiveStart = d1;
        thisObj.clickYearSelectedStart = y1;
        thisObj.clickMonthSelectedStart = m1;
        thisObj.clickDaySelectedStart = d1;
        thisObj.clickSelectedDateStart = `${y1}.${m1}.${d1}-${y2}.${m2}.${d2}`;
        thisObj.clickThTextSelectedStart = thText;
        thisObj.btnType = 'primary';
        thisObj.weeksArrayStart = SetWeek(weeksArrayStart, thText);
    }
};
const WeekPanelEnter = (thisObj, { weeks, thText }, panel) => {
    const reg = /[.第周]/g;
    const {
        clickYearSelectedStart, clickMonthSelectedStart,
        clickThTextSelectedStart,
        yearActiveStart, monthActiveStart,
        yearActiveEnd, monthActiveEnd,
        weeksArrayStart, weeksArrayEnd
    } = thisObj;
    const dateS = clickThTextSelectedStart.replace(reg, ''),
        dateN = thText.replace(reg, ''),
        clickYMS = clickYearSelectedStart + clickMonthSelectedStart,
        activeYMS = yearActiveStart + monthActiveStart,
        activeYME = yearActiveEnd + monthActiveEnd;
    if (panel === 'start') {
        if (clickYMS <= activeYME) {
            // 当前hover的时间小于开始时间
            if (dateN < dateS) {
                thisObj.weeksArrayStart = weeksArrayStart.map(d => {
                    const dateC = d.thText.replace(reg, '');
                    if (d.flag === 'n' && dateC >= dateN && dateC < dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
            } else {
                thisObj.weeksArrayStart = weeksArrayStart.map(d => {
                    const dateC = d.thText.replace(reg, '');
                    if (d.flag === 'n' && dateC <= dateN && dateC > dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
            }
            // 根据条件判断是否清空结束面板-当选择的时间在开始面板里清空结束面板的multiple
            if (clickYMS === activeYME) {
                thisObj.weeksArrayEnd = weeksArrayEnd.map(d => {
                    const dateC = d.thText.replace(reg, '');
                    if (d.flag === 'n' && dateC < dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
            } else {
                thisObj.weeksArrayEnd = weeksArrayEnd.map(d => {
                    d.multiple = '';
                    return d;
                });
            }
        }
    } else {
        // panel === 'end'
        if (clickYMS <= activeYME) {
            if (dateN < dateS) {
                thisObj.weeksArrayEnd = weeksArrayEnd.map(d => {
                    const dateC = d.thText.replace(reg, '');
                    if (d.flag === 'n' && dateC >= dateN && dateC < dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
                if (clickYMS >= activeYMS) {
                    thisObj.weeksArrayStart = weeksArrayStart.map(d => {
                        d.multiple = '';
                        return d;
                    });
                }
            } else {
                thisObj.weeksArrayStart = weeksArrayStart.map(d => {
                    const dateC = d.thText.replace(reg, '');
                    if (d.flag === 'n' && dateC > dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
                thisObj.weeksArrayEnd = weeksArrayEnd.map(d => {
                    const dateC = d.thText.replace(reg, '');
                    if (d.flag === 'n' && dateC <= dateN && dateC > dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
            }
        }
    }
};

export {
    WeekPanelChange, WeekPanelEnter
};
