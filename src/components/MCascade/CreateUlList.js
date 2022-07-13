const getId = (i, selectedArr) => (selectedArr[i + 1]?.id || '');
const getName = (i, selectedArr) => (selectedArr[i + 1]?.name || '');
const getData = (i, selectedArr) => (selectedArr[i]?.children || []);

// 根据传入的id获取选中的数据
const getSelectedData = (ids, data) => {
    const arr = [{ children: data }];
    const each = (dataNow) => {
        dataNow.forEach(d => {
            if (ids.includes(d.id)) {
                arr.push(d);
                if (d.children && d.children.length) each(d.children);
            }
        });
    };
    each(data);
    return arr;
};

// 创建CreateUlList
const CreateUlList = (value, floor, data) => {
    const ulList = [];
    const selectedArr = getSelectedData(value, data);
    for (let i = 0; i < floor; i++) {
        ulList.push({
            ul: `ul${i}`, id: getId(i, selectedArr), name: getName(i, selectedArr), data: getData(i, selectedArr)
        });
    }
    return ulList;
};

export default CreateUlList;
