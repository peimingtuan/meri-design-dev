// 格式化数据 获取树形节点的最深层级
const FormatData = (treeData = []) => {
    let max = 0;
    const each = (data = [], floor) => data.map(d => {
        d.checked = d.checked || 'uncheck';
        d.disabled = !!d.disabled;
        d.floor = floor;
        if (floor > max) max = floor;
        if (d.children && d.children.length > 0) d.children = each(d.children, floor + 1);
        return d;
    });
    const data = each(treeData, 0);
    return { max: max + 1, data };
};

export default FormatData;
