/**
 * 给字符串添加class类名
 * @param text1 目标元素
 * @param text2 搜索输入的值
 * @param className 类名
 * @constructor
 */
const AddClassNameForText = (text1, text2, className) => {
    const tArr1 = text1.split(''),
        tArr2 = text2.split('');
    const formatArr = tArr1.map(d => {
        if (tArr2.includes(d)) return `<span class="${className}">${d}</span>`;
        return d;
    });
    return formatArr.join('');
};
const GetSameItem = (text1, text2) => {
    const tArr1 = text1.split(''),
        tArr2 = text2.split('');
    return tArr1.filter(d => tArr2.includes(d)).join('');
};
const newGetSameItem = (text1, text2) => {
    if(text1.indexOf(text2)===-1)return false
    return true
};

export default AddClassNameForText;
export { GetSameItem,newGetSameItem };
