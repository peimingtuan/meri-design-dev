<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div
                class="p-picker-main"
                ref="pickerMain"
                tabindex="-1"
                v-show="pickerBoxStatus"
                @mouseenter="pickerMainBlur"
                @mouseleave="pickerMainFocus"
                @blur="pickerBoxHide"
                @wheel.stop
        >
            <div class="p-picker-main-item-box">
                <div class="p-picker-main-item-input-box">
                    <div :class="[
                        'p-date-trigger', 'p-date-trigger-border',
                         toggleVal?'p-date-trigger-range-drop':`p-date-trigger-single-drop p-date-trigger-single-drop-${pickerData.length}`
                    ]">
                        <div :class="[
                        'p-date-trigger-content'
                    ]">
                            <section :class="[
                                'p-date-trigger-text',
                                toggleVal&&'p-date-trigger-text-range'
                            ]">
                                <article class="p-date-trigger-select-date" v-if="clickSelectedDateStart" @mouseenter="pickerEllipsis"
                                >{{clickSelectedDateStart}}</article>
                                <article class="p-date-trigger-placeholder" v-else>{{toggleVal?placeholderStart:placeholder}}</article>
                            </section>
                            <section class="p-date-trigger-connector" v-if="toggleVal">至</section>
                            <section
                                    v-if="toggleVal"
                                    :class="[
                                        'p-date-trigger-text',
                                        toggleVal&&'p-date-trigger-text-range'
                                    ]"
                            >
                                <article class="p-date-trigger-select-date" v-if="clickSelectedDateEnd">{{clickSelectedDateEnd}}</article>
                                <article class="p-date-trigger-placeholder" v-else>{{placeholderEnd}}</article>
                            </section>
                        </div>
                    </div>
                </div>
                <div class="p-picker-main-item">
                    <!-- 开始时间-s -->
                    <div class="p-picker-child-select-box">
                        <div class="p-picker-child-select-box-title">
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                        @click="prevYear('start')"
                                        v-if="!disableYearStartLeft"
                                >
                                    <ArrowRightDoubleSvg/>
                                </article>
                            </section>
                            <section class="p-picker-child-select-box-title-text">
                                <article class="p-picker-active-title" @click="yearActiveClick('start')">
                                    {{panelYearStart?(`${yearActiveStartLeft}-${yearActiveStartRight}`):yearActiveStart}}年
                                </article>
                            </section>
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg"
                                        @click="nextYear('start')"
                                        v-if="!disableYearStartRight"
                                >
                                    <ArrowRightDoubleSvg/>
                                </article>
                            </section>
                        </div>

                        <template>
                            <Month
                                    key="monthStart"
                                    panel="start"
                                    v-if="!panelYearStart"
                                    :multiple="true"
                                    :monthsArray="monthsArrayStart"
                                    @change="monthPanelChange"
                                    @enter="monthPanelEnter"
                            />
                            <Year
                                    key="yearStart"
                                    panel="start"
                                    v-else
                                    :multiple="true"
                                    :yearsArray="yearsArrayStart"
                                    @change="yearPanelChange"
                            />
                        </template>
                    </div>
                    <!-- 开始时间-e -->

                    <!-- 结束时间-s -->
                    <div class="p-picker-child-select-box p-picker-child-select-box-border-left" v-if="toggleVal">
                        <div class="p-picker-child-select-box-title">
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                        @click="prevYear('end')"
                                        v-if="!disableYearEndLeft"
                                >
                                    <ArrowRightDoubleSvg/>
                                </article>
                            </section>
                            <section class="p-picker-child-select-box-title-text">
                                <article class="p-picker-active-title" @click="yearActiveClick('end')">
                                    {{panelYearEnd?(`${yearActiveEndLeft}-${yearActiveEndRight}`):yearActiveEnd}}年
                                </article>
                            </section>
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg"
                                        @click="nextYear('end')"
                                >
                                    <ArrowRightDoubleSvg/>
                                </article>
                            </section>
                        </div>

                        <template>
                            <Month
                                    key="monthEnd"
                                    panel="end"
                                    v-if="!panelYearEnd"
                                    :multiple="true"
                                    :monthsArray="monthsArrayEnd"
                                    @change="monthPanelChange"
                                    @enter="monthPanelEnter"
                            />
                            <Year
                                    key="yearEnd"
                                    panel="end"
                                    v-else
                                    :multiple="true"
                                    :yearsArray="yearsArrayEnd"
                                    @change="yearPanelChange"
                            />
                        </template>
                    </div>
                    <!-- 结束时间-e -->
                </div>
            </div>

            <div :class="['p-date-picker-handle', toggle?'p-date-picker-handle-toggle':'p-date-picker-handle-no']">
                <section class="p-date-picker-handle-left">
                    <template v-if="toggle">
                        <Toggle v-model="toggleVal"/>
                        <span class="p-date-picker-handle-add-segment p-date-picker-handle-text">添加时间段</span>
                        <section class="p-date-picker-handle-note" v-if="toggleVal">
                            <NoteSvg class="p-date-picker-handle-note-svg"/>
                            <article class="p-date-picker-handle-note-text">选择起始时间点，系统将自动选取时间点往后的12个月的周期</article>
                        </section>
                    </template>
                </section>
                <section class="p-date-picker-handle-right">
                    <Button :type="btnType" size="small" @click="pickerConfirm" key="pickerConfirm">确定</Button>
                </section>
            </div>
        </div>
    </transition>
