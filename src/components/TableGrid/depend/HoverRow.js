/**
 * 鼠标hover到每一行上
 * @param thisObj 当前vue的this
 * @param obj row对象
 * @param node 表示是node节点 Boolean
 * @param ind node节点的索引
 * @constructor
 */
const RowEnter = (thisObj, obj, node, ind) => {
    const { header, fixed } = thisObj;
    let childArr,
        rowInd;
    if (node) {
        const { children } = obj[ind];
        childArr = children;
        rowInd = ind;
    } else {
        const { target } = obj,
            { children, sectionRowIndex } = target;
        childArr = children;
        rowInd = sectionRowIndex;
    }

    // 设置背景颜色
    const cLen = childArr.length;
    for (let i = 0; i < cLen; i++) {
        if (childArr[i].className.includes('p-table-td')) {
            childArr[i].className = `${childArr[i].className} p-table-td-hover`;
        }
    }
    // 设置鼠标hover状态
    if (!node) thisObj.$emit('setHoverStatus', fixed, rowInd, 'enter');

    // 出现合并单元格的索引
    const rowSpanIndArr = [],
        rowSpanArr = [];
    header.forEach((d, i) => {
        if (d.rowSpan && d.rowSpan.length) {
            rowSpanIndArr.push(i);
            rowSpanArr.push(d.rowSpan);
        }
    });
    if (!rowSpanIndArr.length) return;
    const len = rowSpanIndArr.length;
    // 循环查找需要设置背景边框的td元素
    for (let i = 0; i < len; i++) {
        const arr = rowSpanArr[i];
        const jLen = arr.length;
        for (let j = 0; j < jLen; j++) {
            const dArr = arr[j],
                [rs, re] = dArr;
            if (rowInd >= rs && rowInd <= re + 1) {
                const rowSpanText = `rowSpan${rowSpanIndArr[i]}${rs}${re}`,
                    rowSpanRef = thisObj.$refs[rowSpanText][0];
                const hoverColor = '#f5f6f7';
                if (rowInd === rs) {
                    // 合并列的当前行
                    rowSpanRef.style.backgroundColor = hoverColor;
                    rowSpanRef.style.borderBottomColor = hoverColor;
                    rowSpanRef.style.borderLeftColor = hoverColor;
                    rowSpanRef.nextElementSibling.style.borderLeftColor = hoverColor;
                } else if (rowInd > rs && rowInd <= re) {
                    // 合并列的行
                    rowSpanRef.style.backgroundColor = hoverColor;
                    rowSpanRef.style.borderLeftColor = hoverColor;
                    rowSpanRef.nextElementSibling.style.borderLeftColor = hoverColor;
                    if (rowInd === re) rowSpanRef.style.borderBottomColor = '#fff';
                    else rowSpanRef.style.borderBottomColor = hoverColor;
                } else if (rowInd === re + 1) {
                    rowSpanRef.style.borderBottomColor = hoverColor;
                }
            }
        }
    }
};

const RowLeave = (thisObj, obj, node, ind) => {
    const { header, fixed } = thisObj;
    let row, rowInd, childArr;
    if (node) {
        row = obj[ind];
        rowInd = ind;
        const { children } = row;
        childArr = children;
    } else {
        const { target } = obj,
            { sectionRowIndex, children } = target;
        row = target;
        rowInd = sectionRowIndex;
        childArr = children;
    }

    const cLen = childArr.length;
    for (let i = 0; i < cLen; i++) {
        if (childArr[i].className.includes('p-table-td')) {
            childArr[i].className = childArr[i].className.replace(' p-table-td-hover', '');
        }
    }
    // 设置鼠标hover状态
    if (!node) thisObj.$emit('setHoverStatus', fixed, rowInd, 'leave');
    row.className = row.className.replace(' p-table-row-clear-border', '');

    // 出现合并单元格的索引
    const rowSpanIndArr = [],
        rowSpanArr = [];
    header.forEach((d, i) => {
        if (d.rowSpan && d.rowSpan.length) {
            rowSpanIndArr.push(i);
            rowSpanArr.push(d.rowSpan);
        }
    });
    if (!rowSpanIndArr.length) return;
    const len = rowSpanIndArr.length;
    for (let i = 0; i < len; i++) {
        const arr = rowSpanArr[i];
        const jLen = arr.length;
        for (let j = 0; j < jLen; j++) {
            const dArr = arr[j],
                [rs, re] = dArr;
            if (rowInd >= rs && rowInd <= re) {
                const rowSpanText = `rowSpan${rowSpanIndArr[i]}${rs}${re}`,
                    rowSpanRef = thisObj.$refs[rowSpanText][0];
                const hoverColor = '#eff0f1';
                if (rowInd === rs) {
                    // 合并列的当前行
                    rowSpanRef.style.backgroundColor = 'transparent';
                    rowSpanRef.style.borderBottomColor = hoverColor;
                    rowSpanRef.style.borderLeftColor = hoverColor;
                    rowSpanRef.nextElementSibling.style.borderLeftColor = hoverColor;
                } else if (rowInd > rs && rowInd <= re) {
                    // 合并列的行
                    rowSpanRef.style.backgroundColor = 'transparent';
                    rowSpanRef.style.borderLeftColor = hoverColor;
                    rowSpanRef.nextElementSibling.style.borderLeftColor = hoverColor;
                    rowSpanRef.style.borderBottomColor = hoverColor;
                }
            }
        }
    }
};

export { RowEnter, RowLeave };
