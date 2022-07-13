import GetCheckedData from './GetCheckedData';

// 设置padding值
const SetPadding = (str, hasChild) => {
    if (!str || !str.includes('-')) return 0;
    return (str.split('-').length * 20 + (hasChild ? 0 : 20));
};

// 设置每行数据
const SetRow = (tableData, arr, parentId, open, ind) => {
    arr.forEach((d, i) => {
        const index = `${ind}-${i}`;
        d.parentId = parentId;
        d.index = index;
        d.open = !!d.open;
        d.show = !!open;
        d.paddingLeft = SetPadding(index, !!(d.children && d.children.length));
        tableData.push(d);
        if (d.children && d.children.length) SetRow(tableData, d.children, d.id, d.open, index);
    });
};

/**
 * 设置筛选
 * @param data
 * @param item
 * @return {any}
 * @constructor
 */
const Screen = (data, {
    status = 'single', id, key, selectedData
}) => {
    if (status.includes('single')) {
        if (id === 'all' || !id) return data;
        return data.filter(d => {
            if (d[key].text === selectedData.name) return d;
            return null;
        });
    }
    // 多选筛选
    if (!id) return data;
    const nameArr = selectedData.map(d => d.name);
    return data.filter(d => {
        if (nameArr.includes(d[key].text)) return d;
        return null;
    });
};
// 筛选数据
const SetScreenData = (thisObj, data) => {
    const { screenArray, groupName } = thisObj,
        nsa = JSON.stringify(screenArray);
    if (!nsa || nsa.length <= 4) return data;
    let tableData = data;
    const screenData = JSON.parse(nsa);
    if (groupName) {
        // 表体分组
        tableData.forEach(d => {
            if (d.children && JSON.stringify(d.children).length > 4) {
                screenData.forEach(d2 => {
                    d.children = Screen(d.children, d2);
                });
            }
        });
    } else {
        screenData.forEach(d => {
            tableData = Screen(tableData, d);
        });
    }
    return tableData;
};

/**
 * 格式化表体数据
 * @param thisObj
 * @param data
 * @param open
 * @param event
 * @returns {*}
 * @constructor
 */
const FormTableData = (thisObj, data, open, event) => data.map(d => {
    d.checked = d.checked || 'uncheck';
    d.disabled = !!d.disabled || false;
    d.selected = !!d.selected || false;
    d.hover = !!d.hover || false;

    if (open && d.tools) {
        const { tools: { data: tData = [], more: tMore = [] } } = d;
        if ((tData && tData.length) || (tMore && tMore.length)) {
            // 注册点击事件
            d.tools.event = (id, item) => {
                if (item instanceof Object && item.disabled) return;
                if (event) {
                    thisObj.$emit(event, {
                        itemId: d.id,
                        toolId: id
                    });
                }
            };
        }
    }
    const { childrenEvent = '' } = d;
    if (childrenEvent) {
        d.childrenFunc = (key, headerKey) => {
            thisObj.$emit(childrenEvent, {
                itemId: d.id,
                key,
                headerKey
            });
        };
    }
    // 设置下边框是否显示
    d.bottomNone = false;
    return d;
});

const CheckNextByKey = (data, item, key, index) => {
    const len = data.length - 1;
    let ind = index;
    if (index < len && item[key].text === data[index][key].text) {
        ind += 1;
        CheckNextByKey(data, item, key, ind);
    }
    return ind;
};

/**
 * 通过key设置合并列数据
 * @param data 计算的数据
 * @param item 当前项
 * @param key header中的key
 * @param i 计算的索引（结果索引）
 * @param s 开始索引
 */
const SetRowMergeByKey = (data, item, key, i, s) => {
    if (item && data[i] && item[key].text === data[i][key].text) {
        data[i][key].hide = true;
        // data[i].hide = true;
        SetRowMergeByKey(data, item, key, (i + 1), s);
    } else {
        // if (i - 1 > s) item[key].rowspan = [s, i - 1];
        if (i - 1 > s) item[key].rowspan = i - s;
        // if (i - 1 > s) item.rowspan = [s, i - 1];
        // if (i - 1 > s) item.rowspan = i - 1;
        if (data[i]) SetRowMergeByKey(data, data[i], key, (i + 1), i);
    }
};

/**
 * 设置table数据
 * @param thisObj
 * @param data table数据
 * @param history 表示设置历史数据
 * @param init 初始化
 * @constructor
 */
const SetTableGridData = (thisObj, data, history, init) => {
    if (!data || !data.length) {
        thisObj.changeLoadingShow(false);
        thisObj.tableData = [];
        return;
    }
    const { rowTools: { open = false, event = '' }, groupName, headerData } = thisObj;
    const formatData = SetScreenData(thisObj, JSON.parse(JSON.stringify(data)));
    let tableData;
    if (groupName) {
        tableData = formatData.map(d => {
            d.open = !!d.open;
            if (d.children && JSON.stringify(d.children).length > 4) {
                d.children = FormTableData(thisObj, d.children, open, event);
            }
            return d;
        });
    } else {
        tableData = FormTableData(thisObj, formatData, open, event);
        headerData.forEach(h => {
            if (h.rowMerge) SetRowMergeByKey(tableData, tableData[0], h.key, 1, 0);
        });
    }
    thisObj.tableData = tableData;
    if (history) thisObj.tableHistoryData = JSON.parse(JSON.stringify(data));
    if (init) thisObj.setBar();
    setTimeout(() => {
        thisObj.changeLoadingShow(false);
    });
    // 筛选出选中的数据
    const { checkedIds = [], checkedData = [] } = GetCheckedData(tableData, groupName);
    if (!checkedIds || !checkedIds.length) return;
    thisObj.selectHandle(checkedIds, checkedData);
};

export default SetTableGridData;
