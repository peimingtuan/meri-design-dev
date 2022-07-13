import { DayInitStart, DayInitEnd } from './DayInit';
import { WeekInitStart, WeekInitEnd } from './WeekInit';
import { MonthInitStart, MonthInitEnd } from './MonthInit';
import { YearInitStart, YearInitEnd } from './YearInit';
import { SetDay, SetMonth, SetWeek, SetYear } from './SetArray';
import CountNextMonth from '../../static/utils/datePicker/CountNextMonth';

/**
 * 开关切换
 * @param thisObj DateDrop的this
 * @param toggle
 * @constructor
 */
const ToggleHandle = (thisObj, toggle) => {
    const {
        tabKey, sort,
        yearActiveStart, monthActiveStart, dayActiveStart,
        clickYearSelectedStart: yearS, clickMonthSelectedStart: monthS, clickDaySelectedStart: dayS,
        clickThTextSelectedStart: thText,
        daysArrayStart,
        weeksArrayStart, monthsArrayStart, yearsArrayStart, yearsArrayEnd,
        yearActiveStartRight,
        yearActiveEndLeft, yearActiveEndRight
    } = thisObj;
    const dateAS = yearActiveStart + monthActiveStart;
    const dateYMS = yearS + monthS;
    if (toggle) {
        const strategy = {
            common() {
                const countDate = CountNextMonth([yearActiveStart, monthActiveStart, dayActiveStart]);
                const [y, m, d] = countDate.split('.');
                thisObj.yearActiveEnd = y;
                thisObj.monthActiveEnd = m;
                thisObj.dayActiveEnd = d;
                return countDate;
            },
            day() {
                const countDateE = this.common();
                // 计算结束面板
                DayInitEnd(thisObj, countDateE);
            },
            week() {
                const countDateE = this.common();
                // 计算结束面板
                WeekInitEnd(thisObj, countDateE, sort);
            },
            month() {
                const countYearE = String(Number(yearActiveStart) + 1);
                thisObj.yearActiveEnd = countYearE;
                MonthInitEnd(thisObj, countYearE);
            },
            year: () => YearInitEnd(thisObj, String(Number(yearActiveStartRight) + 12))
        };
        strategy[tabKey]();
        // thisObj.btnType = 'disabled';
    } else {
        // 切换到时间点时 清空结束时间面板的状态
        thisObj.clickYearSelectedEnd = '';
        thisObj.clickMonthSelectedEnd = '';
        thisObj.clickDaySelectedEnd = '';
        thisObj.clickSelectedDateEnd = '';
        thisObj.clickThTextSelectedEnd = '';
        if (tabKey === 'year') {
            // tabKey在年的情况下
            if (yearS) {
                const yearIndexS = yearsArrayStart.some(d => d.year === yearS);
                if (yearIndexS) {
                    // 开始面板查找到了click选择的年
                    thisObj.yearsArrayStart = SetYear(yearsArrayStart, { year: yearS });
                } else {
                    const yearIndexE = yearsArrayEnd.some(d => d.year === yearS);
                    if (yearIndexE) {
                        // 结束面板查找到了click选择的年
                        thisObj.yearsArrayStart = SetYear(yearsArrayEnd, { year: yearS });
                        thisObj.yearActiveStartLeft = yearActiveEndLeft;
                        thisObj.yearActiveStartRight = yearActiveEndRight;
                    } else {
                        YearInitStart(thisObj, `${yearS}`);
                    }
                }
                thisObj.btnType = 'primary';
            } else {
                thisObj.btnType = 'disabled';
            }
        } else {
            if (dateYMS) {
                if (dateYMS !== dateAS) {
                    // 选择的时间在结束面板
                    thisObj.yearActiveStart = `${yearS}`;
                    thisObj.monthActiveStart = `${monthS}`;
                    thisObj.dayActiveStart = `${dayS}`;
                    switch (tabKey) {
                    case 'day':
                        DayInitStart(thisObj, `${yearS}.${monthS}.${dayS}`);
                        break;
                    case 'week':
                        WeekInitStart(thisObj, `${yearS}.${monthS}.${dayS}`, sort);
                        break;
                    case 'month':
                        MonthInitStart(thisObj, `${yearS}.${monthS}`);
                        break;
                    default:
                        break;
                    }
                } else {
                    switch (tabKey) {
                    case 'day':
                        thisObj.daysArrayStart = SetDay(daysArrayStart, { year: yearS, month: monthS, day: dayS });
                        break;
                    case 'week':
                        thisObj.weeksArrayStart = SetWeek(weeksArrayStart, thText);
                        break;
                    case 'month':
                        thisObj.monthsArrayStart = SetMonth(monthsArrayStart, { year: yearS, month: monthS });
                        break;
                    default:
                        break;
                    }
                }
                thisObj.btnType = 'primary';
            } else {
                thisObj.btnType = 'disabled';
            }
        }
    }
};

export default ToggleHandle;
