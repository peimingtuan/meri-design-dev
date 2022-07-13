import QuickSort from '../../TableGrid/utils/Utils';

// 树形结构排序
const TreeSort = (arr, key, status, type) => QuickSort(arr, key, status, type).map(d => {
    const { children } = d;
    if (children && children.length) d.children = TreeSort(children, key, status, type);
    return d;
});

export default TreeSort;
