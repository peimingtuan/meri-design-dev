/**
 * 获取选中的数据
 * @param data - tableData
 * @param groupName
 * @returns {{checkedData: *, checkedIds: []}}
 * @constructor
 */
const GetCheckedData = (data, groupName) => {
    const tableData = JSON.parse(JSON.stringify(data)),
        checkedIds = [];
    let checkedData;
    if (groupName) {
        checkedData = tableData.filter(d => {
            const { children } = d;
            if (children && children.length) {
                d.children = children.filter(cd => {
                    if (cd.checked === 'checked') {
                        checkedIds.push(cd.id);
                        return cd;
                    }
                    return null;
                });
            }
            return (d.children && d.children.length);
        });
    } else {
        // 筛选出选中的数据
        checkedData = tableData.filter(d => d.checked === 'checked');
        checkedData.forEach(d => {
            checkedIds.push(d.id);
        });
    }
    return { checkedIds, checkedData: JSON.parse(JSON.stringify(checkedData)) };
};

export default GetCheckedData;
