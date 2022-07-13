// 计算两个时间的差
const DiffTimestamp = (start, end) => {
    let l, r;
    if (typeof start === 'string') {
        l = start;
        r = end;
    } else {
        l = start.join('.');
        r = end.join('.');
    }
    const S = new Date(l.replace(/\./g, '/')).getTime();
    const E = new Date(r.replace(/\./g, '/')).getTime();
    return E - S;
};

export default DiffTimestamp;
