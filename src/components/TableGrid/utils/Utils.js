// 将字符串转为charCode
const StrToCharCode = (str) => {
    const strCode = typeof str === 'string' ? str : str.toString();
    let code = '';
    if (strCode && strCode.length) {
        strCode.split('').forEach(d => {
            code += d.charCodeAt(0).toString();
        });
    } else {
        code = '';
    }
    return code;
};

// 排序
const QuickSort = (arr, key, status, type = 'string') => arr.sort((a, b) => {
    const va = a[key].text,
        vb = b[key].text,
        reg = /[.:\- ]/g,
        va1 = (va === '--' || va === '-' || va === '' || (!va && typeof va !== 'number'))
            ? Infinity
            : (type === 'number' ? va : type === 'date' ? va.replace(reg, '') : StrToCharCode(va)),
        vb1 = (vb === '--' || vb === '-' || vb === '' || (!vb && typeof vb !== 'number'))
            ? Infinity
            : (type === 'number' ? vb : type === 'date' ? vb.replace(reg, '') : StrToCharCode(vb));

    const strategy = {
        // 正序
        seq: () => (va1 - vb1),
        // 倒序
        ord: () => ((Number.POSITIVE_INFINITY === va1 || Number.POSITIVE_INFINITY === vb1) ? (va1 - vb1) : (vb1 - va1))
    };
    return strategy[status]();
});

export default QuickSort;
