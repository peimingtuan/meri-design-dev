// 根据tabKey设置日期
const SetDateByTabKey = (date, tabKey) => {
    if (!date) return '';
    const strategy = {
        day: () => date,
        week: () => date,
        month: () => date.substr(0, 7),
        year: () => date.substr(0, 4)
    };
    return strategy[tabKey]();
};

export default SetDateByTabKey;
