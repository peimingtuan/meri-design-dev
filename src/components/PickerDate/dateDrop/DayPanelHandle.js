import { SetDay } from './SetArray';
import LockDayHandle from './LockDayHandle';

/**
 * 设置时间的默认值
 * @param thisObj DateDrop的this
 * @param format String 时间格式
 * @param flag String [start, end]
 * @return String
 */
const SetTimeDefault = (thisObj, format, flag) => {
    const flagHandle = {
        start() {
            // 计算开始时间
            thisObj.hourStart = '00';
            if (format.includes('hm')) thisObj.minuteStart = '00';
            if (format.includes('ms')) thisObj.secondStart = '00';
            return (format === 'h' ? '00' : (format === 'hm' ? '00:00' : '00:00:00'));
        },
        end() {
            // 计算结束时间
            thisObj.hourEnd = '23';
            if (format.includes('hm')) thisObj.minuteEnd = '59';
            if (format.includes('ms')) thisObj.secondEnd = '59';
            return (format === 'h' ? '23' : (format === 'hm' ? '23:59' : '23:59:59'));
        },
        now() {
            // 计算当前时间
            let t;
            const d = new Date(),
                h = d.getHours(),
                m = d.getMinutes(),
                s = d.getSeconds(),
                hour = h < 10 ? `0${h}` : h,
                minute = m < 10 ? `0${m}` : m,
                second = s < 10 ? `0${s}` : s;
            if (format === 'h') t = hour;
            else if (format === 'hm') t = `${hour}:${minute}`;
            else t = `${hour}:${minute}:${second}`;

            thisObj.hourEnd = hour;
            if (format.includes('hm')) thisObj.minuteEnd = minute;
            if (format.includes('ms')) thisObj.secondEnd = second;
            return t;
        }
    };
    return flagHandle[flag]();
};
// 设置时分秒
const SetHMS = (thisObj, panel, time) => {
    const [h = '', m = '', s = ''] = time.split(':');
    if (panel === 'start') {
        thisObj.hourStart = h;
        thisObj.minuteStart = m;
        thisObj.secondStart = s;
    } else {
        thisObj.hourEnd = h;
        thisObj.minuteEnd = m;
        thisObj.secondEnd = s;
    }
};
/**
 * 点击日期
 * @param thisObj DateDrop的this
 * @param obj {year, month, day}
 * @param panel 目前点击的是哪个面板
 */
