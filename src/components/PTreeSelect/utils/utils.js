/** *
 * 多选查找选中的数据
 * @param thisObj
 * @param result 接收的结果
 * @param ids 传的ids
 * @param tree 树形结构数据
 * @return string
 */
const FindDataById = (thisObj, result, ids = [], tree) => {
    const {
        childDisable, linkage, lastStage, includeParent
    } = thisObj;
    if (childDisable) {
        tree.forEach(d => {
            const status = ids.includes(d.id);
            if (d.defaultDisabled) d.disabled = true;
            if (status) result.push(d);
            if (!status && d.children && JSON.stringify(d.children).length > 4) FindDataById(thisObj, result, ids, d.children);
        });
    } else {
        tree.forEach(d => {
            if (d.defaultDisabled) d.disabled = true;
            if (ids.includes(d.id)) {
                if (lastStage) {
                    // 只能选择最后一级
                    if (!d.children || !d.children.length) result.push(d);
                } else if (linkage) {
                    // 上下级联动
                    if (includeParent) {
                        result.push(d);
                    } else {
                        if (!d.children || !d.children.length) result.push(d);
                    }
                } else {
                    result.push(d);
                }
            }
            if (d.children && JSON.stringify(d.children).length > 4) FindDataById(thisObj, result, ids, d.children);
        });
    }
    return result;
};
/** *
 * 初始化组件 - 设置平铺列表的选中状态
 * @param thisObj
 * @param multiple 单、多选
 * @param ids 传的id或ids
 * @param tree 树形结构数据
 * @return string
 */
const SetInitData = async (thisObj, multiple, ids, tree) => new Promise(resolve => {
    if (multiple) {
        resolve(FindDataById(thisObj, [], ids, tree));
    } else {
        // 单选
        const findDataById = (id, data) => {
            data.forEach(d => {
                if (d.id === id) throw d;
                if (d.children && JSON.stringify(d.children).length > 4) findDataById(id, d.children);
            });
        };
        try {
            findDataById(ids, tree);
        } catch (obj) {
            resolve(obj);
        }
    }
});

/** *
 * 搜索
 * @param result 结果
 * @param pid 父级id
 * @param tile 列表数据
 * @return []
 */
const GetParentNameById = (result, pid, tile) => {
    const item = tile.find(d => d.id === pid);
    if (item && item.name) {
        result.unshift(item.name);
        if (item.parentId !== '-1') GetParentNameById(result, item.parentId, tile);
    }
    return result;
};
/** *
 * 设置搜索数据
 * @param str 输入的值
 * @param tile 列表数据
 * @param multiple 是否是多选
 * @param onlySearchLastLevel 只能搜索最后一级
 * @return []
 */
const SetSearchData = (str, tile, multiple, onlySearchLastLevel = false) => {
    const reg = new RegExp(str, 'g');
    return tile.filter(
        d => d.name.includes(str) && ((multiple && d.showCheckbox) || (!multiple && !d.showCheckbox)) && (onlySearchLastLevel ? d.lastNode : true)
    ).map(d => {
        const {
                parentId, id, name, checked, disabled, defaultDisabled
            } = d,
            result = name.replace(reg, `<span class="per-drop-tree-highlight">${str}</span>`);
        return {
            id,
            name: GetParentNameById([result], parentId, tile).toString().replace(/,/g, '/'),
            checked,
            disabled,
            defaultDisabled
        };
    });
};

/** *
 * 设置已选面板数据
 * @param ids id组
 * @param tile 列表数据
 * @return []
 */
const SetPanelData = (ids, tile) => {
    const arr = [];
    ids.forEach(did => {
        const item = tile.find(d => d.id === did);
        if (item && item.name) {
            const {
                    parentId, name
                } = item,
                text = GetParentNameById([name], parentId, tile).toString().replace(/,/g, '/'),
                obj = {
                    ...item,
                    biasName: text
                };
            arr.push(obj);
        }
    });
    return arr;
};

export {
    SetInitData,
    SetSearchData,
    SetPanelData
};
