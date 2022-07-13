<template>
    <div class="p-date-picker" ref="pickerTime2400">
        <div :class="[
                'p-date-trigger',
                range?'p-date-trigger-range':'p-date-trigger-single',
                errorShow && 'p-trigger-error'
            ]"
            >
            <div
                    class="p-date-trigger-content p-date-trigger-content-calendar"
                    @click="pickerBoxShow"
            >
                <section :class="[
                    'p-date-trigger-text',
                    range ? 'p-date-trigger-text-range' : 'p-date-trigger-text-padding'
                ]">
                    <article class="p-date-trigger-select-date" v-if="timeStart">{{timeStart}}</article>
                    <article class="p-date-trigger-placeholder" v-else>{{placeholderStart}}</article>
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
            <template>
                <i
                    class="p-date-trigger-icon"
                        @mouseenter="pickerClearShow"
                        @mouseleave="pickerClearHide"
                        @click="dateRightHandle"
                >
                    <ClearSvg class="p-date-trigger-clear" v-if="!hideClear && clearStatus"/>
                    <CalendarTimeSvg v-else/>
                </i>
            </template>
            <span class="p-trigger-error-text"
                  v-if="errorShow"
            >{{errorText}}</span>
        </div>
    </div>
</template>

<script>
import ClearSvg from '../static/iconSvg/clear2.svg';
import CalendarTimeSvg from '../static/iconSvg/calendarTime.svg';

import TimeDrop2400 from './timeDrop';

export default {
    name: 'PickerTime2400',
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
        /**
         * 时间段
         * @value 【false-时间点（默认值），true-时间段】
         */
        range: {
            type: Boolean,
            default: false
        },
        // 隐藏清除按钮
        hideClear: {
            type: Boolean,
            default: false
        },
        // 占位符
        placeholderStart: {
            type: String,
            default: '开始时间'
        },
        placeholderEnd: {
            type: String,
            default: '结束时间'
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
        }
    },
    data() {
        return {
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
                this.selectedTime = n;
                if (n) {
                    const [s, e] = n.split('-');
                    this.timeStart = s;
                    this.timeEnd = e;
                    this.setScope(s);
                }
            },
            immediate: true
        },
        pickerBoxStatus(n) {
            this.$emit('focusChange', !n);
        }
    },
    methods: {
        dateRightHandle() {
            const { hideClear, clearStatus } = this;
            if (!hideClear && clearStatus) this.clearTime();
            else this.pickerBoxShow();
        },
        /**
         * 清除时间
         */
        clearTime() {
            this.selectedTime = '';
            this.timeStart = '';
            this.timeEnd = '';

            if (this.timeDrop2400) {
                this.timeDrop2400.clearTime();
            } else {
                this.$emit('change', '');
            }
            this.pickerClearHide();
        },
        setPickerBoxStatus(status) {
            this.pickerBoxStatus = status;
            if (this.timeDrop2400) this.timeDrop2400.pickerBoxStatus = status;
        },
        setScope(time) {
            this.scopeEnd = time;
        },
        // 监听滚轮事件
        wheelListener() {
            const { timeDrop2400, pickerBoxStatus } = this;
            if (!timeDrop2400 || !pickerBoxStatus) return;
            if (this.wheelTimer) clearTimeout(this.wheelTimer);
            this.wheelTimer = setTimeout(() => {
                TimeDrop2400.resetPosition(this.timeDrop2400);
            }, 360);
        },
        /**
         * 打开时间选择盒子
         */
        pickerBoxShow() {
            if (this.pickerBoxStatus) {
                this.setPickerBoxStatus(false);
                return;
            }
            if (this.timeDrop2400) {
                this.setPickerBoxStatus(true);
                TimeDrop2400.resetPosition(this.timeDrop2400);
            } else {
                const {
                    time, range, placeholderStart, placeholderEnd,
                    transfer
                } = this;
                this.timeDrop2400 = TimeDrop2400({
                    tag: this.$refs.pickerTime2400,
                    propsData: {
                        time,
                        range,
                        placeholderStart,
                        placeholderEnd
                    },
                    data: {
                        parent: this
                    }
                }).$on('change', ([selectedTime, timeStart, timeEnd]) => {
                    this.selectedTime = selectedTime;
                    this.timeStart = timeStart;
                    this.timeEnd = timeEnd;
                    this.$emit('change', selectedTime);
                });

                // 监听滚轮
                window.addEventListener('mousewheel', this.wheelListener, false);
                // 监听滚动条
                window.addEventListener('scroll', this.wheelListener, false);
                let transferDom = null;
                if (transfer && document) {
                    transferDom = document.getElementById(transfer);
                    if (transferDom) transferDom.addEventListener('scroll', this.wheelListener, false);
                }
                this.$once('hook:beforeDestroy', () => {
                    TimeDrop2400.remove(this.timeDrop2400);
                    window.removeEventListener('mousewheel', this.wheelListener);
                    window.removeEventListener('scroll', this.wheelListener);
                    if (transferDom) transferDom.removeEventListener('scroll', this.wheelListener);
                });

                this.timeDrop2400.$nextTick(() => {
                    this.setPickerBoxStatus(true);
                });
            }
        },
        /**
         * 显示清除按钮
         */
        pickerClearShow() {
            if (this.selectedTime) this.clearStatus = true;
        },
        /**
         * 隐藏清除按钮
         */
        pickerClearHide() {
            this.clearStatus = false;
        }
    }
};
</script>

<style lang="stylus">
    @import "../static/stylus/datePicker/dateTrigger.styl"
    @import "../static/stylus/datePicker/pickerMain.styl"
    @import "../static/stylus/datePicker/pickerChild.styl"
    @import "../static/stylus/animate/selectDownUpExtend.styl"

</style>
