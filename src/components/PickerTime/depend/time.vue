<template>
    <div :class="['p-picker-child-select-box', 'p-picker-child-select-box-'+borderLeft]">
        <div class="p-picker-child-title">
            <section class="p-picker-time-title-item" v-if="format">时</section>
            <section class="p-picker-time-title-item" v-if="format.includes('hm')">分</section>
            <section class="p-picker-time-title-item" v-if="format.includes('ms')">秒</section>
        </div>
        <div class="p-picker-time-content">
            <div
                    v-if="format"
                    :class="['p-picker-time-select', 'p-picker-time-select-'+format]"
                    ref="hoursDom"
                    @mousedown="hourDownHandle"
                    @mouseup="hourUpHandle"
                    @scroll="hourScroll"
            >
                <section class="p-picker-time-section">
                    <article
                            :class="['p-picker-time-text', hour===hh.time&&'p-picker-time-text-selected', hh.disabled&&'p-picker-time-text-disabled']"
                            v-for="(hh, hi) in hours"
                            :key="'hour'+hi+hh.time"
                            @click="hourClick(hh)"
                    ><span>{{hh.time}}</span></article>
                </section>
            </div>
            <div
                    v-if="format.includes('hm')"
                    :class="['p-picker-time-select', 'p-picker-time-select-'+format]"
                    ref="minutesDom"
                    @mousedown="minuteDownHandle"
                    @mouseup="minuteUpHandle"
                    @scroll="minuteScroll"
            >
                <section class="p-picker-time-section">
                    <article
                            :class="['p-picker-time-text', minute===mm.time&&'p-picker-time-text-selected', mm.disabled&&'p-picker-time-text-disabled']"
                            v-for="(mm, mi) in minutes"
                            :key="'minute'+mi+mm.time"
                            @click.stop="minuteClick(mm)"
                    ><span>{{mm.time}}</span></article>
                </section>
            </div>
            <div
                    v-if="format.includes('ms')"
                    :class="['p-picker-time-select', 'p-picker-time-select-'+format]"
                    ref="secondsDom"
                    @mousedown="secondDownHandle"
                    @mouseup="secondUpHandle"
                    @scroll="secondScroll"
            >
                <section class="p-picker-time-section">
                    <article
                            :class="['p-picker-time-text', second===ss.time&&'p-picker-time-text-selected', ss.disabled&&'p-picker-time-text-disabled']"
                            v-for="(ss, si) in seconds"
                            :key="'second'+si+ss.time"
                            @click.stop="secondClick(ss)"
                    ><span>{{ss.time}}</span></article>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import CountNumber from '../../static/utils/datePicker/CountNumber';

