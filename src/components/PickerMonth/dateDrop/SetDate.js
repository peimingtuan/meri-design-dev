import CountPrevMonth from '../../static/utils/datePicker/CountPrevMonth';
import CountPrevYear from '../../static/utils/datePicker/CountPrevYear';

import { DateFormat, DateTimeFormat } from '../../PickerDate/dateDrop/DateFormatUtils';

/**
 * 设置年月日
 * @param thisObj DateDrop的this
 * @param date 传入的日期
 * @param toggleVal 时间段
 * @param yearNow 当前年
 * @param monthNow 当前月
 * @param dayNow 当前日
 * @constructor
 */
const SetDate = (thisObj, date, toggleVal, yearNow, monthNow, dayNow) => {
    const { tabKey } = thisObj;
    let DATE = date;
    thisObj.selectedDate = date;
    if (toggleVal) {
        // 多选
        if (date) {
            const [start, end] = DateFormat(date);
            thisObj.selectedDateStart = start;
            thisObj.selectedDateEnd = end;
            thisObj.clickSelectedDateStart = start;
            thisObj.clickSelectedDateEnd = end;
            const [dateS] = DateTimeFormat(start),
                [dateE] = DateTimeFormat(end);
            const [ys, ms, ds] = dateS.split('.');
            let yas = ys,
                mas = ms,
                das = ds;
            const [ye, me, de] = dateE.split('.');
            if (tabKey === 'year') {
                if (ye - ys < 12) {
                    yas = String(ye - 12);
                }
            } else if (tabKey === 'month') {
                if (ys === ye) {
                    const [y, m, d] = CountPrevYear([ys, ms, ds]).split('.');
                    yas = y;
                    mas = m;
                    das = d;
                }
            } else {
                // tabKey === 'day' || tabKey === 'week'
                // 开始结束年月相同，计算上一月
                if (ys + ms === ye + me) {
                    const [y, m, d] = CountPrevMonth([ys, ms, ds]).split('.');
                    yas = y;
                    mas = m;
                    das = d;
                }
            }
            thisObj.yearSelectedStart = ys;
            thisObj.monthSelectedStart = ms;
            thisObj.daySelectedStart = ds;
            thisObj.yearActiveStart = yas;
            thisObj.monthActiveStart = mas;
            thisObj.dayActiveStart = das;
            thisObj.clickYearSelectedStart = ys;
            thisObj.clickMonthSelectedStart = ms;
            thisObj.clickDaySelectedStart = ds;
            thisObj.yearSelectedEnd = ye;
            thisObj.monthSelectedEnd = me;
            thisObj.daySelectedEnd = de;
            thisObj.yearActiveEnd = ye;
            thisObj.monthActiveEnd = me;
            thisObj.dayActiveEnd = de;
            thisObj.clickYearSelectedEnd = ye;
            thisObj.clickMonthSelectedEnd = me;
            thisObj.clickDaySelectedEnd = de;

            switch (tabKey) {
            case 'month':
                DATE = `${yas}.${mas}-${ye}.${me}`;
                break;
            case 'year':
                DATE = `${yas}-${ye}`;
                break;
            default:
                break;
            }
        } else {
            thisObj.selectedDateStart = '';
            thisObj.selectedDateEnd = '';
            thisObj.clickSelectedDateStart = '';
            thisObj.clickSelectedDateEnd = '';
            thisObj.yearSelectedStart = '';
            thisObj.monthSelectedStart = '';
            thisObj.daySelectedStart = '';
            thisObj.clickYearSelectedStart = '';
            thisObj.clickMonthSelectedStart = '';
            thisObj.clickDaySelectedStart = '';
            thisObj.yearSelectedEnd = '';
            thisObj.monthSelectedEnd = '';
            thisObj.daySelectedEnd = '';
            thisObj.clickYearSelectedEnd = '';
            thisObj.clickMonthSelectedEnd = '';
            thisObj.clickDaySelectedEnd = '';

            thisObj.yearActiveEnd = yearNow;
            thisObj.monthActiveEnd = monthNow;
            thisObj.dayActiveEnd = dayNow;

            const [y, m, d] = CountPrevMonth([yearNow, monthNow, dayNow]).split('.');
            thisObj.yearActiveStart = y;
            thisObj.monthActiveStart = m;
            thisObj.dayActiveStart = d;

            if (tabKey === 'month' || tabKey === 'year') {
                const [py, pm, pd] = CountPrevYear([yearNow, monthNow, dayNow]).split('.');
                thisObj.yearActiveStart = py;
                thisObj.monthActiveStart = pm;
                thisObj.dayActiveStart = pd;
            }

            const { yearActiveStart, monthActiveStart } = thisObj;
            switch (tabKey) {
            case 'month':
                DATE = `${yearActiveStart}.${monthActiveStart}-${yearNow}.${monthNow}`;
                break;
            case 'year':
                DATE = `${yearActiveStart}-${yearNow}`;
                break;
            default:
                break;
            }
        }
    } else {
        // 单选
        if (date) {
            thisObj.clickSelectedDateStart = date;
            if (date.includes(':')) {
                const [de] = date.split(/\s+/);
                DATE = de;
            }
        }
        let y, m, d;
        if (DATE) {
            const [y1, m1, d1] = DATE.split('.');
            y = y1;
            m = m1;
            d = d1;
            thisObj.yearSelectedStart = y;
            thisObj.monthSelectedStart = m;
            thisObj.daySelectedStart = d;
            thisObj.clickYearSelectedStart = y;
            thisObj.clickMonthSelectedStart = m;
            thisObj.clickDaySelectedStart = d;
        } else {
            y = yearNow;
            m = monthNow;
            d = dayNow;
            thisObj.clickSelectedDateStart = '';
            thisObj.yearSelectedStart = '';
            thisObj.monthSelectedStart = '';
            thisObj.daySelectedStart = '';
            thisObj.clickYearSelectedStart = '';
            thisObj.clickMonthSelectedStart = '';
            thisObj.clickDaySelectedStart = '';
        }
        thisObj.yearActiveStart = y;
        thisObj.monthActiveStart = m;
        thisObj.dayActiveStart = d;
        switch (tabKey) {
        case 'month':
            DATE = `${y}.${m}`;
            break;
        case 'year':
            DATE = y;
            break;
        default:
            break;
        }
    }

    return DATE;
};

export default SetDate;
