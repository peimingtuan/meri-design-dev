/**
 * 深度克隆
 * @param {*} data 需要克隆的数据
 */
export  function cloneDeep(data){
    let t =  Object.prototype.toString.call(data)
    let o;
    if (t === '[object Array]') {
        o = [];
    } else if ( t === '[object Object]') {
        o = {};
    } else {
        return data;
    }
  
    if (t === '[object Array]') {
        for (let i = 0; i < data.length; i++) {
            o.push(cloneDeep(data[i]));
        }
    } else if ( t === '[object Object]') {
        for (let i in data) {
            o[i] = cloneDeep(data[i]);
        }
    }
    return o;
}

export function calcTipPosition (pDom, tDom, leftW, tipPlace ,border) {
    const { scrollWidth } = document.body
    let winH = document.body.clientHeight || document.documentElement.clientHeight
    const {pageXOffset} = window  
    let finalLeft, finalTop, finalBottom, tranigleLeft, tranigleTop, tranigleBottom
    let checkLeftDis = (tDom.width/2-leftW) > pDom.left   //左边空间不够
    let checkRightDis = (tDom.width/2 -(pDom.width - leftW)) > (scrollWidth - pDom.right)  // 右边空间不够
    let checkTop = pDom.top < (tDom.height + border)   // 顶部空间不够
    let checkBottom =  winH - pDom.bottom  < tDom.height + border  // 底部空间不够
    let bottomDis = winH - pDom.bottom + pDom.height + border  // 设置底对齐
    let topDis = pDom.top + pDom.height + border  // 设置顶对齐
    let traniglePos = -border*Math.cos(45) 
    function checkTopBottom () {
        if (tipPlace === 'top') {
            if (checkTop) {
                finalTop = topDis
                tranigleTop = traniglePos
            } else {
                finalBottom = bottomDis
                tranigleBottom = traniglePos
            }
        } else {
            if (checkBottom) {
                finalBottom = bottomDis
                tranigleBottom = traniglePos
            } else {
                finalTop = topDis
                tranigleTop = traniglePos 
            }
        }
    }
    // 特殊情况处理
    if (tDom.width > scrollWidth) {  // 弹出框宽度大于窗口
        finalLeft = 0
        tranigleLeft = pDom.left+leftW + border + 8
        checkTopBottom()
    } else if ((pDom.right > scrollWidth) && ((scrollWidth-pDom.left) < tDom.width)) { // 右边被遮住并且可见部分不足够展示
        finalLeft = scrollWidth - tDom.width
        tranigleLeft = (pDom.left - scrollWidth + tDom.width) + leftW - border
        checkTopBottom()
    } else {
        if (checkLeftDis) { 
            finalLeft = pDom.left + pageXOffset
            tranigleLeft = leftW - border
        } else if (checkRightDis) { 
            finalLeft = pDom.left - tDom.width + pDom.width + pageXOffset
            tranigleLeft = tDom.width - pDom.width +  leftW - border
        } else{ 
            finalLeft = pDom.left - (tDom.width/2 - leftW) + pageXOffset
            tranigleLeft = tDom.width/2 -  border
        }
        checkTopBottom()
    }
    return {finalLeft, finalTop, tranigleLeft, tranigleTop ,finalBottom, tranigleBottom}
}
 