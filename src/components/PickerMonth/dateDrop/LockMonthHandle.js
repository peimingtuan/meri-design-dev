/**
 * 点击日期-月，向左计算结束年月，固定只能选择12个月
 * @param { year, month } 当前点击的年月
 * @param flag [-, +] 向左还是向右计算
 */

const LockMonthHandle = ({ year, month }, flag) => {
    let y, m;
    if (flag === '+') {
        if (month === '01') m = 12;
        else m = month - 1;
        if (m < 12) y = String(Number(year) + 1);
        else y = year;
    } else {
        // flag === '-'
        if (month === '12') m = 1;
        else m = Number(month) + 1;
        if (m > 1) y = String(year - 1);
        else y = year;
    }
    return [y, (m < 10 ? `0${m}` : `${m}`)];
};

export default LockMonthHandle;
