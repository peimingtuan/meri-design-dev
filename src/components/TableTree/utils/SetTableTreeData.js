/** *
 * 将数据转成map对象
 * @param tile
 */
const ToMapObj = (tile) => {
    const map = new Map(); // map对象
    tile.forEach(d => {
        if (!map.has(d.id)) map.set(d.id, d);
    });
    return map;
};
/**
 * 组装数据成树形结构
 * @param tile 平铺原始数据
 */
const PackageTool = (tile) => {
    const result = [];
    if (!Array.isArray(tile)) return result;
    tile.forEach(item => {
        delete item.children;
    });
    const map = ToMapObj(tile);
    tile.forEach(item => {
        const parent = map.get(item.parentId);
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
};

const TileTool = (result, tree, pid) => {
    tree.forEach(d => {
        const obj = {
            parentId: pid,
            ...d
        };
        delete obj.children;
        result.push(obj);
        if (d.children && d.children instanceof Array && JSON.stringify(d.children).length > 4) {
            TileTool(result, d.children, d.id);
        }
    });
};

// 设置padding值
const SetPadding = (str, hasChild) => {
    if (!str || !str.includes('-')) return 0;
    return (str.split('-').length * 20 + (hasChild ? 0 : 20));
};

// 设置每行数据
const SetRow = (thisObj, tableData, arr, parentId, open, ind) => {
    const { rowTools: { open: rOpen = false, event } } = thisObj;
    arr.forEach((d, i) => {
        const index = `${ind}-${i}`;
        d.parentId = parentId;
        d.index = index;
        d.open = !!d.open;
        d.show = !!open;
        d.paddingLeft = SetPadding(index, !!(d.children && d.children.length));

        if (rOpen && d.tools) {
            const { data: tData = [], more: tMore = [] } = d.tools;
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
        tableData.push(d);
        if (d.children && d.children.length) SetRow(thisObj, tableData, d.children, d.id, d.open, index);
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
    const { screenArray } = thisObj,
        nsa = JSON.stringify(screenArray);
    if (!nsa || nsa.length <= 4) return data;
    let tableData = [];
    TileTool(tableData, JSON.parse(JSON.stringify(data)), '-1');
    const screenData = JSON.parse(nsa);
    screenData.forEach(d => {
        tableData = Screen(tableData, d);
    });
    return PackageTool(tableData);
};

/**
 * 设置table数据
 * @param thisObj
 * @param data table数据
 * @param history 表示设置历史数据
 * @constructor
 */
const SetTableTreeData = (thisObj, data, history) => {
    if (!data || !data.length) {
        thisObj.changeLoadingShow(false);
        thisObj.tableData = [];
        return;
    }
    const { rowTools: { open = false, event } } = thisObj;
    const formatData = SetScreenData(thisObj, JSON.parse(JSON.stringify(data)));
    const tableData = [];

    formatData.forEach((d, i) => {
        d.parentId = '-1';
        d.index = `${i}`;
        d.open = !!d.open;
        d.show = true;
        d.selected = !!d.selected || false;
        d.hover = !!d.hover || false;
        d.paddingLeft = 0;
        if (open && d.tools) {
            const { data: tData = [], more: tMore = [] } = d.tools;
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
        tableData.push(d);
        if (d.children && d.children.length) SetRow(thisObj, tableData, d.children, d.id, d.open, `${i}`);
    });

    thisObj.tableData = tableData;
    if (history) thisObj.tableHistoryData = JSON.parse(JSON.stringify(data));
    thisObj.setBar();
    setTimeout(() => { thisObj.changeLoadingShow(false); });
};

export default SetTableTreeData;
