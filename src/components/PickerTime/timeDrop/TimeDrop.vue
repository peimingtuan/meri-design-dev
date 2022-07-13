<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <!--
        -->
        <div
                class="p-picker-main"
                ref="pickerMain"
                tabindex="-1"
                v-show="pickerBoxStatus"
                @mouseenter="pickerMainBlur"
                @mouseleave="pickerMainFocus"
                @blur="pickerBoxHide"
                @wheel.stop
                @scroll.stop
        >
            <div class="p-picker-main-item-box">
                <div class="p-picker-main-item-input-box">
                    <div :class="[
                        'p-date-trigger', 'p-date-trigger-border',
                         range?'p-date-trigger-range-drop':'p-date-trigger-single-drop p-date-trigger-single-drop-1'
                    ]">
                        <div class="p-date-trigger-content">
                            <section :class="[
                                'p-date-trigger-text', range&&'p-date-trigger-text-range'
                            ]">
                                <article class="p-date-trigger-select-date" v-if="timeStart">{{timeStart}}</article>
                                <article class="p-date-trigger-placeholder" v-else>{{range?placeholderStart:placeholder}}</article>
                            </section>
                            <section class="p-date-trigger-connector" v-if="range">至</section>
                            <section
                                    v-if="range"
                                    :class="[
                                        'p-date-trigger-text',
                                        range&&'p-date-trigger-text-range'
                                    ]"
                            >
                                <article class="p-date-trigger-select-date" v-if="timeEnd">{{timeEnd}}</article>
                                <article class="p-date-trigger-placeholder" v-else>{{placeholderEnd}}</article>
                            </section>
                        </div>
                    </div>
                </div>
                <div class="p-picker-main-item">
                    <Time
                            ref="timeSelectStart"
                            :time="timeStart"
                            :format="format"
                            :range="range"
                            :scopeTime="scopeTimeStart"
                            @changeTime="changeTime(['start', ...arguments])"
                    />
                    <Time
                            v-if="range"
                            borderLeft="border-left"
                            ref="timeSelectEnd"
                            :time="timeEnd"
                            :format="format"
                            :range="range"
                            :scopeTime="scopeTimeEnd"
                            @changeTime="changeTime(['end', ...arguments])"
                    />
                </div>
            </div>

            <div class="p-picker-main-handle">
                <Button :type="btnTypeStatus" size="small" @click="pickerConfirm">确定</Button>
            </div>
        </div>
    </transition>
</template>

<script>
import Time from '../depend/time';
import Button from '../../Button';