const DayPanelChange = (thisObj, { year, month, day }, panel) => {
    const {
        format, toggleVal, scope, lock,
        timeStart, timeEnd,
        clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart,
        clickYearSelectedEnd,
        scopeTimeEnd,
        daysArrayStart, daysArrayEnd
    } = thisObj;
    let clearOther = false,
        btnType = 'disabled',
        tStart = '';
    if (format) {
        if (toggleVal) tStart = timeStart || `${SetTimeDefault(thisObj, format, 'start')}`;
        else tStart = timeStart || `${SetTimeDefault(thisObj, format, 'now')}`; // 如果是单选情况，是当前时分秒
    }
    if (!toggleVal || (clickYearSelectedStart && clickYearSelectedEnd) || (!clickYearSelectedStart && !clickYearSelectedEnd)) {
        // 如果当前选中的时间小于限制的时间，重新计算时分秒
        if (format && scope) {
            const [s] = scope.split('-');
            const sLimit = s.replace(/[.: ]/g, '');
            if (`${year}${month}${day}${tStart.replace(/:/, '')}` < sLimit) {
                const [d, t] = s.split(' ');
                const [sh = '00', sm = '00', ss = '00'] = t.split(':');
                thisObj.hourStart = sh;
                thisObj.minuteStart = sm;
                thisObj.secondStart = ss;
                tStart = t;
            }
        }
        thisObj.timeStart = tStart;
    }
    if (tStart) SetHMS(thisObj, panel, tStart);
    if (toggleVal) {
        if (lock) {
            // 锁定周期
            LockDayHandle(thisObj, { year, month, day });
        } else {
            if (clickYearSelectedStart) {
                if (clickYearSelectedEnd) {
                    thisObj.clickYearSelectedStart = year;
                    thisObj.clickMonthSelectedStart = month;
                    thisObj.clickDaySelectedStart = day;
                    const ymdSelectedStart = `${year}.${month}.${day}`;
                    thisObj.ymdSelectedStart = ymdSelectedStart;
                    thisObj.clickSelectedDateStart = `${ymdSelectedStart} ${tStart}`;

                    thisObj.clickYearSelectedEnd = '';
                    thisObj.clickMonthSelectedEnd = '';
                    thisObj.clickDaySelectedEnd = '';
                    thisObj.clickSelectedDateEnd = '';
                    thisObj.ymdSelectedEnd = '';
                    // thisObj.timeEnd = '';
                    clearOther = true;
                } else {
                    const nowSelected = year + month + day;
                    const clickSelected = clickYearSelectedStart + clickMonthSelectedStart + clickDaySelectedStart;
                    const ymdSelected = `${year}.${month}.${day}`;
                    let tEnd = (format ? (timeEnd || `${SetTimeDefault(thisObj, format, 'end')}`) : '');
                    // 如果当前选中的时间小于限制的时间，重新计算时分秒
                    if (format && scope) {
                        const [s, e = ''] = scope.split('-');
                        const eLimit = e.replace(/[.: ]/g, '');
                        if (`${year}${month}${day}${tEnd.replace(/:/, '')}` > eLimit) {
                            const [d, t = ''] = e.split(' ');
                            const [eh = '00', em = '00', es = '00'] = t.split(':');
                            thisObj.hourEnd = eh;
                            thisObj.minuteEnd = em;
                            thisObj.secondEnd = es;
                            tEnd = t;
                        }
                    }
                    thisObj.timeEnd = tEnd;
                    if (nowSelected < clickSelected) {
                        thisObj.clickYearSelectedEnd = clickYearSelectedStart;
                        thisObj.clickMonthSelectedEnd = clickMonthSelectedStart;
                        thisObj.clickDaySelectedEnd = clickDaySelectedStart;
                        const ymd = `${clickYearSelectedStart}.${clickMonthSelectedStart}.${clickDaySelectedStart}`;
                        thisObj.clickYearSelectedStart = year;
                        thisObj.clickMonthSelectedStart = month;
                        thisObj.clickDaySelectedStart = day;
                        thisObj.ymdSelectedStart = ymdSelected;
                        thisObj.ymdSelectedEnd = ymd;
                        if (scopeTimeEnd) {
                            const [s, e] = scopeTimeEnd.split('-');
                            thisObj.scopeTimeEnd = `${timeStart}-${e}`;
                        }
                        thisObj.clickSelectedDateStart = `${ymdSelected} ${tStart}`;
                        thisObj.clickSelectedDateEnd = `${ymd} ${tEnd}`;
                    } else {
                        thisObj.clickYearSelectedEnd = year;
                        thisObj.clickMonthSelectedEnd = month;
                        thisObj.clickDaySelectedEnd = day;
                        thisObj.ymdSelectedEnd = ymdSelected;
                        thisObj.clickSelectedDateEnd = `${ymdSelected} ${tEnd}`;
                    }

                    btnType = 'primary';
                }
            } else {
                thisObj.clickYearSelectedStart = year;
                thisObj.clickMonthSelectedStart = month;
                thisObj.clickDaySelectedStart = day;
                const ymdSelectedStart = `${year}.${month}.${day}`;
                thisObj.ymdSelectedStart = ymdSelectedStart;
                thisObj.clickSelectedDateStart = `${ymdSelectedStart} ${tStart}`;
            }
        }
    } else {
        thisObj.clickYearSelectedStart = year;
        thisObj.clickMonthSelectedStart = month;
        thisObj.clickDaySelectedStart = day;
        const ymdSelectedStart = `${year}.${month}.${day}`;
        thisObj.ymdSelectedStart = ymdSelectedStart;
        thisObj.clickSelectedDateStart = `${ymdSelectedStart} ${tStart}`;
        btnType = 'primary';
    }

    thisObj.btnType = btnType;

    if (panel === 'start') {
        thisObj.daysArrayStart = SetDay(daysArrayStart, { year, month, day }, clearOther, toggleVal);
        if (toggleVal && !thisObj.clickSelectedDateEnd) thisObj.daysArrayEnd = SetDay(daysArrayEnd, { year: '', month: '', day: '' }, true, toggleVal);
    }
    if (toggleVal && panel === 'end') {
        thisObj.daysArrayEnd = SetDay(daysArrayEnd, { year, month, day }, clearOther, toggleVal);
        if (!thisObj.clickSelectedDateEnd) thisObj.daysArrayStart = SetDay(daysArrayStart, { year: '', month: '', day: '' }, true, toggleVal);
    }
};