</template>

<script>
// svg
import ArrowRightDoubleSvg from '../../static/iconSvg/arrow_right_double.svg';
import NoteSvg from '../../static/iconSvg/action/note.svg';

// components
import Button from '../../Button';
import Toggle from '../../Toggle';
import Month from '../../PickerDate/depend/month';
import Year from '../../PickerDate/depend/year';

// js
import CountNowDate from '../../static/utils/datePicker/CountNowDate';
import SetDate from './SetDate';
import { MonthInit } from './MonthInit';
import { MonthPanelChange, MonthPanelEnter } from './MonthPanelHandle';
import YearPanelChange from './YearPanelHandle';
import { YearInit } from '../../PickerDate/dateDrop/YearInit';
import ToggleHandle from './ToggleHandle';
import TabKeyHandle from '../../PickerDate/dateDrop/TabKeyHandle';
import YearArrowHandle from './YearArrowHandle';
import DisableArrow from '../../PickerDate/dateDrop/DisableArrow';
import YearActiveHandle from './YearActiveHandle';
import SetQuickMonth from './SetQuickMonth';

export default {
    name: 'DateDrop',
    components: {
        ArrowRightDoubleSvg,
        NoteSvg,
        Button,
        Toggle,
        Month,
        Year
    },
    props: {
        /**
         * 传入的日期
         */
        date: {
            type: String,
            default: ''
        },
        /**
         * 时间段
         * @value 【false-时间点（默认值），true-时间段】
         */
        range: {
            type: Boolean,
            default: false
        },
        // 快速切换时间
        quickSwitch: {
            type: Boolean,
            default: false
        },
        // 快速切换时间 可选值 [day, week, month, year]
        picker: {
            type: [String, Array],
            default: () => ['month']
        },
        // 占位符
        placeholder: {
            type: String,
            default: ''
        },
        placeholderStart: {
            type: String,
            default: ''
        },
        placeholderEnd: {
            type: String,
            default: ''
        },
        // 开启单选多选切换
        toggle: {
            type: Boolean,
            default: false
        },
        // 锁定周期
        lockCycle: {
            type: Boolean,
            default: false
        },
        // 选择月份的最大长度
        maxLen: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            position: true, // 动画执行方向
            tabKey: 'day', // 日周月年切换显示
            btnType: 'disabled', // 按钮状态
            pickerBoxStatus: false, // 显示选择时间框
            blurStatus: false, // 是否可执行blur
            selectedDate: '', // 选中的时间
            selectedDateStart: '', // 选中的时间-s
            selectedDateEnd: '', // 选中的时间-e
            clickSelectedDateStart: '', // 选中的时间-弹窗
            clickSelectedDateEnd: '', // 选中的时间-弹窗

            // 当前年月日
            yearNow: '',
            monthNow: '',
            dayNow: '',

            // 活动的年月日
            yearActiveStart: '',
            monthActiveStart: '',
            dayActiveStart: '',
            yearActiveEnd: '',
            monthActiveEnd: '',
            dayActiveEnd: '',

            // 年面板-活动的年段
            yearActiveStartLeft: '',
            yearActiveStartRight: '',
            yearActiveEndLeft: '',
            yearActiveEndRight: '',

            // 选择的年月日-s
            yearSelectedStart: '',
            monthSelectedStart: '',
            daySelectedStart: '',
            // 点击-选择的年月日-s
            clickYearSelectedStart: '',
            clickMonthSelectedStart: '',
            clickDaySelectedStart: '',

            // 选择的年月日-e
            yearSelectedEnd: '',
            monthSelectedEnd: '',
            daySelectedEnd: '',
            // 点击-选择的年月日-e
            clickYearSelectedEnd: '',
            clickMonthSelectedEnd: '',
            clickDaySelectedEnd: '',

            monthsArrayStart: [], // 月列表
            monthsArrayEnd: [], // 月列表
            yearsArrayStart: [], // 年列表
            yearsArrayEnd: [], // 年列表

            // 禁用开始时间
            disableYearStartLeft: false, // 左箭头-年
            disableYearStartRight: false, // 右箭头-年
            // 禁用结束时间
            disableYearEndLeft: false, // 左箭头-年

            panelYearStart: false, // 显示年面板
            panelYearEnd: false, // 显示年面板

            toggleVal: false, // 单选多选切换
            switchStatus: false, // 单选多选切换 - 用来计算位置
            toggleHistory: false // 单选多选切换-记录上次的值
        };
    },
    computed: {
        // 日周月年切换的tab数据
        pickerData() {
            const { picker } = this;
            if (typeof picker === 'string') return [picker];
            return picker;
        }
    },
    watch: {
        // 监听状态改变
        pickerBoxStatus(n) {
            if (n) this.pickerMainFocus();
        },
        /*
        */
        date(n, o) {
            if (n === o || n === this.selectedDate) return;
            // 初始化日期
            this.initDate(n);
        },
        tabKey(n, o) {
            if (n === o) return;
            this.panelYearStart = false;
            this.panelYearEnd = false;

            // this.paramsChange(this.date);
        },
        // 监听开关切换
        toggleVal(n, o) {
            // if (n === o || n === this.toggleHistory) return;
            if (n === o) return;
            ToggleHandle(this, n);
            this.switchStatus = n;
            this.$emit('resetPosition', n);
        }
    },
    created() {
        this.toggleVal = this.range; // 设置初始化当前开关的值
        this.toggleHistory = this.range; // 设置初始化当前开关历史记录的值
        // 初始化日期
        this.initDate(this.date);
    },
    methods: {
        // 文字超出显示省略号
        pickerEllipsis(e) {
            const { target } = e;
            const { clientWidth, scrollWidth } = target;
            if (scrollWidth > clientWidth) target.title = target.innerText;
        },
        pickerMainBlur() {
            this.$nextTick(() => {
                this.blurStatus = false;
                this.$refs.pickerMain.blur();
            });
        },
        pickerMainFocus() {
            this.$nextTick(() => {
                this.blurStatus = true;
                if (this.$refs.pickerMain) this.$refs.pickerMain.focus();
            });
        },
        /**
         * 打开时间选择盒子
         */
        pickerBoxShow() {
            this.pickerBoxStatus = true;
        },
        /**
         * 关闭时间选择盒子
         */
        pickerBoxHide() {
            if (this.pickerBoxStatus && this.blurStatus) {
                this.pickerBoxStatus = false;
                setTimeout(() => {
                    this.parent.pickerBoxStatus = false;
                    this.panelYearStart = false;
                    this.panelYearEnd = false;

                    const {
                        toggleHistory,
                        selectedDate
                    } = this;
                    this.btnType = 'disabled';
                    // 时间点时间段切换时当前的值和历史的值相同
                    this.toggleVal = toggleHistory;
                    this.paramsChange(selectedDate, true);
                }, 300);
            }
        },

        // 清除日期
        clearDate() {
            this.selectedDate = '';
            this.selectedDateStart = '';
            this.selectedDateEnd = '';
            this.clickSelectedDateStart = '';
            this.clickSelectedDateEnd = '';
            this.yearSelectedStart = '';
            this.monthSelectedStart = '';
            this.daySelectedStart = '';
            this.clickYearSelectedStart = '';
            this.clickMonthSelectedStart = '';
            this.clickDaySelectedStart = '';
            this.yearSelectedEnd = '';
            this.monthSelectedEnd = '';
            this.daySelectedEnd = '';
            this.clickYearSelectedEnd = '';
            this.clickMonthSelectedEnd = '';
            this.clickDaySelectedEnd = '';

            this.$emit('change', {
                selectedDate: '',
                selectedDateStart: '',
                selectedDateEnd: ''
            });
            this.btnType = 'disabled';
            // 初始化日期
            this.initDate('');
        },
        // 初始化日期
        initDate(date) {
            this.paramsChange(date, true);
        },
        // 参数改变设置面板初始化 init-表示是否初次渲染
        paramsChange(date, init) {
            let DATE; // 重新计算面板的日期
            if (init) {
                const [yearNow, monthNow, dayNow] = CountNowDate(); // 获取当前时间、日期
                this.yearNow = yearNow;
                this.monthNow = monthNow;
                this.dayNow = dayNow;
                DATE = SetDate(this, date, this.toggleVal, yearNow, monthNow, dayNow);
            } else {
                DATE = TabKeyHandle(this, 'month');
            }
            this.monthInit(DATE);

            setTimeout(() => {
                DisableArrow(this);
            });
        },
        /**
         * 改变按钮状态
         */
        changeBtnType(str) {
            if (str && str.replace(/[.\- ]/g, '')) this.btnType = 'primary';
            else this.btnType = 'disabled';
        },
        // 初始化月
        monthInit(date) {
            MonthInit(this, date, this.toggleVal);
        },
        // 初始化年
        yearInit(date) {
            YearInit(this, date, this.toggleVal);
        },
        /**
         * 点击日期-开始日期
         * @param obj {year, month, day}
         * @param panel 目前点击的是哪个面板
         */
        // 月操作
        monthPanelChange(obj, panel) {
            if (obj.grey || obj.disabled) return;
            MonthPanelChange(this, obj, panel);
        },
        monthPanelEnter(obj, panel) {
            if (obj.disabled || !this.toggleVal || this.panelYearStart
                || this.panelYearEnd || !this.clickMonthSelectedStart
                || this.clickMonthSelectedEnd) return;
            MonthPanelEnter(this, obj, panel);
        },
        // 年操作
        yearPanelChange(obj, panel) {
            YearPanelChange(this, obj, panel);
        },
        // 点击年左右箭头 panel可选值[start, end]
        prevYear(panel) {
            YearArrowHandle(this, panel, '-');
        },
        nextYear(panel) {
            YearArrowHandle(this, panel, '+');
        },
        // 点击active年月 panel可选值[start, end]
        yearActiveClick(panel) {
            YearActiveHandle(this, panel);
        },
        // 快速选择 panel可选值【left，right】
        quickSort(panel) {
            if (!this.selectedDate) return;
            SetQuickMonth(this, panel);
        },
        // 多选情况设置确定时间
        setDoubleDateConfirm() {
            const {
                clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart,
                clickYearSelectedEnd, clickMonthSelectedEnd, clickDaySelectedEnd
            } = this;
            const YearSelectedEnd = clickYearSelectedEnd || clickYearSelectedStart,
                MonthSelectedEnd = clickMonthSelectedEnd || clickMonthSelectedStart,
                DaySelectedEnd = clickDaySelectedEnd || clickDaySelectedStart;
            if (!clickYearSelectedEnd) {
                this.clickYearSelectedEnd = YearSelectedEnd;
                this.clickMonthSelectedEnd = MonthSelectedEnd;
                this.clickDaySelectedEnd = DaySelectedEnd;
            }
            const y1 = clickYearSelectedStart,
                m1 = clickMonthSelectedStart,
                y2 = YearSelectedEnd,
                m2 = MonthSelectedEnd;
            this.yearSelectedStart = y1;
            this.monthSelectedStart = m1;
            this.yearSelectedEnd = y2;
            this.monthSelectedEnd = m2;
            const dateStart = `${y1}.${m1}`;
            const dateEnd = `${y2}.${m2}`;
            this.daySelectedStart = '';
            this.daySelectedEnd = '';
            this.clickDaySelectedStart = '';
            this.clickDaySelectedEnd = '';
            this.thTextSelectedStart = '';
            this.thTextSelectedEnd = '';
            this.clickThTextSelectedStart = '';
            this.clickThTextSelectedEnd = '';

            this.selectedDateStart = dateStart;
            this.selectedDateEnd = dateEnd;
            this.clickSelectedDateStart = dateStart;
            this.clickSelectedDateEnd = dateEnd;

            const selectedDate = `${dateStart}-${dateEnd}`;
            this.selectedDate = selectedDate;
            this.blurStatus = false;
            /**
             * 返回选择的时分秒
             * @type Function
             */
            this.$emit('change', {
                selectedDate,
                selectedDateStart: dateStart,
                selectedDateEnd: dateEnd
            });
        },
        // 确定
        pickerConfirm() {
            const {
                toggleVal,
                clickYearSelectedStart, clickMonthSelectedStart
            } = this;

            this.toggleHistory = toggleVal;
            this.$emit('toggleChange', toggleVal);
            if (toggleVal) {
                this.setDoubleDateConfirm();
            } else {
                // 单选
                let selectedDate = '';
                const Y = clickYearSelectedStart,
                    M = clickMonthSelectedStart;
                this.yearSelectedStart = Y;
                this.monthSelectedStart = M;
                this.clickDaySelectedStart = '';
                this.daySelectedStart = '';
                selectedDate = `${Y}.${M}`;
                this.selectedDate = selectedDate;
                this.selectedDateStart = selectedDate;
                this.blurStatus = false;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', { selectedDate });
            }
            this.btnType = 'disabled';
        }
    }
};
</script>
