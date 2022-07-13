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
                                <article class="p-date-trigger-select-date" v-if="monthDayStart">{{monthDayStart}}</article>
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
                                <article class="p-date-trigger-select-date" v-if="monthDayEnd">{{monthDayEnd}}</article>
                                <article class="p-date-trigger-placeholder" v-else>{{placeholderEnd}}</article>
                            </section>
                        </div>
                    </div>
                </div>
                <div class="p-picker-main-item">
                    <MonthDay
                            ref="dateSelectStart"
                            :leapYear="leapYear"
                            :date="monthDayStart"
                            :range="range"
                            :scope="scopeStart"
                            @changeMonth="changeMonthStart"
                            @changeDay="changeDayStart"
                    />
                    <MonthDay
                            v-if="range"
                            borderLeft="border-left"
                            ref="dateSelectEnd"
                            :leapYear="leapYear"
                            :date="monthDayEnd"
                            :range="range"
                            :scope="scopeEnd"
                            @changeMonth="changeMonthEnd"
                            @changeDay="changeDayEnd"
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
import MonthDay from '../depend/monthDay';
import Button from '../../Button';

export default {
    name: 'monthDayDrop',
    components: {
        MonthDay,
        Button
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
        // 占位符
        placeholder: {
            type: String,
            default: ''
        },
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
            selectedMD: '', // 选中的时间
            monthDayStart: '',
            monthDayEnd: '',
            scopeStart: '',
            scopeEnd: '',
            monthStart: '',
            dayStart: '',
            monthEnd: '',
            dayEnd: '',
            btnTypeStatus: 'disabled'
        };
    },
    watch: {
        date(n, o) {
            if (n === o || n === this.selectedMD) return;
            this.setMonthDay(n);
        },
        pickerBoxStatus(n, o) {
            if (n === o || !n) return;
            const { date, range } = this;
            let dateS = date || '';
            if (range) {
                const [s = '', e = ''] = date.split('-');
                dateS = s;
                if (e) {
                    const [m, d] = e.split('.');
                    this.monthEnd = m;
                    this.dayEnd = d;
                } else {
                    this.monthEnd = '';
                    this.dayEnd = '';
                }
                this.monthDayEnd = e;
                this.$refs.dateSelectEnd.setDateDom(e);
            }
            if (dateS) {
                const [m, d] = dateS.split('.');
                this.monthStart = m;
                this.dayStart = d;
            } else {
                this.monthStart = '';
                this.dayStart = '';
            }
            this.monthDayStart = dateS;
            this.$refs.dateSelectStart.setDateDom(dateS);
            this.pickerMainFocus();
        }
    },
    created() {
        this.setScope(this.scope);
        this.setMonthDay(this.date);
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
                    // 没有点击确定重新初始化结束时间
                    const { date, scope, $refs: { dateSelectEnd } } = this;
                    this.setScope(scope);
                    if (!dateSelectEnd) return;
                    let dateEnd = '';
                    if (date) {
                        const [s, e = ''] = date.split('-');
                        dateEnd = e;
                    }
                    dateSelectEnd.initArray(dateEnd);
                }, 300);
            }
        },
        /**
         * 设置时间
         */
        setMonthDay(md) {
            if (!md) return;
            this.selectedMD = md;
            const { range } = this;
            if (range) {
                const [mds, mde] = md.split('-');
                this.monthDayStart = mds;
                this.monthDayEnd = mde;
                this.monthDayStart = mds;
                this.monthDayEnd = mde;
                const [ms, ds] = mds.split('.');
                const [me, de] = mde.split('.');
                this.monthStart = ms;
                this.dayStart = ds;
                this.monthEnd = me;
                this.dayEnd = de;
            } else {
                this.monthDayStart = md;
                this.monthDayStart = md;
                const [ms, ds] = md.split('.');
                this.monthStart = ms;
                this.dayStart = ds;
            }
            // this.btnTypeStatus = 'primary';
        },

        setScope(scope) {
            if (scope) {
                this.scopeStart = scope;
                const { range, selectedMD } = this;
                if (!range) return;
                if (selectedMD) {
                    const [ss] = selectedMD.split('-');
                    const [s, e] = scope.split('-');
                    this.scopeEnd = `${ss}-${e}`;
                } else {
                    this.scopeEnd = scope;
                }
            } else {
                this.scopeStart = '';
                this.scopeEnd = '';
            }
        },
        /**
         * 清除时间
         */
        clearDate() {
            this.selectedMD = '';
            this.monthDayStart = '';
            this.monthDayEnd = '';
            this.monthStart = '';
            this.dayStart = '';
            this.monthEnd = '';
            this.dayEnd = '';
            this.btnTypeStatus = 'disabled';
            this.$emit('change', ['', '', '']);
            const { $refs: { dateSelectStart, dateSelectEnd } } = this;
            dateSelectStart.setDateDom(0);
            if (dateSelectEnd) dateSelectEnd.setDateDom(0);
        },
        // 设置按钮状态
        setBtnTypeStatus() {
            const {
                range,
                monthStart, dayStart,
                monthEnd, dayEnd
            } = this;
            const startStatus = monthStart && dayStart;
            this.monthDayStart = startStatus ? `${monthStart}.${dayStart}` : '';
            if (range) {
                const endStatus = monthEnd && dayEnd;
                this.monthDayEnd = endStatus ? `${monthEnd}.${dayEnd}` : '';
                this.btnTypeStatus = (startStatus && endStatus) ? 'primary' : 'disabled';
            } else {
                this.btnTypeStatus = startStatus ? 'primary' : 'disabled';
            }
        },

        // 点开始时间
        changeStart() {
            if (!this.range) return;
            const {
                monthStart, dayStart,
                monthEnd, dayEnd,
                scopeEnd
            } = this;
            const monthDayStart = monthStart + dayStart,
                monthDayEnd = monthEnd + dayEnd;
            // 如果开始time大于结束time，清空结束time
            const sMD = `${monthStart}.${dayStart || '00'}`;
            // if (!sMD) return;
            if (scopeEnd) {
                const [s, e] = scopeEnd.split('-');
                this.scopeEnd = `${sMD}-${e}`;
            } else {
                this.scopeEnd = `${sMD}-13.00`;
            }
            if (!monthStart || !dayStart || !monthEnd || !dayEnd) return;
            if (monthDayStart > monthDayEnd) this.changeEnd('');
        },
        changeMonthStart(time) {
            this.monthStart = time;
            this.changeStart();
            this.setBtnTypeStatus();
        },
        changeDayStart(time) {
            this.dayStart = time;
            this.changeStart();
            this.setBtnTypeStatus();
        },
        // 点击结束时间
        changeEnd(time) {
            this.monthDayEnd = time;
            this.monthEnd = '';
            this.dayEnd = '';
            this.btnTypeStatus = 'disabled';
        },
        changeMonthEnd(time) {
            this.monthEnd = time;
            this.setBtnTypeStatus();
        },
        changeDayEnd(time) {
            this.dayEnd = time;
            this.setBtnTypeStatus();
        },
        /**
         * 确定
         */
        pickerConfirm() {
            const {
                range, monthStart, dayStart, monthEnd, dayEnd
            } = this;
            const monthDayStart = monthStart + (dayStart ? `.${dayStart}` : '');
            this.monthDayStart = monthDayStart;
            let selectedMD = monthDayStart,
                monthDayEnd;
            if (range) {
                monthDayEnd = monthEnd + (dayEnd ? `.${dayEnd}` : '');
                selectedMD = `${monthDayStart}-${monthDayEnd}`;
                this.monthDayEnd = monthDayEnd;
            }
            this.selectedMD = selectedMD;
            /**
             * 返回选择的时分秒
             * @type Function
             */
            this.$emit('change', [selectedMD, monthDayStart, monthDayEnd]);
            this.blurStatus = false;
            this.pickerBoxStatus = false;
            this.parent.pickerBoxStatus = false;
            this.btnTypeStatus = 'disabled';
        }
    }
};
</script>
