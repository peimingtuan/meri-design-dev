/**
 * 设置操作栏状态
 * @param thisObj
 * @param status
 * @constructor
 */
const SetRowToolsStatus = (thisObj, status) => {
    const {
        rowTools: { openSelectedDisable = false },
        tableData
    } = thisObj;
    if (!openSelectedDisable) return;
    thisObj.tableData = tableData.map(d => {
        const { data = [], more = [] } = d.tools;
        if (data && data.length) {
            d.tools.data = data.map(cd => {
                cd.disabled = status;
                return cd;
            });
        }
        if (more && more.length) {
            d.tools.more = data.map(cd => {
                cd.disabled = status;
                return cd;
            });
        }
        return d;
    });
};

export default SetRowToolsStatus;
