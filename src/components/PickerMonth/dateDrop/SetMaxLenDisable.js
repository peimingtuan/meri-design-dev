/**
 * 计算基准年月
 * @param year
 * @param month
 * @param len
 * @constructor
 */
const CountBaseYM = (year, month, len) => {
    const y = Number(year),
        m = Number(month),
        l = Number(len),
        diffY = (m === 12 && l === 12) ? 1 : parseInt((m + l) / 12),
        diffM = (m + l) % 12 || 12;
    const strategy = {
        start() {
            const rm = diffM ? 12 : diffM - 2;
            return `${y - diffY}${rm < 10 ? `0${rm}` : rm}`;
        },
        end() {
            return `${y + diffY}${diffM < 10 ? `0${diffM}` : diffM}`;
        }
    };
    return {
        baseStart: strategy.start(),
        baseEnd: strategy.end()
    };
};
/**
 * 设置超出长度禁用
 * @param thisObj
 * @param flag Boolean 设置还是清除disabled
 * @constructor
 */
const SetMaxLenDisable = (thisObj, flag = false) => {
    const {
        maxLen,
        clickYearSelectedStart, clickMonthSelectedStart,
        yearNow, monthNow,
        monthsArrayStart, monthsArrayEnd
    } = thisObj;
    const { baseStart, baseEnd } = CountBaseYM(clickYearSelectedStart, clickMonthSelectedStart, maxLen),
        nowYM = `${yearNow}${monthNow}`;
    if (flag) {
        // 选择完成清除范围限制
        thisObj.monthsArrayStart = monthsArrayStart.map(d => {
            const cur = d.year + d.month;
            if (cur > nowYM) d.disabled = 'disabled';
            else d.disabled = '';
            return d;
        });
        thisObj.monthsArrayEnd = monthsArrayEnd.map(d => {
            const cur = d.year + d.month;
            if (cur > nowYM) d.disabled = 'disabled';
            else d.disabled = '';
            return d;
        });
    } else {
        thisObj.monthsArrayStart = monthsArrayStart.map(d => {
            const cur = d.year + d.month;
            if (cur >= baseEnd || cur <= baseStart) d.disabled = 'disabled';
            else d.disabled = '';
            return d;
        });
        thisObj.monthsArrayEnd = monthsArrayEnd.map(d => {
            const cur = d.year + d.month;
            if (cur >= baseEnd || cur <= baseStart || cur > nowYM) d.disabled = 'disabled';
            else d.disabled = '';
            return d;
        });
    }
};

export default SetMaxLenDisable;
