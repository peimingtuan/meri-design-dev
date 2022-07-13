/**
 * 设置选择的年月日
 * @param array Array
 * @param year String 2019
 * @param month String 10
 * @param day String 31
 * @param clearOther Boolean 清空其他
 * @param range Boolean 时间段或时间点
 */
const SetDay = (array, { year, month, day }, clearOther, range) => array.map(d => {
    if (d.flag === 'n') {
        if (d.year === year && d.month === month && d.day === day) d.selected = 'selected';
        else if (clearOther || !range) {
            d.selected = '';
            d.multiple = '';
        }
    }
    return d;
});

const SetWeek = (array, thText, clearOther, range) => array.map(d => {
    if (d.flag === 'n') {
        if (d.thText === thText) d.selected = 'selected';
        else if (clearOther || !range) {
            d.selected = '';
            d.multiple = '';
        }
    }
    return d;
});

const SetMonth = (array, { year, month }, clearOther, range) => array.map(d => {
    if (d.year === year && d.month === month) {
        d.selected = 'selected';
    } else if (clearOther || !range) {
        d.selected = '';
        d.multiple = '';
    }
    return d;
});

const SetYear = (array, { year }, clearOther, range) => array.map(d => {
    if (d.year === year) {
        d.selected = 'selected';
    } else if (clearOther || !range) {
        d.selected = '';
        d.multiple = '';
    }
    return d;
});

export { SetDay, SetWeek, SetMonth, SetYear };