export default {
    name: 'TimeSelect',
    props: {
        // 左边框
        borderLeft: {
            type: String,
            default: ''
        },
        /**
         * 选择的时间
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
        // 开启年月日限制 选中的年月日
        ymdSelected: {
            type: String,
            default: '' // 2020.03.20
        },
        // 开启年月日限制 限制的年月日
        ymdLimit: {
            type: String,
            default: '' // 2020.03.20-2020.05.19
        }
    },
    data() {
        return {
            hour: '', // 选择的小时
            minute: '', // 选择的分钟
            second: '', // 选择的秒

            hours: [],
            minutes: [],
            seconds: []
        };
    },
    watch: {
        time(n, o) {
            if (n === o) return;
            this.setTime(n);
        },
        scopeTime(n, o) {
            if (n === o) return;
            this.initTimeArr(n);
        },
        ymdLimit(n, o) {
            if (n === o) return;
            this.initTimeArr(this.scopeTime);
        }
    },
    created() {
        this.setTime(this.time);
        this.initTimeArr(this.scopeTime);
    },
    methods: {
        // 初始化时间
        initTimeArr(scopeTime) {
            const { format } = this;
            const [hours, minutes, seconds] = CountNumber();
            this.hours = this.setHoursDisabled(hours, this.getScope(scopeTime, 'h'));
            if (format?.includes('hm')) this.minutes = this.setMinutesDisabled(minutes, this.getScope(scopeTime, 'm'));
            if (format?.includes('ms')) this.seconds = this.setSecondsDisabled(seconds, this.getScope(scopeTime, 's'));
        },
        // 重新计算数据
        changeArray() {
            setTimeout(() => this.initTimeArr(this.scopeTime), 300);
        },

        /**
         * 获取禁用时间点
         * @param scopeTime 禁用-时间段
         * @param f 可选值时分秒【h m s】
         */
        getScope(scopeTime, f) {
            let start = '00',
                end = '60';
            if (scopeTime) {
                const ymd = this.ymdLimit.replace(/\./g, '') || '';
                const [ymdS = '', ymdE = ''] = ymd.split('-');
                const [st, et] = scopeTime.split('-');
                const [sh, sm, ss] = st.split(':');
                const [eh, em, es] = et.split(':');

                if (f === 'h') {
                    start = ymdS + sh || '00';
                    end = ymdE + eh || '24';
                } else if (f === 'm') {
                    start = ymdS + sh + sm || '0000';
                    end = ymdE + eh + em || '2460';
                } else {
                    start = ymdS + sh + sm + ss || '000000';
                    end = ymdE + eh + em + es || '246060';
                }
            }

            return {
                start,
                end
            };
        },

        /**
         * 设置时间禁用
         * @param arr 需要改变的数组对象
         * @param start 禁用-开始时间
         * @param end 禁用-结束时间
         */
        setHoursDisabled(arr, { start, end }) {
            const ymd = this.ymdSelected.replace(/\./g, '') || '';
            return arr.map(d => {
                const cur = ymd + d.time;
                d.disabled = cur < start || cur > end;
                return d;
            });
        },
        setMinutesDisabled(arr, { start, end }) {
            const ymd = this.ymdSelected.replace(/\./g, '') || '';
            return arr.map(d => {
                const cur = ymd + this.hour + d.time;
                d.disabled = cur < start || cur > end;
                return d;
            });
        },
        setSecondsDisabled(arr, { start, end }) {
            const ymd = this.ymdSelected.replace(/\./g, '') || '';
            return arr.map(d => {
                const cur = ymd + this.hour + this.minute + d.time;
                d.disabled = cur < start || cur > end;
                return d;
            });
        },
        /**
         * 设置时间
         */
        setTime(time) {
            const { format } = this;
            let hour = '',
                minute = '',
                second = '';
            if (time) {
                const [hh, mm, ss] = time.split(':');
                hour = hh;
                if (format.includes('hm')) minute = mm;
                if (format.includes('ms')) second = ss;
            }
            this.hour = hour;
            this.minute = minute;
            this.second = second;
        },
        // 设置时分秒位置
        setTimeDom(selectedTime) {
            let hh = 0,
                mm = 0,
                ss = 0;
            if (selectedTime) {
                const [h = '', m = '', s = ''] = selectedTime.split(':');
                this.hour = h;
                this.minute = m;
                this.second = s;
                hh = h;
                mm = m;
                ss = s;
            } else {
                const { hours, minutes, seconds } = this;
                hh = hours.find(h => !h.disabled)?.time || 0;
                mm = minutes.find(m => !m.disabled)?.time || 0;
                ss = seconds.find(s => !s.disabled)?.time || 0;
            }
            setTimeout(() => {
                if (this.$refs.hoursDom) this.$refs.hoursDom.scrollTop = hh * 32;
                if (this.$refs.minutesDom) this.$refs.minutesDom.scrollTop = mm * 32;
                if (this.$refs.secondsDom) this.$refs.secondsDom.scrollTop = ss * 32;
            });
        },

        // 设置时间状态
        setTimeStatus(hour = '', minute = '', second = '') {
            const {
                scopeTime, format, minutes, seconds
            } = this;
            if (scopeTime) {
                const ymd = this.ymdSelected.replace(/\./g, '') || '';
                const ymdLimit = this.ymdLimit.replace(/\./g, '') || '';
                const [ymdS = '', ymdE = ''] = ymdLimit.split('-');

                const [start, end] = scopeTime.split('-');
                const [minH = '', minM = '', minS = ''] = start.split(':');
                const [maxH = '', maxM = '', maxS = ''] = end.split(':');
                let obj = null;
                if (format === 'hms') {
                    const nowTime = ymd + hour + minute + second,
                        minTime = ymdS + minH + minM + minS,
                        maxTime = ymdE + maxH + maxM + maxS;
                    if (nowTime >= maxTime) {
                        obj = {
                            flag: 'max',
                            M: maxM,
                            S: maxS
                        };
                    } else if (nowTime <= minTime) {
                        obj = {
                            flag: 'min',
                            M: minM,
                            S: minS
                        };
                    } else {
                        obj = {
                            flag: 'min',
                            M: minutes.find(m => !m.disabled)?.time || '',
                            S: seconds.find(s => !s.disabled)?.time || ''
                        };
                    }
                } else if (format === 'hm') {
                    const nowTime = ymd + hour + minute,
                        minTime = ymdS + minH + minM,
                        maxTime = ymdE + maxH + maxM;
                    if (nowTime >= maxTime) {
                        obj = {
                            flag: 'max',
                            M: maxM
                        };
                    } else if (nowTime <= minTime) {
                        obj = {
                            flag: 'min',
                            M: minM
                        };
                    } else {
                        obj = {
                            flag: 'min',
                            M: minutes.find(m => !m.disabled)?.time || ''
                        };
                    }
                } else {
                    obj = null;
                }
            }
            return {
                flag: 'min',
                M: minutes.find(m => !m.disabled)?.time || '',
                S: seconds.find(s => !s.disabled)?.time || ''
            };
        },

        /**
         * 点击小时
         * @param hour
         * @param disabled
         */
        hourClick({ time: hour, disabled }) {
            if (disabled) return;
            this.hour = hour;
            this.scrollTopTimer(hour * 32, 'hoursDom');
            this.$emit('changeTime', 'h', hour);
            this.changeArray();

            setTimeout(() => {
                const timeStatus = this.setTimeStatus(hour, this.minute, this.second);
                if (timeStatus && timeStatus.hasOwnProperty('flag')) {
                    const { M, S } = timeStatus;
                    if (M) {
                        this.minute = M;
                        this.$refs.minutesDom.scrollTop = M * 32;
                        this.$emit('changeTime', 'm', M);
                    }
                    if (S) {
                        this.second = S;
                        this.$refs.secondsDom.scrollTop = S * 32;
                        this.$emit('changeTime', 's', S);
                    }
                }
            }, 300);
        },
        /**
         * 点击分钟
         * @param minute
         * @param disabled
         */
        minuteClick({ time: minute, disabled }) {
            if (disabled) return;
            this.minute = minute;
            this.scrollTopTimer(minute * 32, 'minutesDom');
            this.$emit('changeTime', 'm', minute);

            const timeStatus = this.setTimeStatus(this.hour, minute, this.second);
            if (timeStatus) {
                const { maxS } = timeStatus;
                if (maxS) {
                    this.second = maxS;
                    this.$refs.secondsDom.scrollTop = maxS * 32;
                    this.$emit('changeTime', 's', maxS);
                }
            }
            this.changeArray();
        },
        /**
         * 点击秒
         * @param second
         * @param disabled
         */
        secondClick({ time: second, disabled }) {
            if (disabled) return;
            this.second = second;
            this.scrollTopTimer(second * 32, 'secondsDom');
            this.$emit('changeTime', 's', second);
            this.changeArray();
        },
        /**
         * 滚动条过度
         * @param st 滚动到的scrollTop
         * @param obj 当前ref对象
         */
        scrollTopTimer(st, obj) {
            if (!obj) return;
            const top = this.$refs[obj].scrollTop,
                differ = st - top; // 差值
            let remain = differ; // 剩余差值
            this.timer = window.setInterval(() => {
                if (!obj) {
                    window.clearInterval(this.timer);
                    this.timer = null;
                    return;
                }
                const speed = window.Math.round(remain / 3);
                if (speed <= 0) {
                    window.clearInterval(this.timer);
                    this.timer = null;
                }
                remain = remain - speed;
                if (differ) {
                    this.$refs[obj].scrollTop += speed;
                } else {
                    this.$refs[obj].scrollTop -= speed;
                }
                if (remain <= 0) {
                    window.clearInterval(this.timer);
                    this.timer = null;
                    this.$refs[obj].scrollTop = st;
                }
            }, 30);
        },
        // 鼠标按下
        hourDownHandle() {
            this.hourDown = true;
        },
        minuteDownHandle() {
            this.minuteDown = true;
        },
        secondDownHandle() {
            this.secondDown = true;
        },
        // 鼠标放开
        hourUpHandle(e) {
            this.hourDown = false;
            this.hourScroll(e);
        },
        minuteUpHandle(e) {
            this.minuteDown = false;
            this.minuteScroll(e);
        },
        secondUpHandle(e) {
            this.secondDown = false;
            this.secondScroll(e);
        },
        // 小时scroll
        hourScroll(e) {
            if (this.timer || this.hourDown) return;
            if (this.hourTimer) clearTimeout(this.hourTimer);
            const target = e.target || e;
            const st = Math.round(target.scrollTop / 32);
            this.hourTimer = setTimeout(() => {
                target.scrollTop = st * 32;
                clearTimeout(this.hourTimer);
                this.hourTimer = null;
            }, 30);
        },
        // 分钟scroll
        minuteScroll(e) {
            if (this.timer || this.minuteDown) return;
            if (this.minuteTimer) clearTimeout(this.minuteTimer);
            const target = e.target || e;
            const st = Math.round(target.scrollTop / 32);
            this.minuteTimer = setTimeout(() => {
                target.scrollTop = st * 32;
                clearTimeout(this.minuteTimer);
                this.minuteTimer = null;
            }, 30);
        },
        // 秒钟scroll
        secondScroll(e) {
            if (this.timer || this.secondDown) return;
            if (this.secondTimer) clearTimeout(this.secondTimer);
            const target = e.target || e;
            const st = Math.round(target.scrollTop / 32);
            this.secondTimer = setTimeout(() => {
                target.scrollTop = st * 32;
                clearTimeout(this.secondTimer);
                this.secondTimer = null;
            }, 30);
        }
    },
    beforeDestroy() {
        if (this.timer) clearInterval(this.timer);
        if (this.hourTimer) clearTimeout(this.hourTimer);
        if (this.minuteTimer) clearTimeout(this.minuteTimer);
        if (this.secondTimer) clearTimeout(this.secondTimer);
    }
};
</script>

