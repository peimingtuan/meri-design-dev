/**
 * 设置row的参数
 * @param th 当前row的tableHeader对象
 * @param ind 当前tableData的索引
 * @constructor
 */
// 设置td的显示状态
const SetTdStatus = (th, ind) => {
    const { rowSpan } = th;
    if (!rowSpan) return true;
    const len = rowSpan.length;
    let status = true;
    for (let i = 0; i < len; i++) {
        const [s, e] = rowSpan[i];
        if (ind > s && ind <= e) {
            status = false;
            break;
        }
    }
    return status;
};

// 设置（开始）合并列的列数
const SetRowSpan = (th, ind) => {
    const { rowSpan } = th;
    if (!rowSpan) return null;
    const len = rowSpan.length;
    let num = null;
    for (let i = 0; i < len; i++) {
        const [s, e] = rowSpan[i];
        if (ind === s) {
            num = e - s + 1;
            break;
        }
    }
    return num;
};

// 设置（开始）合并列的ref
// thi - 当前row的tableHeader的索引
const SetRef = (th, ind, thi) => {
    const { rowSpan } = th;
    if (!rowSpan) return null;
    const len = rowSpan.length;
    let str = null;
    for (let i = 0; i < len; i++) {
        const [s, e] = rowSpan[i];
        if (ind === s) {
            str = `rowSpan${thi}${s}${e}`;
            break;
        }
    }
    return str;
};

export { SetTdStatus, SetRowSpan, SetRef };
