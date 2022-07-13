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
                                >{{tabKey==='week'?clickThTextSelectedStart:clickSelectedDateStart}}</article>
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
                                <article class="p-date-trigger-select-date" v-if="clickSelectedDateEnd"
                                >{{tabKey==='week'?clickThTextSelectedEnd:clickSelectedDateEnd}}</article>
                                <article class="p-date-trigger-placeholder" v-else>{{placeholderEnd}}</article>
                            </section>
                        </div>
                    </div>
                    <TabDate v-model="tabKey" :data="pickerData" v-if="pickerData&&pickerData.length>1"/>
                </div>
                <div class="p-picker-main-item">
                    <!-- 开始时间-s -->
                    <div class="p-picker-child-select-box">
                        <div class="p-picker-child-select-box-title" v-show="tabKey !== 'time'">
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                        @click="prevYear('start')"
                                        v-if="!disableYearStartLeft"
                                >
                                    <ArrowRightDoubleSvg/>
                                </article>
                                <article
                                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                        @click="prevMonth('start')"
                                        v-if="(tabKey==='day'||tabKey==='week')&&!panelYearStart&&!panelMonthStart&&!disableMonthStartLeft"
                                >
                                    <ArrowRightSvg/>
                                </article>
                            </section>
                            <section class="p-picker-child-select-box-title-text">
                                <article class="p-picker-active-title" @click="yearActiveClick('start')">
                                    {{(tabKey==='year'||panelYearStart)?(`${yearActiveStartLeft}-${yearActiveStartRight}`):yearActiveStart}}年
                                </article>
                                <article
                                        v-show="(tabKey==='day'||tabKey==='week')&&!panelYearStart&&!panelMonthStart"
                                        class="p-picker-active-title" @click="monthActiveClick('start')"
                                >{{monthActiveStart}}月</article>
                            </section>
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg"
                                        @click="nextMonth('start')"
                                        v-if="(tabKey==='day'||tabKey==='week')&&!panelYearStart&&!panelMonthStart&&!disableMonthStartRight"
                                >
                                    <!--v-if="(tabKey==='day'||tabKey==='week')&&!panelYearStart&&!panelMonthStart&&!disableMonthStartRight&&!toggleVal"-->
                                    <ArrowRightSvg/>
                                </article>
                                <article
                                        class="p-picker-child-select-box-icon-svg"
                                        @click="nextYear('start')"
                                        v-if="!disableYearStartRight"
                                >
                                    <!--v-if="!disableYearStartRight&&!toggleVal"-->
                                    <ArrowRightDoubleSvg/>
                                </article>
                            </section>
                        </div>
                        <div
                                v-if="(tabKey==='day'||tabKey==='week')&&!panelYearStart&&!panelMonthStart"
                                class="p-picker-child-title"
                        >
                            <section
                                    class="p-picker-child-title-item"
                                    v-for="wt in weekText"
                                    :key="'wts-'+wt"
                            >{{wt}}
                            </section>
                        </div>

                        <template>
                            <Day
                                    key="dayStart"
                                    panel="start"
                                    v-if="tabKey==='day' && !panelYearStart && !panelMonthStart"
                                    :yearNow="yearNow"
                                    :monthNow="monthNow"
                                    :dayNow="dayNow"
                                    :multiple="true"
                                    :daysArray="daysArrayStart"
                                    @change="dayPanelChange"
                                    @enter="dayPanelEnter"
                            />
                            <Week
                                    key="weekStart"
                                    panel="start"
                                    v-else-if="tabKey==='week' && !panelYearStart && !panelMonthStart"
                                    :multiple="true"
                                    :weeksArray="weeksArrayStart"
                                    @change="weekPanelChange"
                                    @enter="weekPanelEnter"
                            />
                            <Month
                                    key="monthStart"
                                    panel="start"
                                    v-else-if="(tabKey==='month' || panelMonthStart) && !panelYearStart"
                                    :multiple="true"
                                    :monthsArray="monthsArrayStart"
                                    @change="monthPanelChange"
                                    @enter="monthPanelEnter"
                            />
                            <Year
                                    key="yearStart"
                                    panel="start"
                                    v-else-if="tabKey==='year' || panelYearStart"
                                    :multiple="true"
                                    :yearsArray="yearsArrayStart"
                                    @change="yearPanelChange"
                                    @enter="yearPanelEnter"
                            />
                            <Time
                                    key="timeStart"
                                    v-else
                                    ref="timeSelectStart"
                                    class="p-picker-main-item-time-date"
                                    :multiple="true"
                                    :time="timeStart"
                                    :format="format"
                                    :scopeTime="scopeTimeStart"
                                    :ymdLimit="ymdLimitStart"
                                    :ymdSelected="ymdSelectedStart"
                                    @changeTime="changeTime(['start', ...arguments])"
                            />
                        </template>
                    </div>
                    <!-- 开始时间-e -->

                    <!-- 结束时间-s -->
                    <div class="p-picker-child-select-box p-picker-child-select-box-border-left" v-if="toggleVal">
                        <div class="p-picker-child-select-box-title" v-show="tabKey !== 'time'">
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                        @click="prevYear('end')"
                                        v-if="!disableYearEndLeft"
                                >
                                    <!--v-if="!disableYearEndLeft&&!toggleVal"-->
                                    <ArrowRightDoubleSvg/>
                                </article>
                                <article
                                        class="p-picker-child-select-box-icon-svg p-picker-child-select-box-icon-svg-left"
                                        @click="prevMonth('end')"
                                        v-if="(tabKey==='day'||tabKey==='week')&&!panelYearEnd&&!panelMonthEnd&&!disableMonthEndLeft"
                                >
                                    <!--v-if="(tabKey==='day'||tabKey==='week')&&!panelYearEnd&&!panelMonthEnd&&!disableMonthEndLeft&&!toggleVal"-->
                                    <ArrowRightSvg/>
                                </article>
                            </section>
                            <section class="p-picker-child-select-box-title-text">
                                <article class="p-picker-active-title" @click="yearActiveClick('end')">
                                    {{(tabKey==='year'||panelYearEnd)?(`${yearActiveEndLeft}-${yearActiveEndRight}`):yearActiveEnd}}年
                                </article>
                                <article v-show="(tabKey==='day'||tabKey==='week')&&!panelYearEnd&&!panelMonthEnd"
                                         class="p-picker-active-title" @click="monthActiveClick('end')">{{monthActiveEnd}}月
                                </article>
                            </section>
                            <section class="p-picker-child-select-box-icon">
                                <article
                                        class="p-picker-child-select-box-icon-svg"
                                        @click="nextMonth('end')"
                                        v-if="(tabKey==='day'||tabKey==='week')&&!panelYearEnd&&!panelMonthEnd"
                                >
                                    <ArrowRightSvg/>
                                </article>
                                <article
                                        class="p-picker-child-select-box-icon-svg"
                                        @click="nextYear('end')"
                                >
                                    <ArrowRightDoubleSvg/>
                                </article>
                            </section>
                        </div>
                        <div class="p-picker-child-title"
                             v-if="(tabKey==='day'||tabKey==='week')&&!panelYearEnd&&!panelMonthEnd">
                            <section
                                    class="p-picker-child-title-item"
                                    v-for="wt in weekText"
                                    :key="'wte-'+wt"
                            >{{wt}}
                            </section>
                        </div>

                        <template>
                            <Day
                                    key="dayEnd"
                                    panel="end"
                                    v-if="tabKey==='day' && !panelYearEnd && !panelMonthEnd"
                                    :yearNow="yearNow"
                                    :monthNow="monthNow"
                                    :dayNow="dayNow"
                                    :multiple="true"
                                    :daysArray="daysArrayEnd"
                                    @change="dayPanelChange"
                                    @enter="dayPanelEnter"
                            />
                            <Week
                                    key="weekEnd"
                                    panel="end"
                                    v-else-if="tabKey==='week' && !panelYearEnd && !panelMonthEnd"
                                    :multiple="true"
                                    :weeksArray="weeksArrayEnd"
                                    @change="weekPanelChange"
                                    @enter="weekPanelEnter"
                            />
                            <Month
                                    key="monthEnd"
                                    panel="end"
                                    v-else-if="(tabKey==='month' || panelMonthEnd) && !panelYearEnd"
                                    :multiple="true"
                                    :monthsArray="monthsArrayEnd"
                                    @change="monthPanelChange"
                                    @enter="monthPanelEnter"
                            />
                            <Year
                                    key="yearEnd"
                                    panel="end"
                                    v-else-if="tabKey==='year' || panelYearEnd"
                                    :multiple="true"
                                    :yearsArray="yearsArrayEnd"
                                    @change="yearPanelChange"
                                    @enter="yearPanelEnter"
                            />
                            <Time
                                    key="timeEnd"
                                    v-else
                                    ref="timeSelectEnd"
                                    class="p-picker-main-item-time-date"
                                    :multiple="true"
                                    :time="timeEnd"
                                    :format="format"
                                    :scopeTime="scopeTimeEnd"
                                    :ymdLimit="ymdLimitEnd"
                                    :ymdSelected="ymdSelectedEnd"
                                    @changeTime="changeTime(['end', ...arguments])"
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
                    </template>
                    <article v-if="toggleVal&&lockCycle&&tabKey==='day'&&!scope"
                             :class="['p-date-picker-lock', (!clickDaySelectedStart||!clickDaySelectedEnd)&&'p-date-picker-lock-disabled']"
                             @click="lockHandle"
                    >
                        <i class="p-date-picker-lock-svg">
                            <Lock class="p-date-picker-lock-active" v-if="lock"/>
                            <UnLock v-else/>
                        </i>
                        <span class="p-date-picker-handle-text">{{lock?'解除锁定':'锁定周期'}}</span>
                    </article>
                    <article v-if="cautionTitle" class="p-date-picker-caution">
                        <span class="p-date-picker-caution-title">{{cautionTitle}}</span>
                        <Toggle v-model="cautionVal"/>
                    </article>
                </section>
                <section class="p-date-picker-handle-right">
                    <template v-if="format">
                        <span
                            v-if="tabKey==='day'"
                            :class="['p-picker-handle-time',
                                 (toggleVal?clickDaySelectedEnd:clickDaySelectedStart)?'p-picker-handle-time-normal':'p-picker-handle-time-disabled']"
                            @click="panelTimeOpen"
                        >选择时间</span>
                        <span v-if="tabKey==='time'"
                              class="p-picker-handle-time p-picker-handle-time-normal"
                              @click="panelTimeClose"
                        >选择日期</span>
                    </template>
                    <template>
                        <Button v-if="format&&tabKey==='time'" :type="btnTypeTime" size="small" @click="panelTimeClose" key="panelTimeClose">确定</Button>
                        <Button v-else :type="btnType" size="small" @click="pickerConfirm" key="pickerConfirm">确定</Button>
                    </template>
                </section>
            </div>
        </div>
    </transition>
