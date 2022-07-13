<template>
    <div class="p-date-picker" ref="pDatePicker">
        <div :class="[
                'p-date-trigger',
                triggerBorder ? 'p-date-trigger-border' : 'p-date-trigger-border-none',
                (!triggerBorder && pickerBoxStatus) && 'p-date-trigger-border-show',
                toggleVal?'p-date-trigger-range':'p-date-trigger-single',
                (triggerBorder && pickerBoxStatus) && 'p-date-trigger-open',
                disabled && 'p-date-trigger-disabled',
                errorShow && 'p-trigger-error'
             ]"
             :style="width&&{width: `${width}px`}"
             @mouseenter="pickerClearShow"
             @mouseleave="pickerClearHide"
            >
            <template>
                <i v-if="quickSwitch"
                   :class="['p-date-trigger-triangle', disableQuickSortLeft&&'p-date-trigger-triangle-disabled']"
                   @click="quickSort('left')"
                >
                    <TrianglePickerLeft/>
                </i>
                <i v-else class="p-date-trigger-icon" @click="pickerBoxShow">
                    <CalendarSvg v-if="triggerBorder" class="p-date-trigger-calendar"/>
                </i>
            </template>
            <div class="p-date-picker-caption" v-if="caption&&!quickSwitch" ref="captionDom" @click="pickerBoxShow">{{caption}}</div>
            <div
                    :class="[
                        'p-date-trigger-content',
                         quickSwitch?'p-date-trigger-content-quick-switch':'p-date-trigger-content-calendar'
                    ]"
                    :style="captionWidth&&{width: `calc(100% - ${captionWidth}px)`}"
                    @click="pickerBoxShow"
            >
                <section :class="[
                            'p-date-trigger-text',
                            toggleVal && 'p-date-trigger-text-range',
                            (!toggleVal&&!quickSwitch&&caption) && 'p-date-trigger-text-padding-4'
                        ]"
                    >
                    <article class="p-date-trigger-select-date"
                             v-if="selectedDateStart"
                             @mouseenter="pickerEllipsis"
                    >{{(tabKey==='week'&&thTextSelectedStart)?thTextSelectedStart:selectedDateStart}}</article>
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
                    <article class="p-date-trigger-select-date"
                             v-if="selectedDateEnd"
                             @mouseenter="pickerEllipsis"
                    >{{(tabKey==='week'&&thTextSelectedEnd)?thTextSelectedEnd:selectedDateEnd}}</article>
                    <article class="p-date-trigger-placeholder" v-else>{{placeholderEnd}}</article>
                </section>
            </div>
            <template>
                <i v-if="quickSwitch"
                   :class="['p-date-trigger-triangle', disableQuickSortRight&&'p-date-trigger-triangle-disabled']"
                   @click="quickSort('right')"
                >
                    <TrianglePickerRight/>
                </i>
                <i v-else class="p-date-trigger-icon" @click.stop="dateRightHandle">
                    <ClearSvg v-if="clearStatus" class="p-date-trigger-clear" />
                </i>
            </template>
            <span class="p-trigger-error-text"
                  v-if="errorShow"
            >{{errorText}}</span>
        </div>
    </div>
</template>

<script>
// svg
import ClearSvg from '../static/iconSvg/clear2.svg';
import CalendarSvg from '../static/iconSvg/calendar.svg';
import TrianglePickerLeft from '../static/iconSvg/triangle_picker_left.svg';
import TrianglePickerRight from '../static/iconSvg/triangle_picker_right.svg';

// js
import DiffTimestamp from '../static/utils/datePicker/DiffTimestamp';
import CountBeforeOrAfterDay from '../static/utils/datePicker/CountBeforeOrAfterDay';
import DateDrop from './dateDrop';
import CountWeek from '../static/utils/datePicker/CountWeek';
import SetDateByTabKey from './dateDrop/SetDateByTabKey';

