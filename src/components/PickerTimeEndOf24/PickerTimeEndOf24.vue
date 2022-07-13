<template>
    <div class="p-picker">
        <div class="p-picker-child" ref="pickerTime">
            <div
                    class="p-picker-input p-picker-input-double p-picker-input-normal p-picker-input-double-time"
                    @click="pickerBoxShow"
                    @mouseenter="pickerClearShow"
                    @mouseleave="pickerClearHide"
            >
                <section
                        :class="['p-picker-input-tip-double', selectedTime?'p-picker-input-values':'p-picker-input-tip']"
                >
                    <article class="p-picker-input-tip-values">{{timeStart?timeStart:placeholderStart}}</article>
                    <template v-if="range">
                        <article class="p-picker-input-tip-to">至</article>
                        <article class="p-picker-input-tip-values">{{timeEnd?timeEnd:placeholderEnd}}</article>
                    </template>
                </section>
                <section class="p-picker-svg-box">
                    <ClearSvg class="p-picker-clear-svg" v-if="clearStatus&&!hideClear" @click.stop="clearTime"/>
                    <CalendarTimeSvg v-else @click="pickerBoxShow"/>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import ClearSvg from '../static/iconSvg/clear2.svg';
import CalendarTimeSvg from '../static/iconSvg/calendarTime.svg';

import TimeDrop from './timeDrop';
import TimeDrop2400 from '../PickerTime2400/timeDrop';

export default {
    name: 'PickerTimeEndOf24',
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
        // 限制的时间组
        scopes: {
            type: Array,
            default: () => []
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
                }
            },
            immediate: true
        },
        scopes: {
            handler(n) {
                if (this.timeDrop) this.timeDrop.scopes = n;
            },
            deep: true
        }
    },
    mounted() {
        window.addEventListener('mousewheel', this.listenScroll, false);
        window.addEventListener('scroll', this.listenScroll, false);
        // 销毁实例
        this.$once('hook:beforeDestroy', () => {
            if (this.timeDrop) TimeDrop.remove(this.timeDrop);
            window.removeEventListener('mousewheel', this.listenScroll);
            window.removeEventListener('scroll', this.listenScroll);
        });
    },
    methods: {
        /**
         * 清除时间
         */
        clearTime() {
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
        setPickerBoxStatus(status) {
            this.pickerBoxStatus = status;
            if (this.timeDrop) this.timeDrop.pickerBoxStatus = status;
        },
        /**
         * 打开时间选择盒子
         */
        pickerBoxShow() {
            if (this.timeDrop) {
                this.setPickerBoxStatus(true);
                TimeDrop.resetPosition(this.timeDrop);
            } else {
                const {
                    time, scopes, placeholderStart, placeholderEnd
                } = this;
                this.timeDrop = TimeDrop({
                    tag: this.$refs.pickerTime,
                    props: {
                        time,
                        scopes,
                        placeholderStart,
                        placeholderEnd
                    },
                    param: {
                        parent: this
                    }
                }).$on('change', ([selectedTime, timeStart, timeEnd]) => {
                    this.selectedTime = selectedTime;
                    this.timeStart = timeStart;
                    this.timeEnd = timeEnd;
                    this.$emit('change', selectedTime);
                });

                this.timeDrop.$nextTick(() => {
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
        },
        // 监听页面滚动
        listenScroll() {
            this.setPickerBoxStatus(false);
        }
    }
};
</script>

<style lang="stylus">
    @import "../static/stylus/datePicker/pickerMain.styl"
    @import "../static/stylus/datePicker/pickerInput.styl"
    @import "../static/stylus/datePicker/pickerChild.styl"
    @import "../static/stylus/animate/selectDownUpExtend.styl"

</style>