</template>

<script>
// svg
import ArrowRightSvg from '../../static/iconSvg/arrow_right2.svg';
import ArrowRightDoubleSvg from '../../static/iconSvg/arrow_right_double.svg';
import UnLock from '../../static/iconSvg/action/unlock.svg';
import Lock from '../../static/iconSvg/action/lock.svg';

// components
import Button from '../../Button';
import Toggle from '../../Toggle';
import TabDate from '../depend/tabDate';
import Day from '../depend/day';
import Week from '../depend/week';
import Month from '../depend/month';
import Year from '../depend/year';
import Time from '../../PickerTime/depend/time';

// js
import CountNowDate from '../../static/utils/datePicker/CountNowDate';
import SetDate from './SetDate';
import { DayInit } from './DayInit';
import { DayPanelChange, DayPanelEnter } from './DayPanelHandle';
import { WeekInit } from './WeekInit';
import { WeekPanelChange, WeekPanelEnter } from './WeekPanelHandle';
import { MonthInit } from './MonthInit';
import { MonthPanelChange, MonthPanelEnter } from './MonthPanelHandle';
import { YearInit } from './YearInit';
import { YearPanelChange, YearPanelEnter } from './YearPanelHandle';
import ToggleHandle from './ToggleHandle';
import TabKeyHandle from './TabKeyHandle';
import YearArrowHandle from './YearArrowHandle';
import MonthArrowHandle from './MonthArrowHandle';
import DisableArrow from './DisableArrow';
import YearActiveHandle from './YearActiveHandle';
import MonthActiveHandle from './MonthActiveHandle';
import {
    SetQuickDay, SetQuickWeek, SetQuickMonth, SetQuickYear
} from './SetQuickHandle';
import FormatScope from './FormatScope';
import TimePanelChange from './TimePanelChange';