<style lang="stylus">
    .p-picker-child-title
        display flex
        align-items center
        justify-content space-around
        margin-top 12px
        margin-bottom 8px
        padding-left 16px
        padding-right 16px

        .p-picker-time-title-item
            height 24px
            line-height @height
            color $grey-500
            font-size 14px
            text-align center

    .p-picker-time-content
        position relative
        display flex
        justify-content space-around
        padding 8px 16px
        width 100%
        height 208px
        overflow hidden

        &::before
            position absolute
            display block
            background-color $grey-200
            border-radius 4px
            width 262px
            height 24px
            z-index 9
            content ''

    .p-picker-time-select-hms
        width 98px

        .p-picker-time-section
            article
                padding-left 36px

    .p-picker-time-select-hm
        width 147px

        .p-picker-time-section
            article
                padding-left 60px

    .p-picker-time-select-h
        width 262px

        .p-picker-time-section
            article
                padding-left 122px

    .p-picker-time-select
        position relative
        z-index 10
        height 192px
        overflow hidden

        &:hover
            overflow-y auto

        .p-picker-time-section
            padding-bottom 160px
            width 100%

        .p-picker-time-text
            margin-bottom 8px
            width 100%
            height 24px
            line-height @height
            transition background-color .3s

            &:hover
                background-color $grey-200
                border-radius 4px

            span
                color $grey-900
                font-size 14px
                text-align center
                cursor pointer
                transition all .3s
                user-select none

                &:hover
                    background-color $grey-200

            &.p-picker-time-text-selected
                span
                    color $blue-500

            &.p-picker-time-text-disabled
                span
                    cursor not-allowed
                    color $grey-400

</style>
