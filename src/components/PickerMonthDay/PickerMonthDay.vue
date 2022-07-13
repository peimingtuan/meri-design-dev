<template>
    <div class="p-date-picker" ref="pMonthDayPicker">
        <div :class="[
                'p-date-trigger',
                triggerBorder ? 'p-date-trigger-border' : 'p-date-trigger-border-none',
                (!triggerBorder && pickerBoxStatus) && 'p-date-trigger-border-show',
                range?'p-date-trigger-range':'p-date-trigger-single',
                (triggerBorder && pickerBoxStatus) && 'p-date-trigger-open',
                disabled&&'p-date-trigger-disabled',
                errorShow && 'p-trigger-error'
            ]"
             :style="width&&{width: `${width}px`}"
             @mouseenter="pickerClearShow"
             @mouseleave="pickerClearHide"
            >
            <i v-if="triggerBorder" class="p-date-trigger-icon" @click="pickerBoxShow">
                <CalendarTimeSvg class="p-date-trigger-calendar"/>
            </i>
            <div class="p-date-picker-caption" v-if="caption" ref="captionDom" @click="pickerBoxShow">{{caption}}</div>
            <div
                    class="p-date-trigger-content p-date-trigger-content-calendar"
                    :style="caption&&{captionWidth: `calc(100% - ${captionWidth}px)`}"
                    @click="pickerBoxShow"
            >
                <section :class="[
                    'p-date-trigger-text',
                    range && 'p-date-trigger-text-range'
                    ]"
                    >
                    <article class="p-date-trigger-select-date" v-if="monthDayStart">{{monthDayStart}}</article>
                    <article class="p-date-trigger-placeholder" v-else>{{range?placeholderStart:placeholder}}</article>
                </section>
                <section class="p-date-trigger-connector" v-if="range">至</section>
                <section
                        v-if="range"
                        :class="['p-date-trigger-text', range&&'p-date-trigger-text-range']"
                >
                    <article class="p-date-trigger-select-date" v-if="monthDayEnd">{{monthDayEnd}}</article>
                    <article class="p-date-trigger-placeholder" v-else>{{placeholderEnd}}</article>
                </section>
            </div>
            <i class="p-date-trigger-icon" @click="dateRightHandle">
                <ClearSvg v-if="clearStatus" class="p-date-trigger-clear" />
            </i>
            <span class="p-trigger-error-text" v-if="errorShow">{{errorText}}</span>
        </div>
    </div>
</template>

<script>
import ClearSvg from '../static/iconSvg/clear2.svg';
import CalendarTimeSvg from '../static/iconSvg/calendarTime.svg';
import MonthDayDrop from './monthDayDrop';

export default {
    name: 'PickerMonthDay',
    components: {
        ClearSvg,
        CalendarTimeSvg
    },
    props: {
        // 二月有多少天
        leapYear: {
            type: Boolean,
            default: false
        },
        /**
         * 设置时间
         */
        date: {
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
        /**
         * 时间段
         * @value 【false-时间点（默认值），true-时间段】
         */
        range: {
            type: Boolean,
            default: false
        },
        // 限制的时间
        scope: {
            type: String,
            default: ''
        },
        // 隐藏清除按钮
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
            default: '开始时间日期'
        },
        placeholderEnd: {
            type: String,
            default: '结束时间日期'
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
        }
    },
    data() {
        return {
            captionWidth: 0, // 标题占用宽度
            pickerBoxStatus: false, // 显示选择时间框
            clearStatus: false, // 关闭按钮
            selectedDate: '', // 选中的时间
            monthDayStart: '',
            monthDayEnd: ''
        };
    },
    watch: {
        date: {
            handler(n, o) {
                if (n === o) return;
                this.setTime(n);
                if (this.monthDayDrop) this.monthDayDrop.selectedDate = n;
            },
            immediate: true
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
        }
    },
    mounted() {
        window.addEventListener('mousewheel', this.listenScroll, false);
        window.addEventListener('scroll', this.listenScroll, false);
        if (this.transfer) {
            const transferDom = document.getElementById(this.transfer);
            if (transferDom) transferDom.addEventListener('scroll', this.listenScroll, false);
        }
        // 销毁实例
        this.$once('hook:beforeDestroy', () => {
            if (this.monthDayDrop) MonthDayDrop.remove(this.monthDayDrop);
            window.removeEventListener('mousewheel', this.listenScroll);
            window.removeEventListener('scroll', this.listenScroll);
            if (this.transfer) {
                const transferDom = document.getElementById(this.transfer);
                if (transferDom) transferDom.removeEventListener('scroll', this.listenScroll, false);
            }
        });
    },
    methods: {
        /**
         * 设置时间
         */
        setTime(time) {
            if (!time) return;
            const { range } = this;
            this.selectedDate = time;
            if (range) {
                if (time.includes('-')) {
                    const [s, e] = time.split('-');
                    this.monthDayStart = s;
                    this.monthDayEnd = e;
                }
            } else {
                this.monthDayStart = time;
            }
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
        pickerClearHide() {
            this.clearStatus = false;
        },
        pickerClearShow() {
            const { selectedDate, hideClear, disabled } = this;
            if (!selectedDate || hideClear || disabled) return;
            this.clearStatus = true;
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
            this.monthDayStart = '';
            this.monthDayEnd = '';

            if (this.monthDayDrop) this.monthDayDrop.clearDate();
            else this.$emit('change', '');
            this.pickerClearHide();
        },
        pickerBoxShow() {
            if (this.disabled) return;
            if (this.pickerBoxStatus) {
                this.setPickerBoxStatus(false);
                return;
            }
            if (this.monthDayDrop) {
                MonthDayDrop.resetPosition(this.monthDayDrop);
                this.setPickerBoxStatus(true);
            } else {
                const {
                    date, range, scope, leapYear, placeholder, placeholderStart, placeholderEnd
                } = this;
                this.monthDayDrop = MonthDayDrop({
                    tag: this.$refs.pMonthDayPicker,
                    propsData: {
                        date,
                        range,
                        scope,
                        leapYear,
                        placeholder,
                        placeholderStart,
                        placeholderEnd,
                        parent: this
                    },
                    data: {
                        parent: this
                    }
                }).$on('change', ([selectedDate, monthDayStart, monthDayEnd]) => {
                    this.monthDayDrop.date = selectedDate;
                    this.selectedDate = selectedDate;
                    this.monthDayStart = monthDayStart;
                    this.monthDayEnd = monthDayEnd;
                    this.$emit('change', selectedDate);
                });

                this.monthDayDrop.$nextTick(() => {
                    this.setPickerBoxStatus(true);
                });
            }
        },
        // 设置下拉状态
        setPickerBoxStatus(status) {
            this.pickerBoxStatus = status;
            if (this.monthDayDrop) this.monthDayDrop.pickerBoxStatus = status;
        },
        // 监听页面滚动
        listenScroll() {
            this.setPickerBoxStatus(false);
        }
    }
};
</script>

<style lang="stylus">
@import "../static/stylus/datePicker/dateTrigger.styl"
@import "../static/stylus/datePicker/pickerMain.styl"
@import "../static/stylus/datePicker/pickerChild.styl"
@import "../static/stylus/animate/selectDownUpExtend.styl"

.p-date-picker
    display inline-block
    vertical-align middle
    font-size 0

</style>