export default {
    name: 'PickerDate',
    components: {
        ClearSvg,
        CalendarSvg,
        TrianglePickerLeft,
        TrianglePickerRight
    },
    props: {
        /**
         * 传入的日期
         */
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
        width: {
            type: [String, Number],
            default: ''
        },
        // 标题
        caption: {
            type: String,
            default: ''
        },
        // 是否显示清楚按钮
        hideClear: {
            type: Boolean,
            default: false
        },
        // 占位符
        placeholder: {
            type: String,
            default: '选择日期'
        },
        placeholderStart: {
            type: String,
            default: '开始日期'
        },
        placeholderEnd: {
            type: String,
            default: '结束日期'
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
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // 出现滚动条的id
        transfer: {
            type: String,
            default: ''
        },
        // 错误信息提示
        errorText: {
            type: String,
            default: ''
        },
        // 错误信息显示状态
        errorShow: {
            type: Boolean,
            default: false
        },
        // 触发器边框显示
        triggerBorder: {
            type: Boolean,
            default: true
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
        },
        thTextWeek:{
            type: String,
            default: ''
        }
    },
    data() {
        return {
            pickerBoxStatus: false, // 显示时间选择下拉框
            clearStatus: false, // 清除按钮

            selectedDate: '', // 选中的时间
            selectedDateStart: '', // 选中的时间
            selectedDateEnd: '', // 选中的时间

            thTextSelectedStart: '', // 选择的第几周 String
            thTextSelectedEnd: '', // 选择的第几周 String

            disableQuickSortLeft: true, // 禁用左箭头
            disableQuickSortRight: true, // 禁用右箭头

            tabKey: 'day',
            toggleVal: false, // 开关-是否是多选
            switchStatus: false, // 开关 - 用来计算位置的变量
            captionWidth: 0 // 标题占用宽度
        };
    },
    watch: {
        date(n, o) {
            if (n === o || n === this.selectedDate) return;
            this.setDate(n);
            if (this.dateDrop) {
                this.dateDrop.date = n;
                this.dateDrop.initDate(n);
            }
        },
        panel: {
            handler(n, o) {
                if (n === o) return;
                const { picker } = this;
                let tabKey;
                if (n) {
                    tabKey = n;
                } else {
                    if (typeof picker === 'string') tabKey = picker;
                    else tabKey = picker[0];
                }
                this.tabKey = tabKey;
                if (this.dateDrop) {
                    this.dateDrop.tabKey = tabKey;
                    this.dateDrop.panel = tabKey;
                }
                // if (tabKey === 'week') this.setDate(this.date);
                this.setDate(this.date);
            },
            immediate: true
        },
        scope(n, o) {
            if (n === o) return;
            if (this.dateDrop) this.dateDrop.scope = n;
        },
        picker(n, o) {
            const now = JSON.stringify(n),
                old = JSON.stringify(o);
            if (now === old) return;
            this.setDate(this.date);
            if (this.dateDrop) this.dateDrop.picker = n;
        },
        // 监听标题值改变
        caption: {
            handler(n, o) {
                if (n === o) return;
                if (n) this.$nextTick(() => this.getCaptionWidth());
                else this.captionWidth = 0;
            },
            immediate: true
        },
        pickerBoxStatus(n) {
            this.$emit('focusChange', !n);
        },
        caution(n) {
            if (this.dateDrop) this.dateDrop.caution = n;
        }
    },
    created() {
        this.toggleVal = this.range; // 设置开关的值
        this.switchStatus = this.range; // 设置开关的值
        if(this.sort==='week')this.thTextSelectedStart=this.thTextWeek
    },
    methods: {
        // 文字超出显示省略号
        pickerEllipsis(e) {
            const { target } = e;
            const { clientWidth, scrollWidth } = target;
            if (scrollWidth > clientWidth) target.title = target.innerText;
        },
        // 获取标题宽度
        getCaptionWidth() {
            if (!this.caption) return;
            let captionWidth = 0;
            setTimeout(() => {
                const { captionDom } = this.$refs;
                if (!captionDom) return;
                const { scrollWidth } = captionDom;
                if (scrollWidth < 114) captionWidth = scrollWidth;
                else captionWidth = 114;
                // 80 = 左右两边的图标宽度
                this.captionWidth = captionWidth + 80;
            });
        },
        // 显示清除按钮
        pickerClearShow() {
            const { selectedDate, hideClear, disabled } = this;
            if (!selectedDate || hideClear || disabled) return;
            this.clearStatus = true;
        },
        // 隐藏清除按钮
        pickerClearHide() {
            this.clearStatus = false;
        },
        dateRightHandle() {
            const { disabled, hideClear, clearStatus } = this;
            if (disabled) return;
            if (!hideClear && clearStatus) this.clearDate();
            else this.pickerBoxShow();
        },
        // 清除时间
        clearDate() {
            if (!this.clearStatus) return;
            this.selectedDate = '';
            this.selectedDateStart = '';
            this.selectedDateEnd = '';
            this.thTextSelectedStart = '';
            this.thTextSelectedEnd = '';

            if (this.dateDrop) {
                this.dateDrop.clearDate();
            } else {
                this.$emit('change', '');
            }
            this.pickerClearHide();
        },
        // created设置数据
        setDate(date) {
            // if (!date) return;
            const { range, quickSwitch, tabKey } = this;
            if (quickSwitch) this.setDisableQuickSort(date);
            // 设置日期
            this.selectedDate = date;
            if (range) {
                const [s, e] = date.split('-');
                this.selectedDateStart = SetDateByTabKey(s, tabKey);
                this.selectedDateEnd = SetDateByTabKey(e, tabKey);
            } else {
                // this.selectedDateStart = date;
                this.selectedDateStart = SetDateByTabKey(date, tabKey);
            }

            if (tabKey === 'week') {
                const { selectedDateStart, selectedDateEnd, sort } = this;
                if (range) {
                    this.setWeekText(selectedDateStart, sort, 'thTextSelectedStart');
                    this.setWeekText(selectedDateEnd, sort, 'thTextSelectedEnd');
                } else {
                    this.setWeekText(selectedDateStart, sort, 'thTextSelectedStart');
                }
            }
        },
        setWeekText(date, sort, thTextSelected) {
            const countWeek = new CountWeek({ date, sort }),
                weeksArray = countWeek.getWeeksArray();
            const [Y, M, D] = date.split('.');
            const obj = weeksArray.find(d => d.weeks.some(d2 => d2.year === Y && d2.month === M && d2.day === D));
            if (obj && obj.hasOwnProperty('weeks')) this[thTextSelected] = obj.thText;
        },

        // 监听滚轮事件
        wheelListener() {
            const { dateDrop, pickerBoxStatus } = this;
            if (!dateDrop || !pickerBoxStatus) return;
            if (this.wheelTimer) clearTimeout(this.wheelTimer);
            this.wheelTimer = setTimeout(() => {
                DateDrop.resetPosition(this.dateDrop);
            }, 360);
        },
        // 初始化日期选择box
        initPicker() {
            const {
                date, panel, range, format, sort,
                quickSwitch, picker, scope, placeholder,
                placeholderStart, placeholderEnd, tabKey,
                toggle, toggleVal, switchStatus, lockCycle,
                transfer, cautionTitle, caution
            } = this;
            this.dateDrop = DateDrop({
                tag: this.$refs.pDatePicker,
                propsData: {
                    date,
                    panel,
                    range,
                    format,
                    sort,
                    quickSwitch,
                    picker,
                    scope,
                    placeholder,
                    placeholderStart,
                    placeholderEnd,
                    toggle,
                    lockCycle,
                    cautionTitle,
                    caution
                },
                data: {
                    parent: this,
                    tabKey,
                    toggleVal,
                    switchStatus
                }
            }).$on('change', obj => {
                const { toggleVal, tabKey } = this;
                if (toggleVal) {
                    const {
                        selectedDate, selectedDateStart, selectedDateEnd,
                        thTextSelectedStart, thTextSelectedEnd
                    } = obj;
                    this.selectedDate = selectedDate;
                    this.selectedDateStart = selectedDateStart;
                    this.selectedDateEnd = selectedDateEnd;

                    this.thTextSelectedStart = thTextSelectedStart;
                    this.thTextSelectedEnd = thTextSelectedEnd;
                } else {
                    const { selectedDate, thTextSelectedStart } = obj;
                    this.selectedDate = selectedDate;
                    this.selectedDateStart = selectedDate;
                    this.thTextSelectedStart = thTextSelectedStart;

                    this.selectedDateEnd = '';
                    this.thTextSelectedEnd = '';
                }

                if (this.quickSwitch) this.setDisableQuickSort(obj.selectedDate);
                this.$emit(
                    'change', obj.selectedDate, tabKey,
                    (tabKey === 'week' && (toggleVal ? `${this.thTextSelectedStart}-${this.thTextSelectedEnd}` : this.thTextSelectedStart))
                );
                this.setPickerBoxStatus(false);
            }).$on('tabKeyChange', tabKey => {
                this.tabKey = tabKey;
            }).$on('toggleChange', toggle => {
                this.toggleVal = toggle;
            })
                .$on('resetPosition', status => {
                    this.switchStatus = status;
                    DateDrop.resetPosition(this.dateDrop);
                })
                .$on('cautionChange', caution => {
                    this.$emit('cautionChange', caution);
                });
            // 监听滚轮
            window.addEventListener('mousewheel', this.wheelListener, false);
            // 监听滚动条
            window.addEventListener('scroll', this.wheelListener, false);
            window.addEventListener('touchmove', this.wheelListener, false);
            let transferDom = null;
            if (transfer && document) {
                transferDom = document.getElementById(transfer);
                if (transferDom) transferDom.addEventListener('scroll', this.wheelListener, false);
            }
            this.$once('hook:beforeDestroy', () => {
                DateDrop.remove(this.dateDrop);
                window.removeEventListener('mousewheel', this.wheelListener);
                window.removeEventListener('scroll', this.wheelListener);
                if (transferDom) transferDom.removeEventListener('scroll', this.wheelListener);
            });
        },
        // 打开时间选择盒子
        pickerBoxShow() {
            if (this.disabled) return;
            if (this.dateDrop) {
                if (this.pickerBoxStatus) {
                    this.setPickerBoxStatus(false);
                    return;
                }
                this.setPickerBoxStatus(true);
                DateDrop.resetPosition(this.dateDrop);
            } else {
                this.initPicker();

                this.dateDrop.$nextTick(() => {
                    this.setPickerBoxStatus(true);
                });
            }
        },
        // 设置下拉状态
        setPickerBoxStatus(status) {
            if (this.pickerBoxStatus === status) return;
            this.pickerBoxStatus = status;
            if (this.dateDrop) this.dateDrop.pickerBoxStatus = status;
        },
        // 设置禁用
        setDisableQuickSort(date) {
            if (!date) return;
            const { toggleVal, scope } = this;
            if (!scope) {
                this.disableQuickSortLeft = false;
                this.disableQuickSortRight = false;
                return;
            }
            if (toggleVal) {
                let start,
                    end;
                const [S, E] = date.split('-');
                start = S;
                end = E;
                if (date.includes(':')) {
                    start = S.split(' ')[0];
                    end = E.split(' ')[0];
                }
                const [ys, ms, ds] = start.split('.'),
                    [ye, me, de] = end.split('.');
                // 选择的时间段差值
                const diff = DiffTimestamp(start, end);
                const [s, e] = scope.split('-');
                const [yl, ml, dl] = s.split('.');
                const [yr, mr, dr] = e.split('.');
                // 向左切换的差值
                const [y1, m1, d1] = CountBeforeOrAfterDay(ys, ms, ds, -1);
                const diffLeft = DiffTimestamp([yl, ml, dl], [y1, m1, d1]);
                // 向右切换的差值
                const [y2, m2, d2] = CountBeforeOrAfterDay(ye, me, de, 1);
                const diffRight = DiffTimestamp([y2, m2, d2], [yr, mr, dr]);
                this.disableQuickSortLeft = diffLeft <= diff;
                this.disableQuickSortRight = diffRight <= diff;
            } else {
                let Y, M, D, YE, ME, DE;
                if (date.includes('-')) {
                    // 周情况下
                    const [S, E] = date.split('-'),
                        [y, m, d] = S.split('.'),
                        [ye, me, de] = E.split('.');
                    Y = y;
                    M = m;
                    D = d;
                    YE = ye;
                    ME = me;
                    DE = de;
                } else {
                    const [y, m, d] = date.split('.');
                    Y = y;
                    M = m;
                    D = d;
                }

                const isTime = scope && scope.includes(' '),
                    [s, e] = scope && scope.includes('-') ? scope.split('-') : [],
                    [yl = '', ml = '', dl = ''] = s ? (isTime ? s.split(' ')[0].split('.') : s.split('.')) : [],
                    [yr = '', mr = '', dr = ''] = e ? (isTime ? e.split(' ')[0].split('.') : e.split('.')) : [];

                switch (this.tabKey) {
                case 'day': {
                    this.disableQuickSortLeft = Y + M + D <= yl + ml + dl;
                    this.disableQuickSortRight = Y + M + D >= yr + mr + dr;
                    break;
                }
                case 'week': {
                    const [y1, m1, d1] = CountBeforeOrAfterDay(yl, ml, dl, 7);
                    const [y2, m2, d2] = CountBeforeOrAfterDay(yr, mr, dr, -7);
                    this.disableQuickSortLeft = Y + M + D <= y1 + m1 + d1;
                    this.disableQuickSortRight = YE + ME + DE >= y2 + m2 + d2;
                    break;
                }
                case 'month': {
                    this.disableQuickSortLeft = Y + M <= yl + ml;
                    this.disableQuickSortRight = Y + M >= yr + mr;
                    break;
                }
                case 'year': {
                    this.disableQuickSortLeft = Y <= yl;
                    this.disableQuickSortRight = Y >= yr;
                    break;
                }
                default:
                    break;
                }
            }
        },
        // 快速切换
        quickSort(flag) {
            if (this.disabled || !this.selectedDate) return;
            if (!this.dateDrop) this.initPicker();
            if (flag === 'left' && this.disableQuickSortLeft) return;
            if (flag === 'right' && this.disableQuickSortRight) return;
            this.dateDrop.quickSort(flag);
        }
    }
};
</script>

<style lang="stylus">
    @import "../static/stylus/datePicker/dateTrigger.styl"
    @import "../static/stylus/datePicker/pickerMain.styl"
    @import "../static/stylus/datePicker/pickerChild.styl"
    @import "../static/stylus/datePicker/pickerPanelYearAndMonth.styl"
    @import "../static/stylus/animate/selectDownUpExtend.styl"

    .p-date-picker
        display inline-block
        vertical-align middle
        font-size 0

    .p-picker-child-select-box-title
        display flex
        justify-content space-between
        align-items center
        padding-left 16px
        padding-right 16px
    .p-picker-child-select-box-icon
        display flex
        align-items center
        width 68px
        &:nth-of-type(1)
            justify-content flex-start
        &:nth-of-type(3)
            justify-content flex-end
        .p-picker-child-select-box-icon-svg
            padding-top 3px
            width 28px
            height @width
            line-height @width
            text-align center
            cursor pointer
            > svg
                width 16px
            &:hover
                svg
                    path
                        transition fill .5s
                        fill $blue-500
        .p-picker-child-select-box-icon-svg-left
            transform rotate(-180deg)

    .p-picker-box-content
        padding 8px 15px
        width 100%
        height 208px
        .p-picker-day-select
            height 192px

    .p-picker-child-title
        display flex
        align-items center
        margin-top 12px
        margin-bottom 8px
        padding-left 16px
        .p-picker-child-title-item
            margin-right 16px
            width 24px
            height 24px
            line-height @height
            color $grey-500
            font-size 14px
            text-align center
            user-select none
            &:nth-of-type(7n)
                margin-right 0

</style>
