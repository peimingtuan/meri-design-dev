// 获取树形节点的最深层级
const GetMaxFloor = (treeData = []) => {
    let max = 0;
    const each = (data = [], floor) => {
        data.forEach(d => {
            d.floor = floor;
            if (floor > max) max = floor;
            if (d.children && d.children.length > 0) each(d.children, floor + 1);
        });
    };
    each(treeData, 1);
    return max;
};

export default GetMaxFloor;
