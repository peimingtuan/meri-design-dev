/**
 * 范围限制格式化
 * @param thisObj DateDrop的this
 * @param scope
 * @constructor
 */
const FormatScope = (thisObj, scope) => {
    if (scope) {
        if (!scope.includes('-')) {
            console.error('The scope must be a period of time!');
            return;
        }
        let scopeYMD = scope;
        if (scope.includes(' ')) {
            const [s, e] = scope.split('-');
            const [sd, st] = s.split(' '),
                [ed, et] = e.split(' ');
            scopeYMD = `${sd}-${ed}`;
            thisObj.scopeYMD = scopeYMD;
            thisObj.scopeTimeStart = `${st}-${et}`;
            thisObj.scopeTimeEnd = `${st}-${et}`;
        } else {
            thisObj.scopeYMD = scopeYMD;
            thisObj.scopeTimeStart = '';
            thisObj.scopeTimeEnd = '';
        }
        thisObj.ymdLimitStart = scopeYMD;
        thisObj.ymdLimitEnd = scopeYMD;
    } else {
        thisObj.scopeYMD = '';
        thisObj.scopeTimeStart = '';
        thisObj.scopeTimeEnd = '';
        thisObj.ymdLimitStart = '';
        thisObj.ymdLimitEnd = '';
    }
};

export default FormatScope;
