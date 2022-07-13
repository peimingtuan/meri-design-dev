import { SetYear } from '../../PickerDate/dateDrop/SetArray';
import { MonthInitStart, MonthInitEnd } from './MonthInit';
import DisableArrow from './DisableArrow';

/**
 * 点击日期
 * @param thisObj DateDrop的this
 * @param obj {year}
 * @param panel 目前点击的是哪个面板
 */
const YearPanelChange = (thisObj, { year }, panel) => {
    let clearOther = false;
    const {
        toggleVal,
        clickYearSelectedStart,
        clickYearSelectedEnd,
        yearsArrayStart, yearsArrayEnd,
        panelYearStart, panelYearEnd,
        monthActiveStart,
        monthActiveEnd
    } = thisObj;
    if (panel === 'start' && panelYearStart) {
        MonthInitStart(thisObj, `${year}.${monthActiveStart}`, (clickYearSelectedStart === clickYearSelectedEnd));
        DisableArrow(thisObj);
        thisObj.yearActiveStart = year;
        thisObj.panelYearStart = false;
        return;
    }
    if (panel === 'end' && panelYearEnd) {
        MonthInitEnd(thisObj, `${year}.${monthActiveEnd}`, (clickYearSelectedStart === clickYearSelectedEnd));
        setTimeout(() => {
            DisableArrow(thisObj);
        });
        thisObj.yearActiveEnd = year;
        thisObj.panelYearEnd = false;
        return;
    }
    if (toggleVal) {
        if (clickYearSelectedStart) {
            if (clickYearSelectedEnd) {
                thisObj.clickYearSelectedStart = year;
                // thisObj.clickMonthSelectedStart = '';
                // thisObj.clickDaySelectedStart = '';
                thisObj.clickSelectedDateStart = year;

                thisObj.clickYearSelectedEnd = '';
                thisObj.clickMonthSelectedEnd = '';
                thisObj.clickDaySelectedEnd = '';
                thisObj.clickSelectedDateEnd = '';

                thisObj.clickThTextSelectedEnd = '';
                clearOther = true;
            } else {
                if (year < clickYearSelectedStart) {
                    thisObj.clickYearSelectedEnd = clickYearSelectedStart;
                    thisObj.clickSelectedDateEnd = clickYearSelectedStart;
                    thisObj.clickYearSelectedStart = year;
                    thisObj.clickSelectedDateStart = year;
                } else {
                    thisObj.clickYearSelectedEnd = year;
                    thisObj.clickSelectedDateEnd = year;
                }
            }
        } else {
            thisObj.clickYearSelectedStart = year;
            thisObj.clickSelectedDateStart = year;
        }

        if (thisObj.clickYearSelectedStart && thisObj.clickYearSelectedEnd) thisObj.btnType = 'primary';
        else thisObj.btnType = 'disabled';
        if (panel === 'start') {
            thisObj.yearsArrayStart = SetYear(yearsArrayStart, { year }, clearOther, toggleVal);
            if (!thisObj.clickSelectedDateEnd) thisObj.yearsArrayEnd = SetYear(yearsArrayEnd, { year: '' }, true, toggleVal);
        } else {
            thisObj.yearsArrayEnd = SetYear(yearsArrayEnd, { year }, clearOther, toggleVal);
            if (!thisObj.clickSelectedDateEnd) thisObj.yearsArrayStart = SetYear(yearsArrayStart, { year: '' }, true, toggleVal);
        }
    } else {
        // 单选
        thisObj.clickYearSelectedStart = year;
        thisObj.clickSelectedDateStart = year;
        thisObj.yearsArrayStart = SetYear(yearsArrayStart, { year });
        thisObj.btnType = 'primary';
    }
};

export default YearPanelChange;
