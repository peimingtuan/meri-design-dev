/**
 * 设置鼠标hoer、设置selected选中
 * @param thisObj
 * @param status
 * @param index
 * @param flag
 * @constructor
 */
const SetStatus = (thisObj, status, index, flag) => {
    const { tableData, groupName } = thisObj;
    if (typeof index === 'string' && index.includes('-') && groupName) {
        const [i, ci] = index.split('-'),
            item = tableData[i],
            { children = [] } = item,
            currInd = Number(ci),
            len = children.length,
            prevInd = currInd - 1,
            nextInd = currInd + 1,
            cItem = children[currInd],
            prevItem = currInd ? children[prevInd] : null,
            nextItem = nextInd < len ? children[nextInd] : null;
        if (status === 'selected') {
            if (children && JSON.stringify(children).length > 4) {
                children.forEach((d, di) => {
                    d.selected = di === currInd;
                    d.bottomNone = false;
                });
            }
        }
        const strategy = {
            enter() {
                cItem[status] = true;
                cItem.bottomNone = false;
                // thisObj.$set(thisObj.tableData, currInd, cItem);
                if (currInd && prevItem) {
                    prevItem.bottomNone = true;
                    // thisObj.$set(thisObj.tableData, prevInd, prevItem);
                }
            },
            leave() {
                cItem[status] = false;
                if (nextInd < len && nextItem.selected) cItem.bottomNone = true;
                // thisObj.$set(thisObj.tableData, currInd, cItem);
                if (currInd && prevItem) {
                    if (status === 'hover' && cItem.selected) return;
                    prevItem.bottomNone = false;
                    // thisObj.$set(thisObj.tableData, prevInd, prevItem);
                }
            }
        };
        strategy[flag]();
        thisObj.$set(thisObj.tableData, i, item);
    } else {
        const len = tableData.length,
            currInd = Number(index),
            prevInd = currInd - 1,
            nextInd = currInd + 1,
            item = tableData[currInd],
            prevItem = currInd ? tableData[prevInd] : null,
            nextItem = nextInd < len ? tableData[nextInd] : null;
        if (status === 'selected') {
            tableData.forEach((d, di) => {
                d.selected = di === currInd;
                d.bottomNone = false;
            });
        }
        const strategy = {
            enter() {
                item[status] = true;
                item.bottomNone = false;
                thisObj.$set(thisObj.tableData, currInd, item);
                if (currInd && prevItem) {
                    prevItem.bottomNone = true;
                    thisObj.$set(thisObj.tableData, prevInd, prevItem);
                }
            },
            leave() {
                item[status] = false;
                if (nextInd < len && nextItem.selected) item.bottomNone = true;
                thisObj.$set(thisObj.tableData, currInd, item);
                if (currInd && prevItem) {
                    if (status === 'hover' && item.selected) return;
                    prevItem.bottomNone = false;
                    thisObj.$set(thisObj.tableData, prevInd, prevItem);
                }
            }
        };
        strategy[flag]();
    }
};

export default SetStatus;
