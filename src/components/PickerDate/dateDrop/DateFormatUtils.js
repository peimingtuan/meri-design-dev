// 拆分时间的辅助工具函数

/**
 * 拆分时间
 * @param date String '2019.09.30 08:09:10-2019.10.31 08:09:10'
 */
const DateFormat = date => {
    const reg = /[.:\- ]/g;
    let dateStart = '',
        dateEnd = '';
    if (date && date.replace(reg, '')) {
        const [ds, de] = date.split('-');
        dateStart = ds;
        dateEnd = de;
    }

    return [dateStart, dateEnd];
};

/**
 * 格式化传入的时间
 * @param date String '2020.02.14 08:09:10'
 */
const DateTimeFormat = date => {
    let ymd = '',
        time = '';
    if (date) {
        if (date.includes(' ')) {
            const [d, t] = date.split(' ');
            ymd = d;
            time = t;
        } else {
            ymd = date;
        }
    }
    return [ymd, time];
};

export { DateFormat, DateTimeFormat };
