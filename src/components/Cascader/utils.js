/**
 * 深度克隆
 * @param {*} data 需要克隆的数据
 */
export function cloneDeep(data) {
    const t = Object.prototype.toString.call(data);
    let o;
    if (t === '[object Array]') {
        o = [];
    } else if (t === '[object Object]') {
        o = {};
    } else {
        return data;
    }

    if (t === '[object Array]') {
        for (let i = 0; i < data.length; i++) {
            o.push(cloneDeep(data[i]));
        }
    } else if (t === '[object Object]') {
        for (const i in data) {
            o[i] = cloneDeep(data[i]);
        }
    }
    return o;
}

