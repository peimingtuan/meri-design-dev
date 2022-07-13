<template>
    <div class="p-date-picker" ref="pTimePicker">
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
            <i
                class="p-date-trigger-icon"
                @click="pickerBoxShow"
            >
                <CalendarTimeSvg v-if="triggerBorder" class="p-date-trigger-calendar"/>
            </i>
            <div class="p-date-picker-caption" v-if="caption" ref="captionDom" @click="pickerBoxShow">{{caption}}</div>
            <div
                    class="p-date-trigger-content p-date-trigger-content-calendar"
                    :style="captionWidth&&{width: `calc(100% - ${captionWidth+40}px)`}"
                    @click="pickerBoxShow"
                >
                <section :class="[
                    'p-date-trigger-text',
                    range && 'p-date-trigger-text-range'
                ]">
                    <article class="p-date-trigger-select-date" v-if="timeStart">{{timeStart}}</article>
                    <article class="p-date-trigger-placeholder" v-else>{{range?placeholderStart:placeholder}}</article>
                </section>
                <section class="p-date-trigger-connector" v-if="range">至</section>
                <section
                        v-if="range"
                        :class="['p-date-trigger-text', range&&'p-date-trigger-text-range']"
                >
                    <article class="p-date-trigger-select-date" v-if="timeEnd">{{timeEnd}}</article>
                    <article class="p-date-trigger-placeholder" v-else>{{placeholderEnd}}</article>
                </section>
            </div>
            <i
                class="p-date-trigger-icon"
                @click="dateRightHandle"
            >
                <ClearSvg v-if="clearStatus" class="p-date-trigger-clear" />
            </i>
            <span class="p-trigger-error-text"
                  v-if="errorShow"
            >{{errorText}}</span>
        </div>
    </div>
</template>

<script>
import ClearSvg from '../static/iconSvg/clear2.svg';
import CalendarTimeSvg from '../static/iconSvg/calendarTime.svg';

import TimeDrop from './timeDrop';

export default {
    name: 'PickerTime',
    components: {
        ClearSvg,
        CalendarTimeSvg
    },
    props: {
        /**
         * 设置时间
         */
        time: {
            type: String,
            default: ''
        },
        /**
         * 时间格式
         * @value 可选值 【hms-时分秒（默认值），hm-时分】
         */
        format: {
            type: String,
            default: 'hms'
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
        scopeTime: {
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
            default: '选择时间'
        },
        placeholderStart: {
            type: String,
            default: '开始时间'
        },
        placeholderEnd: {
            type: String,
            default: '结束时间'
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
            selectedTime: '', // 选中的时间
            timeStart: '',
            timeEnd: ''
        };
    },
    watch: {
        time: {
            handler(n, o) {
                if (n === o) return;
                this.setTime(n);
                if (this.timeDrop) this.timeDrop.selectedTime = n;
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
    methods: {
        /**
         * 设置时间
         */
        setTime(time) {
            if (!time) return;
            const { range } = this;
            this.selectedTime = time;
            if (range) {
                if (time.includes('-')) {
                    const [s, e] = time.split('-');
                    this.timeStart = s;
                    this.timeEnd = e;
                }
            } else {
                this.timeStart = time;
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
            const { selectedTime, hideClear, disabled } = this;
            if (!selectedTime || hideClear || disabled) return;
            this.clearStatus = true;
        },
        dateRightHandle() {
            const { disabled, hideClear, clearStatus } = this;
            if (disabled) return;
            if (!hideClear && clearStatus) this.clearTime();
            else this.pickerBoxShow();
        },
        // 清除时间
        clearTime() {
            if (!this.clearStatus) return;
            this.selectedTime = '';
            this.timeStart = '';
            this.timeEnd = '';

            if (this.timeDrop) {
                this.timeDrop.clearTime();
            } else {
                this.$emit('change', '');
            }
            this.pickerClearHide();
        },

        // 监听滚轮事件
        wheelListener() {
            const { timeDrop, pickerBoxStatus } = this;
            if (!timeDrop || !pickerBoxStatus) return;
            if (this.wheelTimer) clearTimeout(this.wheelTimer);
            this.wheelTimer = setTimeout(() => {
                TimeDrop.resetPosition(this.timeDrop);
            }, 360);
        },
        pickerBoxShow() {
            if (this.disabled) return;
            if (this.pickerBoxStatus) {
                this.setPickerBoxStatus(false);
                return;
            }
            if (this.timeDrop) {
                this.setPickerBoxStatus(true);
                TimeDrop.resetPosition(this.timeDrop);
            } else {
                const {
                    time, format, range, scopeTime, placeholder, placeholderStart, placeholderEnd,
                    transfer
                } = this;
                this.timeDrop = TimeDrop({
                    tag: this.$refs.pTimePicker,
                    propsData: {
                        time,
                        format,
                        range,
                        scopeTime,
                        placeholder,
                        placeholderStart,
                        placeholderEnd
                    },
                    data: {
                        parent: this
                    }
                }).$on('change', ([selectedTime, timeStart, timeEnd]) => {
                    this.timeDrop.time = selectedTime;
                    this.selectedTime = selectedTime;
                    this.timeStart = timeStart;
                    this.timeEnd = timeEnd;
                    this.$emit('change', selectedTime);
                });

                // 监听滚轮
                window.addEventListener('mousewheel', this.wheelListener, false);
                // 监听滚动条
                window.addEventListener('scroll', this.wheelListener, false);
                // window.addEventListener('scroll', this.onScroll, false);
                let transferDom = null;
                if (transfer && document) {
                    transferDom = document.getElementById(transfer);
                    if (transferDom) transferDom.addEventListener('scroll', this.wheelListener, false);
                }
                this.$once('hook:beforeDestroy', () => {
                    TimeDrop.remove(this.timeDrop);
                    window.removeEventListener('mousewheel', this.wheelListener);
                    window.removeEventListener('scroll', this.wheelListener);
                    if (transferDom) transferDom.removeEventListener('scroll', this.wheelListener);
                });

                this.timeDrop.$nextTick(() => {
                    this.setPickerBoxStatus(true);
                });
            }
        },
        // 设置下拉状态
        setPickerBoxStatus(status) {
            this.pickerBoxStatus = status;
            if (this.timeDrop) this.timeDrop.pickerBoxStatus = status;
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