const DayPanelEnter = (thisObj, { year, month, day }, panel) => {
    const {
        clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart,
        yearActiveStart, monthActiveStart,
        yearActiveEnd, monthActiveEnd,
        daysArrayStart, daysArrayEnd
    } = thisObj;
    const dateS = clickYearSelectedStart + clickMonthSelectedStart + clickDaySelectedStart,
        dateN = year + month + day,
        clickYMS = clickYearSelectedStart + clickMonthSelectedStart,
        activeYMS = yearActiveStart + monthActiveStart,
        activeYME = yearActiveEnd + monthActiveEnd;

    if (panel === 'start') {
        // 点击的时间小于结束面板的active时间
        if (clickYMS <= activeYME) {
            // 当前hover的时间小于开始时间
            if (dateN < dateS) {
                thisObj.daysArrayStart = daysArrayStart.map(d => {
                    const dateC = d.year + d.month + d.day;
                    if (d.flag === 'n' && dateC >= dateN && dateC < dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
            } else {
                thisObj.daysArrayStart = daysArrayStart.map(d => {
                    const dateC = d.year + d.month + d.day;
                    if (d.flag === 'n' && dateC <= dateN && dateC > dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
            }
            // 根据条件判断是否清空结束面板-当选择的时间在开始面板里清空结束面板的multiple
            if (clickYMS === activeYME) {
                thisObj.daysArrayEnd = daysArrayEnd.map(d => {
                    const dateC = d.year + d.month + d.day;
                    if (d.flag === 'n' && dateC < dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
            } else {
                thisObj.daysArrayEnd = daysArrayEnd.map(d => {
                    d.multiple = '';
                    return d;
                });
            }
        }
    } else {
        // panel === 'end'
        if (clickYMS <= activeYME) {
            if (dateN < dateS) {
                thisObj.daysArrayEnd = daysArrayEnd.map(d => {
                    const dateC = d.year + d.month + d.day;
                    if (d.flag === 'n' && dateC >= dateN && dateC < dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
                if (clickYMS >= activeYMS) {
                    thisObj.daysArrayStart = daysArrayStart.map(d => {
                        d.multiple = '';
                        return d;
                    });
                }
            } else {
                thisObj.daysArrayStart = daysArrayStart.map(d => {
                    const dateC = d.year + d.month + d.day;
                    if (d.flag === 'n' && dateC > dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
                thisObj.daysArrayEnd = daysArrayEnd.map(d => {
                    const dateC = d.year + d.month + d.day;
                    if (d.flag === 'n' && dateC <= dateN && dateC > dateS) d.multiple = 'multiple';
                    else d.multiple = '';
                    return d;
                });
            }
        }
    }
};

export { DayPanelChange, DayPanelEnter };