export default {
    name: 'TimeDrop',
    components: {
        Time,
        Button
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
        // 限制的时间
        scopeTime: {
            type: String,
            default: ''
        },
        // 占位符
        placeholder: {
            type: String,
            default: ''
        },
        // 占位符
        placeholderStart: {
            type: String,
            default: ''
        },
        // 占位符
        placeholderEnd: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            position: true,
            parent: null,
            pickerBoxStatus: false, // 显示选择时间框
            blurStatus: false, // 是否可执行blur
            clearStatus: false, // 关闭按钮
            selectedTime: '', // 选中的时间
            timeStart: '',
            timeEnd: '',
            scopeTimeStart: '',
            scopeTimeEnd: '',
            hourStart: '',
            minuteStart: '',
            secondStart: '',
            hourEnd: '',
            minuteEnd: '',
            secondEnd: '',
            btnTypeStatus: 'disabled'
        };
    },
    watch: {
        time(n, o) {
            if (n === o || n === this.selectedTime) return;
            this.setTime(n);
        },
        pickerBoxStatus(n, o) {
            if (n === o || !n) return;
            const { range, parent: { selectedTime }, $refs: { timeSelectStart, timeSelectEnd } } = this;
            let start,
                end = '';
            if (range) {
                const [s = '', e = ''] = selectedTime.split('-');
                start = s;
                end = e;
            } else {
                start = selectedTime;
            }
            this.timeStart = start;
            this.timeEnd = end;
            const [hs = '', ms = '', ss = ''] = start.split(':'),
                [he = '', me = '', se = ''] = end.split(':');
            this.hourStart = hs;
            this.minuteStart = ms;
            this.secondStart = ss;
            this.hourEnd = he;
            this.minuteEnd = me;
            this.secondEnd = se;
            timeSelectStart.setTimeDom(start);
            if (timeSelectEnd) timeSelectEnd.setTimeDom(end);
            this.btnTypeStatus = 'disabled';
            this.pickerMainFocus();
        }
    },
    created() {
        this.setScopeTime(this.scopeTime);
        this.setTime(this.time);
    },
    methods: {
        pickerMainBlur() {
            this.$nextTick(() => {
                this.blurStatus = false;
                if (this.$refs.pickerMain) this.$refs.pickerMain.blur();
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
                    this.btnTypeStatus = 'disabled';
                    const { scopeTime, $refs: { timeSelectStart, timeSelectEnd } } = this;
                    this.setScopeTime(scopeTime);
                    this.setTime(scopeTime);
                    timeSelectStart.initTimeArr(this.scopeTimeStart);
                    timeSelectStart.setTime(this.timeStart);
                    if (!timeSelectEnd) return;
                    timeSelectEnd.initTimeArr(this.scopeTimeEnd);
                    timeSelectEnd.setTime(this.timeEnd);
                }, 300);
            }
        },
        /**
         * 设置时间
         */
        setTime(time) {
            if (time) {
                this.selectedTime = time;
                const { range, format } = this;
                if (range) {
                    if (time && time.includes('-')) {
                        const [s, e] = time.split('-');
                        this.timeStart = s;
                        this.timeEnd = e;
                        const [sh, sm, ss] = s.split(':'),
                            [eh, em, es] = e.split(':');
                        this.hourStart = sh;
                        this.hourEnd = eh;
                        if (format.includes('m')) {
                            this.minuteStart = sm;
                            this.minuteEnd = em;
                        }
                        if (format.includes('s')) {
                            this.secondStart = ss;
                            this.secondEnd = es;
                        }
                    }
                } else {
                    this.timeStart = time;
                    const [sh, sm, ss] = time.split(':');
                    this.hourStart = sh;
                    if (format.includes('m')) this.minuteStart = sm;
                    if (format.includes('s')) this.secondStart = ss;
                }
            } else {
                this.timeStart = '';
                this.timeEnd = '';
                this.hourStart = '';
                this.hourEnd = '';
                this.minuteStart = '';
                this.minuteEnd = '';
                this.secondStart = '';
                this.secondEnd = '';
            }
        },

        setScopeTime(scopeTime) {
            if (scopeTime) {
                this.scopeTimeStart = scopeTime;
                this.scopeTimeEnd = scopeTime;
                const { selectedTime } = this;
                if (selectedTime) {
                    const [ss] = selectedTime.split('-');
                    const [s, e] = scopeTime.split('-');
                    this.scopeTimeEnd = `${ss}-${e}`;
                }
            } else {
                this.scopeTimeStart = '';
                this.scopeTimeEnd = '';
            }
        },
        /**
         * 清除时间
         */
        clearTime() {
            this.selectedTime = '';
            this.timeStart = '';
            this.timeEnd = '';
            this.$emit('change', ['', '', '']);
            const { $refs: { timeSelectStart, timeSelectEnd } } = this;
            timeSelectStart.setTimeDom(0);
            if (timeSelectEnd) timeSelectEnd.setTimeDom(0);
        },
        // 设置按钮状态
        setBtnTypeStatus() {
            const {
                range, format, hourStart, minuteStart, secondStart, hourEnd, minuteEnd, secondEnd
            } = this;
            let status = '',
                statusStart = '',
                statusEnd = '',
                timeStart = '',
                timeEnd = '',
                selectedTime = '';

            if (format === 'hms') {
                statusStart = hourStart && minuteStart && secondStart;
                timeStart = statusStart ? `${hourStart}:${minuteStart}:${secondStart}` : '';
            } else if (format === 'hm') {
                statusStart = hourStart && minuteStart;
                timeStart = statusStart ? `${hourStart}:${minuteStart}` : '';
            } else {
                statusStart = hourStart;
                timeStart = hourStart || '';
            }
            status = statusStart;
            selectedTime = `${timeStart}`;

            if (range) {
                if (format === 'hms') {
                    statusEnd = hourEnd && minuteEnd && secondEnd;
                    timeEnd = statusEnd ? `${hourEnd}:${minuteEnd}:${secondEnd}` : '';
                } else if (format === 'hm') {
                    statusEnd = hourStart && minuteStart && hourEnd && minuteEnd;
                    timeEnd = statusEnd ? `${hourEnd}:${minuteEnd}` : '';
                } else {
                    statusEnd = hourEnd;
                    timeEnd = hourEnd || '';
                }
                status = statusStart && statusEnd;
                selectedTime = (timeStart && timeEnd) ? `${timeStart}-${timeEnd}` : '';
            }
            this.timeStart = timeStart;
            this.timeEnd = timeEnd;
            this.selectedTime = selectedTime;
            this.btnTypeStatus = status ? 'primary' : 'disabled';
        },

        // 点开始时间
        changeStart() {
            if (!this.range) return;
            const {
                format,
                hourStart, minuteStart, secondStart,
                hourEnd, minuteEnd, secondEnd,
                $refs: { timeSelectEnd }
            } = this;
            const timeStart = hourStart + minuteStart + secondStart;
            const timeEnd = hourEnd + minuteEnd + secondEnd;
            // 如果开始time大于结束time，清空结束time
            this.$refs.timeSelectStart.changeArray();
            const sTime = `${hourStart}:${minuteStart}:${secondStart}`;
            const { scopeTimeEnd } = this;
            if (scopeTimeEnd) {
                const [s, e] = scopeTimeEnd.split('-');
                this.scopeTimeEnd = `${sTime}-${e}`;
            } else {
                this.scopeTimeEnd = `${sTime}-24:60:60`;
            }
            let status;
            if (format === 'hms') status = hourStart && minuteStart && secondStart && hourEnd && minuteEnd && secondEnd;
            else if (format === 'hm') status = hourStart && minuteStart && hourEnd && minuteEnd;
            else status = hourStart && hourEnd;
            if (status && timeStart >= timeEnd) this.changeEnd('');
            setTimeout(() => {
                if (timeSelectEnd) timeSelectEnd.setTimeDom();
            }, 100);
        },
        /**
         * 时分秒操作
         * @param panel 可选值[start, end] 开始结束面板
         * @param grading 可选值[h, m, s] 时分秒
         * @param time 当前时/分/秒
         */
        changeTime([panel, grading, time]) {
            const that = this;
            const granularityTime = {
                start() {
                    const granularityStart = {
                        h() { that.hourStart = time; },
                        m() { that.minuteStart = time; },
                        s() { that.secondStart = time; }
                    };
                    granularityStart[grading]();
                    that.changeStart();
                },
                end() {
                    const granularityEnd = {
                        h() { that.hourEnd = time; },
                        m() { that.minuteEnd = time; },
                        s() { that.secondEnd = time; }
                    };
                    granularityEnd[grading]();
                }
            };

            granularityTime[panel]();
            this.setBtnTypeStatus();
        },
        // 点击结束时间
        changeEnd(time) {
            this.timeEnd = time;
            this.hourEnd = '';
            this.minuteEnd = '';
            this.secondEnd = '';
            this.btnTypeStatus = 'disabled';
            this.$refs.timeSelectEnd.changeArray();
        },
        /**
         * 确定
         */
        pickerConfirm() {
            const { range, timeStart, timeEnd } = this;
            const selectedTime = range ? `${timeStart}-${timeEnd}` : timeStart;
            this.selectedTime = selectedTime;
            /**
             * 返回选择的时分秒
             * @type Function
             */
            this.$emit('change', [selectedTime, timeStart, timeEnd]);
            this.blurStatus = false;
            this.pickerBoxStatus = false;
            this.parent.pickerBoxStatus = false;
            this.btnTypeStatus = 'disabled';
        }
    }
};
</script>