export default {
    name: 'DateDrop',
    components: {
        ArrowRightSvg,
        ArrowRightDoubleSvg,
        UnLock,
        Lock,
        Button,
        Toggle,
        TabDate,
        Day,
        Week,
        Month,
        Year,
        Time
    },
    props: {
        // 传入的日期
        date: {
            type: String,
            default: ''
        },
        // 展示哪个的面板，可选值[day,week,month,year]
        panel: {
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
        // 是否显示时分秒 可选值[hms, hm]
        format: {
            type: String,
            default: ''
        },
        // weeks-按照年or周排序 【year、month】
        sort: {
            type: String,
            default: 'year'
        },
        // 快速切换时间
        quickSwitch: {
            type: Boolean,
            default: false
        },
        // 快速切换时间 可选值 [day, week, month, year]
        picker: {
            type: [String, Array],
            default: () => ['day', 'week', 'month', 'year']
        },
        // 可选范围 - 2020.01.12-2029.12.01
        scope: {
            type: String,
            default: ''
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
        // 是否显示锁定时间周期
        lockCycle: {
            type: Boolean,
            default: false
        },
        // 提醒标题
        cautionTitle: {
            type: String,
            default: ''
        },
        // 提醒开关
        caution: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            parent: null,
            position: true, // 动画执行方向
            tabKey: 'day', // 日周月年切换显示
            btnType: 'disabled', // 按钮状态
            tabDateDisable: true, // 禁用tabDate切换
            pickerBoxStatus: false, // 显示选择时间框
            pickerBoxStatusBox: false, // 显示选择时间框
            blurStatus: false, // 是否可执行blur
            selectedDate: '', // 选中的时间
            selectedDateStart: '', // 选中的时间-s
            selectedDateEnd: '', // 选中的时间-e
            clickSelectedDateStart: '', // 选中的时间-弹窗
            clickSelectedDateEnd: '', // 选中的时间-弹窗

            timeStart: '', // 时分|时分秒
            timeEnd: '', // 时分|时分秒

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

            thTextSelectedStart: '', // 选择的第几周 String
            thTextSelectedEnd: '', // 选择的第几周 String
            clickThTextSelectedStart: '', // 当前点击选择的第几周 String
            clickThTextSelectedEnd: '', // 当前点击选择的第几周 String
            weeksSelectedStart: [], // 选择的周列表
            weeksSelectedEnd: [], // 选择的周列表

            daysArrayStart: [], // 日列表-开始
            daysArrayEnd: [], // 日列表-结束
            weeksArrayStart: [], // 周列表
            weeksArrayEnd: [], // 周列表
            monthsArrayStart: [], // 月列表
            monthsArrayEnd: [], // 月列表
            yearsArrayStart: [], // 年列表
            yearsArrayEnd: [], // 年列表

            // 禁用开始时间
            disableYearStartLeft: false, // 左箭头-年
            disableYearStartRight: false, // 右箭头-年
            disableMonthStartLeft: false, // 左箭头-月
            disableMonthStartRight: false, // 右箭头-月
            // 禁用结束时间
            disableYearEndLeft: false, // 左箭头-年
            disableMonthEndLeft: false, // 左箭头-月

            panelYearStart: false, // 显示年面板
            panelYearEnd: false, // 显示年面板
            panelMonthStart: false, // 显示月面板
            panelMonthEnd: false, // 显示月面板

            scopeYMD: '', // 限制的开始结束年月日
            scopeTimeStart: '',
            scopeTimeEnd: '',
            ymdSelectedStart: '', // 当前选中的年月日
            ymdSelectedEnd: '', // 当前选中的年月日
            ymdLimitStart: '', // 当前限制的年月日
            ymdLimitEnd: '', // 当前限制的年月日
            hourStart: '',
            minuteStart: '',
            secondStart: '',
            hourEnd: '',
            minuteEnd: '',
            secondEnd: '',
            btnTypeTime: 'disabled', // 时分秒按钮状态

            toggleVal: false, // 单选多选切换
            switchStatus: false, // 单选多选切换 - 用来计算位置
            toggleHistory: false, // 单选多选切换-记录上次的值
            lock: false, // 锁定周期
            cautionVal: false
        };
    },
    computed: {
        weekText() {
            return ['一', '二', '三', '四', '五', '六', '日'];
        },
        // 日周月年切换的tab数据
        pickerData() {
            const { picker } = this;
            if (typeof picker === 'string') return [picker];
            return picker;
        }
    },
    watch: {
        // 监听状态改变
        pickerBoxStatus(n, o) {
            if (n === o) return;
            if (n) this.pickerMainFocus();
            this.pickerBoxStatusBox = n;
        },
        /*
        date(n, o) {
            if (n === o || n === this.selectedDate) return;
            // 初始化日期
            this.initDate(n);
        },
        */
        tabKey(n, o) {
            if (n === o || n === 'time' || o === 'time') return;
            this.panelYearStart = false;
            this.panelMonthStart = false;
            this.panelYearEnd = false;
            this.panelMonthEnd = false;
            this.lock = false;

            this.paramsChange(n, this.date);
            this.$emit('tabKeyChange', n);
        },
        // 监听开关切换
        toggleVal(n, o) {
            // if (n === o || n === this.toggleHistory) return;
            if (n === o) return;
            ToggleHandle(this, n);
            DisableArrow(this);
            if (!n && this.lock) this.lock = false;
            this.switchStatus = n;
            this.$emit('resetPosition', n);
        },
        // 监听scope范围改变重新初始化日期面板
        scope(n, o) {
            if (n === o) return;
            FormatScope(this, n);// 初始化日期
            this.initDate(this.date);
        },
        caution: {
            handler(n) {
                this.cautionVal = n;
            },
            immediate: true
        },
        cautionVal(n, o) {
            if (n === o) return;
            this.$emit('cautionChange', n);
        }
    },
    created() {
        const { date, range } = this;
        this.toggleVal = range; // 设置初始化当前开关的值
        this.toggleHistory = range; // 设置初始化当前开关历史记录的值
        FormatScope(this, this.scope);
        // 初始化日期
        this.initDate(date);
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
            // 时间下拉列表选择面板失去焦点时执行此函数，点击确定之后不会执行此函数
            if (this.pickerBoxStatus && this.blurStatus) {
                this.pickerBoxStatus = false;
                setTimeout(() => {
                    this.parent.pickerBoxStatus = false;
                    this.panelYearStart = false;
                    this.panelYearEnd = false;
                    this.panelMonthStart = false;
                    this.panelMonthEnd = false;
                    // 如果时分秒面板是显示状态，在关闭日期选择盒子的时候重置
                    if (this.tabKey === 'time') this.tabKey = 'day';

                    const {
                        toggleHistory, tabKey,
                        selectedDate
                    } = this;
                    // 时间点时间段切换时当前的值和历史的值相同
                    this.toggleVal = toggleHistory;
                    this.btnType = 'disabled';
                    this.paramsChange(tabKey, selectedDate, true);
                }, 300);
            }
        },
        // 锁定周期
        lockHandle() {
            const { lock, clickDaySelectedStart, clickDaySelectedEnd } = this;
            // 如果开始或者结束日没有选择，就不能执行锁定
            if (!clickDaySelectedStart || !clickDaySelectedEnd) return;
            this.lock = !lock;
        },

        // 清除日期
        clearDate() {
            // this.yearActiveStartLeft = '';
            // this.yearActiveStartRight = '';
            // this.yearActiveEndLeft = '';
            // this.yearActiveEndRight = '';
            this.selectedDate = '';
            this.selectedDateStart = '';
            this.selectedDateEnd = '';
            this.clickSelectedDateStart = '';
            this.clickSelectedDateEnd = '';
            this.timeStart = '';
            this.timeEnd = '';
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
            this.thTextSelectedStart = '';
            this.thTextSelectedEnd = '';
            this.clickThTextSelectedStart = '';
            this.clickThTextSelectedEnd = '';
            this.weeksSelectedStart = [];
            this.weeksSelectedEnd = [];

            this.$emit('change', {
                selectedDate: '',
                selectedDateStart: '',
                selectedDateEnd: '',
                timeStart: '',
                timeEnd: '',
                thTextSelectedStart: '',
                thTextSelectedEnd: ''
            });
            this.btnType = 'disabled';
            this.resetDataArray(this.tabKey);
        },
        // 重置【日 周 月 年】面板数据选中状态
        resetDataArray(tabKey) {
            this.paramsChange(tabKey, '');
        },
        // 初始化日期
        initDate(date) {
            // 设置tabKey
            const { panel, picker } = this;
            let tabKey;
            if (panel) {
                tabKey = panel;
            } else {
                if (typeof picker === 'string') tabKey = picker;
                else tabKey = picker[0];
            }
            this.tabKey = tabKey;
            this.paramsChange(tabKey, date, true);
        },
        // 参数改变设置面板初始化 init-表示是否初次渲染
        paramsChange(tabKey, date, init) {
            if (tabKey === 'time') return;
            let DATE; // 重新计算面板的日期
            if (init) {
                const [yearNow, monthNow, dayNow] = CountNowDate(); // 获取当前时间、日期
                this.yearNow = yearNow;
                this.monthNow = monthNow;
                this.dayNow = dayNow;
                DATE = SetDate(this, date, this.toggleVal, yearNow, monthNow, dayNow);
            } else {
                DATE = TabKeyHandle(this, tabKey);
            }

            // 初始化日期面板
            this.initStrategy(tabKey, DATE);

            setTimeout(() => {
                DisableArrow(this);
            });
        },
        // 初始化日期面板
        initStrategy(type, date) {
            const { toggleVal } = this;
            const strategy = {
                day: () => DayInit(this, date, toggleVal), // 初始化日
                week: () => WeekInit(this, date, toggleVal), // 初始化周
                month: () => MonthInit(this, date, toggleVal), // 初始化月
                year: () => YearInit(this, date, toggleVal) // 初始化年
            };
            return strategy[type]();
        },
        /**
         * 改变按钮状态
         */
        changeBtnType(str) {
            if (str && str.replace(/[.:\- ]/g, '')) this.btnType = 'primary';
            else this.btnType = 'disabled';
        },
        /**
         * 点击日期-开始日期
         * @param obj {year, month, day}
         * @param panel 目前点击的是哪个面板
         */
        dayPanelChange(obj, panel) {
            DayPanelChange(this, obj, panel);
        },
        dayPanelEnter(obj, panel) {
            if (
                obj.disabled || !this.toggleVal
                || this.panelYearStart || this.panelMonthStart
                || this.panelYearEnd || this.panelMonthEnd
                || !this.clickDaySelectedStart || this.clickYearSelectedEnd
            ) return;
            DayPanelEnter(this, obj, panel);
        },
        // 周操作
        weekPanelChange(obj, panel) {
            WeekPanelChange(this, obj, panel);
        },
        weekPanelEnter(obj, panel) {
            if (
                obj.disabled || !this.toggleVal
                || this.panelYearStart || this.panelMonthStart
                || this.panelYearEnd || this.panelMonthEnd
                || !this.clickThTextSelectedStart || this.clickThTextSelectedEnd
            ) return;
            WeekPanelEnter(this, obj, panel);
        },
        // 月操作
        monthPanelChange(obj, panel) {
            MonthPanelChange(this, obj, panel);
        },
        monthPanelEnter(obj, panel) {
            if (
                obj.disabled || !this.toggleVal
                || this.panelYearStart || this.panelMonthStart
                || this.panelYearEnd || this.panelMonthEnd
                || !this.clickMonthSelectedStart || this.clickMonthSelectedEnd
            ) return;
            MonthPanelEnter(this, obj, panel);
        },
        // 年操作
        yearPanelChange(obj, panel) {
            YearPanelChange(this, obj, panel);
        },
        yearPanelEnter(obj, panel) {
            if (
                obj.disabled || !this.toggleVal
                || this.panelYearStart || this.panelMonthStart
                || this.panelYearEnd || this.panelMonthEnd
                || !this.clickYearSelectedStart || this.clickYearSelectedEnd
            ) return;
            YearPanelEnter(this, obj, panel);
        },
        // 设置按钮状态(时分秒确定按钮)
        setTimeBtnType() {
            const { format } = this;
            if (!format) return;
            const {
                toggleVal,
                hourStart, minuteStart, secondStart,
                hourEnd, minuteEnd, secondEnd
            } = this;

            let status = false;
            if (format === 'hms') {
                status = (toggleVal ? (hourStart + minuteStart + secondStart + hourEnd + minuteEnd + secondEnd) : (hourStart + minuteStart + secondStart));
            } else if (format === 'hm') {
                status = (toggleVal ? (hourStart + minuteStart + hourEnd + minuteEnd) : (hourStart + minuteStart));
            } else {
                status = (toggleVal ? (hourStart + hourEnd) : hourStart);
            }
            this.btnTypeTime = status ? 'primary' : 'disabled';
        },
        // 打开时分秒选择
        panelTimeOpen() {
            const {
                toggleVal,
                timeStart, timeEnd,
                clickDaySelectedStart, clickDaySelectedEnd
            } = this;
            if ((toggleVal && !clickDaySelectedEnd) || !clickDaySelectedStart) return;
            this.tabKey = 'time';
            this.setTimeBtnType();
            this.$nextTick(() => {
                this.$refs.timeSelectStart.setTimeDom(timeStart);
                if (toggleVal) this.$refs.timeSelectEnd.setTimeDom(timeEnd);
            });
        },
        // 关闭时分秒选择
        panelTimeClose() {
            this.tabKey = 'day';
        },
        /**
         * 时分秒操作
         * @param panel 可选值[start, end] 开始结束面板
         * @param grading 可选值[h, m, s] 时分秒
         * @param time 当前时/分/秒
         */
        changeTime([panel, grading, time]) {
            TimePanelChange(this, panel, grading, time);
        },
        // 点击年左右箭头 panel可选值[start, end]
        prevYear(panel) {
            YearArrowHandle(this, panel, '-');
        },
        nextYear(panel) {
            YearArrowHandle(this, panel, '+');
        },
        // 点击月左右箭头 panel可选值[start, end]
        prevMonth(panel) {
            MonthArrowHandle(this, panel, '-');
        },
        nextMonth(panel) {
            MonthArrowHandle(this, panel, '+');
        },
        // 点击active年月 panel可选值[start, end]
        yearActiveClick(panel) {
            YearActiveHandle(this, panel);
        },
        monthActiveClick(panel) {
            MonthActiveHandle(this, panel);
        },
        // 快速选择 panel可选值【left，right】
        quickSort(panel) {
            if (!this.selectedDate) return;
            const strategyQuick = {
                day: () => SetQuickDay(this, panel),
                week: () => SetQuickWeek(this, panel),
                month: () => SetQuickMonth(this, panel),
                year: () => SetQuickYear(this, panel)
            };
            strategyQuick[this.tabKey]();
        },
        // 多选情况设置确定时间
        setDoubleDateConfirm() {
            const {
                tabKey, format,
                clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart,
                clickYearSelectedEnd, clickMonthSelectedEnd, clickDaySelectedEnd,
                timeStart, timeEnd,
                weeksSelectedStart, weeksSelectedEnd,
                clickThTextSelectedStart, clickThTextSelectedEnd
            } = this;
            let dateStart,
                dateEnd;
            const ts = timeStart,
                te = timeEnd || timeStart,
                YearSelectedEnd = clickYearSelectedEnd || clickYearSelectedStart,
                MonthSelectedEnd = clickMonthSelectedEnd || clickMonthSelectedStart,
                DaySelectedEnd = clickDaySelectedEnd || clickDaySelectedStart;
            if (!clickYearSelectedEnd) {
                this.clickYearSelectedEnd = YearSelectedEnd;
                this.clickMonthSelectedEnd = MonthSelectedEnd;
                this.clickDaySelectedEnd = DaySelectedEnd;
                this.timeEnd = te;
            }
            switch (tabKey) {
            case 'day':
                (() => {
                    const y1 = clickYearSelectedStart,
                        m1 = clickMonthSelectedStart,
                        d1 = clickDaySelectedStart,
                        y2 = YearSelectedEnd,
                        m2 = MonthSelectedEnd,
                        d2 = DaySelectedEnd;
                    this.yearSelectedStart = y1;
                    this.monthSelectedStart = m1;
                    this.daySelectedStart = d1;
                    this.yearSelectedEnd = y2;
                    this.monthSelectedEnd = m2;
                    this.daySelectedEnd = d2;
                    dateStart = `${y1}.${m1}.${d1}${format && ts ? ` ${ts}` : ''}`;
                    dateEnd = `${y2}.${m2}.${d2}${format && te ? ` ${te}` : ''}`;
                })();
                break;
            case 'week':
                (() => {
                    const { year: y1, month: m1, day: d1 } = weeksSelectedStart[0],
                        { year: y2, month: m2, day: d2 } = weeksSelectedEnd[6];
                    this.yearSelectedStart = y1;
                    this.monthSelectedStart = m1;
                    this.daySelectedStart = d1;
                    this.yearSelectedEnd = y2;
                    this.monthSelectedEnd = m2;
                    this.daySelectedEnd = d2;
                    this.thTextSelectedStart = clickThTextSelectedStart;
                    this.thTextSelectedEnd = clickThTextSelectedEnd;
                    dateStart = `${y1}.${m1}.${d1}`;
                    dateEnd = `${y2}.${m2}.${d2}`;
                })();
                break;
            case 'month':
                (() => {
                    const y1 = clickYearSelectedStart,
                        m1 = clickMonthSelectedStart,
                        y2 = YearSelectedEnd,
                        m2 = MonthSelectedEnd;
                    this.yearSelectedStart = y1;
                    this.monthSelectedStart = m1;
                    this.yearSelectedEnd = y2;
                    this.monthSelectedEnd = m2;
                    dateStart = `${y1}.${m1}`;
                    dateEnd = `${y2}.${m2}`;
                    this.daySelectedStart = '';
                    this.daySelectedEnd = '';
                    this.clickDaySelectedStart = '';
                    this.clickDaySelectedEnd = '';
                    this.thTextSelectedStart = '';
                    this.thTextSelectedEnd = '';
                    this.clickThTextSelectedStart = '';
                    this.clickThTextSelectedEnd = '';
                })();
                break;
            case 'year':
                (() => {
                    const y1 = clickYearSelectedStart,
                        y2 = YearSelectedEnd;
                    this.yearSelectedStart = y1;
                    this.yearSelectedEnd = y2;
                    this.yearSelectedStart = y1;
                    this.yearSelectedEnd = y2;
                    dateStart = y1;
                    dateEnd = y2;
                    this.monthSelectedStart = '';
                    this.daySelectedStart = '';
                    this.monthSelectedEnd = '';
                    this.daySelectedEnd = '';
                    this.clickMonthSelectedStart = '';
                    this.clickDaySelectedStart = '';
                    this.clickMonthSelectedEnd = '';
                    this.clickDaySelectedEnd = '';
                    this.thTextSelectedStart = '';
                    this.thTextSelectedEnd = '';
                    this.clickThTextSelectedStart = '';
                    this.clickThTextSelectedEnd = '';
                })();
                break;
            default:
                break;
            }

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
                selectedDateEnd: dateEnd,
                timeStart: ts,
                timeEnd: te,
                thTextSelectedStart: this.thTextSelectedStart,
                thTextSelectedEnd: this.thTextSelectedEnd
            });
        },
        // 确定
        pickerConfirm() {
            const {
                toggleVal, tabKey, format,
                clickYearSelectedStart, clickMonthSelectedStart, clickDaySelectedStart,
                timeStart,
                weeksSelectedStart,
                clickThTextSelectedStart
            } = this;

            this.toggleHistory = toggleVal;
            this.$emit('toggleChange', toggleVal);
            // 改变tabKey
            this.$emit('tabKeyChange', tabKey);

            if (toggleVal) {
                this.setDoubleDateConfirm();
            } else {
                // 单选
                let selectedDate = '';
                const Y = clickYearSelectedStart,
                    M = clickMonthSelectedStart,
                    D = clickDaySelectedStart,
                    T = timeStart;
                this.yearSelectedStart = Y;
                this.monthSelectedStart = M;
                this.daySelectedStart = D;
                switch (tabKey) {
                case 'day': {
                    selectedDate = `${Y}.${M}.${D}${format && T ? ` ${T}` : ''}`;
                    break;
                }
                case 'week': {
                    const ws = weeksSelectedStart,
                        ws1 = ws[0],
                        // ws2 = ws[6];
                        ws2 = ws[ws.length-1];
                    selectedDate = `${ws1.year}.${ws1.month}.${ws1.day}-${ws2.year}.${ws2.month}.${ws2.day}`;
                    this.thTextSelectedStart = clickThTextSelectedStart;
                    break;
                }
                case 'month': {
                    this.clickDaySelectedStart = '';
                    this.daySelectedStart = '';
                    selectedDate = `${Y}.${M}`;
                    break;
                }
                case 'year': {
                    selectedDate = Y;
                    this.clickMonthSelectedStart = '';
                    this.monthSelectedStart = '';
                    this.clickDaySelectedStart = '';
                    this.daySelectedStart = '';
                    this.yearActiveStart = Y;
                    break;
                }
                default: break;
                }
                this.selectedDate = selectedDate;
                this.selectedDateStart = selectedDate;
                this.clickSelectedDateStart = selectedDate;
                this.blurStatus = false;
                /**
                 * 返回选择的时分秒
                 * @type Function
                 */
                this.$emit('change', { selectedDate, selectedDateStart: selectedDate, thTextSelectedStart: clickThTextSelectedStart });
            }
            this.btnType = 'disabled';
        }
    }
};
</script>

<style lang="stylus">
.p-date-picker-caution
    display inline-flex
    align-items center
    .p-date-picker-caution-title
        margin-right 4px
        font-size 14px
        color $grey-900
</style>
