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
                        'p-date-trigger',
                         'p-date-trigger-range-drop'
                    ]">
                        <div class="p-date-trigger-content">
                            <section :class="[
                                'p-date-trigger-text', 'p-date-trigger-text-range'
                            ]">
                                <article class="p-date-trigger-select-date" v-if="timeStart">{{timeStart}}</article>
                                <article class="p-date-trigger-placeholder" v-else>{{placeholderStart}}</article>
                            </section>
                            <section class="p-date-trigger-connector">至</section>
                            <section
                                    :class="[
                                        'p-date-trigger-text',
                                        'p-date-trigger-text-range'
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
                            @changeHour="changeHourStart"
                            @changeMinute="changeMinuteStart"
                    />
                    <Time
                            borderLeft="border-left"
                            ref="timeSelectEnd"
                            :scopes="scopesEnd"
                            @changeHour="changeHourEnd"
                            @changeMinute="changeMinuteEnd"
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
    name: 'TimeDrop2400',
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
        // 限制的时间组
        scopes: {
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
            hourEnd: '',
            minuteEnd: '',
            btnTypeStatus: 'disabled',
            scopesEnd: ''
        };
    },
    watch: {
        time: {
            handler(n, o) {
                if (n === o) return;
                this.setTime(n);
            },
            immediate: true
        },
        pickerBoxStatus(n) {
            if (n) {
                this.$refs.timeSelectStart.setTimeDom();
                this.$refs.timeSelectEnd.setTimeDom();
                this.pickerMainFocus();
            }
        },
        scopes: {
            handler(n) {
                this.scopesStart = n.map(d => {
                    const [s, e] = d.split('-');
                    const [he, me] = e.split(':');
                    let HE = Number(he),
                        ME = Number(me) - 1;
                    if (ME === -1) {
                        ME = 59;
                        HE = he - 1;
                    }
                    HE = HE < 10 ? `0${HE}` : `${HE}`;
                    ME = ME < 10 ? `0${ME}` : `${ME}`;
                    return `${s}-${HE}:${ME}`;
                });
                this.scopesEnd = n.map(d => {
                    const [s, e] = d.split('-');
                    const [hs, ms] = s.split(':');
                    let HS = Number(hs),
                        MS = Number(ms) + 1;
                    if (MS === 60) {
                        MS = 0;
                        HS = HS + 1;
                    }
                    HS = HS < 10 ? `0${HS}` : `${HS}`;
                    MS = MS < 10 ? `0${MS}` : `${MS}`;
                    return `${HS}:${MS}-${e}`;
                });
            },
            deep: true
        }
    },
    created() {
        // this.setTime(this.time);
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
                    // this.btnTypeStatus = 'disabled';
                }, 300);
            }
        },
        /**
         * 设置时间
         */
        setTime(time) {
            this.selectedTime = time;
            if (time && time.includes('-')) {
                const [s, e] = time.split('-');
                this.timeStart = s;
                this.timeEnd = e;
                this.scopesEnd = s;
                const [sh, sm] = s.split(':'),
                    [eh, em] = e.split(':');
                this.hourStart = sh;
                this.hourEnd = eh;
                this.minuteStart = sm;
                this.minuteEnd = em;
            } else {
                this.hourStart = '';
                this.hourEnd = '';
                this.minuteStart = '';
                this.minuteEnd = '';
            }
            this.setBtnTypeStatus();
        },
        /**
         * 清除时间
         */
        clearTime() {
            this.selectedTime = '';
            this.timeStart = '';
            this.timeEnd = '';
            this.scopesEnd = '';
            this.$emit('change', ['', '', '']);
        },
        // 设置按钮状态
        setBtnTypeStatus() {
            const {
                hourStart, minuteStart, hourEnd, minuteEnd, scopes
            } = this;
            const status = hourStart && minuteStart && hourEnd && minuteEnd,
                timeStart = (hourStart && minuteStart) ? `${hourStart}:${minuteStart}` : '',
                timeEnd = (hourEnd && minuteEnd) ? `${hourEnd}:${minuteEnd}` : '',
                selectedTime = (timeStart && timeEnd) ? `${timeStart}-${timeEnd}` : '';

            this.timeStart = timeStart;
            this.timeEnd = timeEnd;
            this.selectedTime = selectedTime;
            if (timeStart) this.scopesEnd = timeStart;
            this.btnTypeStatus = (status && !scopes.includes(selectedTime)) ? 'primary' : 'disabled';
        },

        // 点开始时间
        changeStart() {
            const timeStart = this.hourStart + this.minuteStart;
            const timeEnd = this.hourEnd + this.minuteEnd;
            if (timeStart >= timeEnd && (timeStart.length === timeEnd.length)) {
                this.hourEnd = '';
                this.minuteEnd = '';
                this.timeEnd = '';
                // this.btnTypeStatus = 'disabled';
            }
        },
        changeHourStart(time) {
            this.hourStart = time;
            this.changeStart();
            this.setBtnTypeStatus();
        },
        changeMinuteStart(time) {
            this.minuteStart = time;
            this.changeStart();
            this.setBtnTypeStatus();
        },
        // 点击结束时间
        changeEnd() {
            const timeStart = this.hourStart + this.minuteStart;
            const timeEnd = this.hourEnd + this.minuteEnd;
            if (timeStart >= timeEnd && (timeStart.length === timeEnd.length)) {
                this.hourStart = '';
                this.minuteStart = '';
                this.timeStart = '';
                // this.btnTypeStatus = 'disabled';
            }
        },
        changeHourEnd(time) {
            this.hourEnd = time;
            this.changeEnd();
            this.setBtnTypeStatus();
        },
        changeMinuteEnd(time) {
            this.minuteEnd = time;
            this.changeEnd();
            this.setBtnTypeStatus();
        },
        /**
         * 确定
         */
        pickerConfirm() {
            const selectedTime = `${this.timeStart}-${this.timeEnd}`;
            this.selectedTime = selectedTime;
            /**
             * 返回选择的时分秒
             * @type Function
             */
            this.$emit('change', [selectedTime, this.timeStart, this.timeEnd]);
            this.blurStatus = false;
            this.pickerBoxStatus = false;
            this.btnTypeStatus = 'disabled';
        }
    }
};
</script>
