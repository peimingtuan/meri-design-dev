// 设置开始时分秒
const SetPanelTimeStart = (thisObj, time) => {
    const {
        clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart
    } = thisObj;
    const selectedDateStart = `${clickYearSelectedStart}.${clickMonthSelectedStart}.${clickDaySelectedStart}`;
    thisObj.clickSelectedDateStart = time ? `${selectedDateStart} ${time}` : selectedDateStart;
};
// 设置结束时分秒
const SetPanelTimeEnd = (thisObj, time) => {
    const {
        clickYearSelectedEnd, clickMonthSelectedEnd, clickDaySelectedEnd
    } = thisObj;
    const selectedDateEnd = `${clickYearSelectedEnd}.${clickMonthSelectedEnd}.${clickDaySelectedEnd}`;
    thisObj.clickSelectedDateEnd = time ? `${selectedDateEnd} ${time}` : selectedDateEnd;
};

// 判断是否在同一天
const IsSameDay = (thisObj) => {
    const {
        clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart,
        clickYearSelectedEnd, clickMonthSelectedEnd, clickDaySelectedEnd
    } = thisObj;
    const start = `${clickYearSelectedStart}${clickMonthSelectedStart}${clickDaySelectedStart}`,
        end = `${clickYearSelectedEnd}${clickMonthSelectedEnd}${clickDaySelectedEnd}`;
    return [start === end, start, end];
};
/**
 * 时分秒改变
 * @param thisObj DateDrop的this
 * @param panel [start, end]
 * @param flag [h, m, s]
 * @param value 传入的值
 * @constructor
 */
const TimePanelChange = (thisObj, panel, flag, value) => {
    const {
        toggleVal, format,
        scopeTimeStart, scopeTimeEnd,
        hourStart, minuteStart, secondStart,
        hourEnd, minuteEnd, secondEnd,
        timeStart, timeEnd
    } = thisObj;

    const reg = /:/g,
        [isSameDay] = IsSameDay(thisObj);
    let hour,
        minute,
        second,
        clickDate; // 点击选中的日期
    if (panel === 'start') {
        hour = hourStart;
        minute = minuteStart;
        second = secondStart;
        if (flag === 'h') {
            thisObj.hourStart = value;
            hour = value;
        } else if (flag === 'm') {
            thisObj.minuteStart = value;
            minute = value;
        } else {
            // flag === 's'
            thisObj.secondStart = value;
            second = value;
        }
        let ts;
        if (format === 'hm') ts = `${hour}:${minute}`;
        else if (format === 'hms') ts = `${hour}:${minute}:${second}`;
        else ts = `${hour}`;
        if (scopeTimeEnd) {
            if (flag === 'h') {
                thisObj.scopeTimeEnd = hour + scopeTimeEnd.slice(2);
                if (isSameDay) {
                    const [scopeS] = scopeTimeStart.split('-');
                    if (ts.replace(reg, '') < scopeS.replace(reg, '')) ts = scopeS;
                }
            } else if (flag === 'm') {
                const [s, e] = scopeTimeEnd.split('-');
                if (isSameDay) {
                    const [scopeS] = scopeTimeStart.split('-');
                    if (ts.replace(reg, '') < scopeS.replace(reg, '')) ts = scopeS;
                }
                thisObj.scopeTimeEnd = `${ts}-${e}`;
            } else {
                // flag === 's'
                const [s, e] = scopeTimeEnd.split('-');
                if (isSameDay && scopeTimeStart) {
                    const [scopeS] = scopeTimeStart.split('-');
                    if (ts.replace(reg, '') < scopeS.replace(reg, '')) ts = scopeS;
                }
                thisObj.scopeTimeEnd = `${ts}-${e}`;
            }
        }
        const tsStatus = ts.replace(reg, '');
        thisObj.btnTypeTime = (toggleVal ? (timeEnd.replace(reg, '') && tsStatus) : tsStatus) ? 'primary' : 'disabled';
        thisObj.timeStart = ts;
        SetPanelTimeStart(thisObj, ts);
    } else {
        // panel === 'end' 结束面板
        hour = hourEnd;
        minute = minuteEnd;
        second = secondEnd;
        if (flag === 'h') {
            thisObj.hourEnd = value;
            hour = value;
        } else if (flag === 'm') {
            thisObj.minuteEnd = value;
            minute = value;
        } else {
            // flag === 's'
            thisObj.secondEnd = value;
            second = value;
        }
        let te;
        if (format === 'hms') te = `${hour}:${minute}:${second}`;
        else if (format === 'hm') te = `${hour}:${minute}`;
        else te = `${hour}`;
        if (isSameDay && scopeTimeEnd) {
            const [scopeS, scopeE] = scopeTimeEnd.split('-');
            if (te.replace(reg, '') > scopeE.replace(reg, '')) te = scopeE;
        }

        thisObj.btnTypeTime = (timeStart.replace(reg, '') && te.replace(reg, '')) ? 'primary' : 'disabled';
        thisObj.timeEnd = te;
        SetPanelTimeEnd(thisObj, te);
    }

    if (toggleVal) clickDate = `${thisObj.clickSelectedDateStart}-${thisObj.clickSelectedDateEnd}`;
    else clickDate = thisObj.clickSelectedDateStart;
    if (thisObj.date !== clickDate) thisObj.changeBtnType(clickDate);
};

export default TimePanelChange;
