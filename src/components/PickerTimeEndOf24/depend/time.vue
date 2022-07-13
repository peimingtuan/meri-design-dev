<template>
    <div :class="['p-picker-child-select-box', 'p-picker-child-select-box-'+borderLeft]">
        <div class="p-picker-child-title">
            <section class="p-picker-time-title-item">时</section>
            <section class="p-picker-time-title-item">分</section>
        </div>
        <div class="p-picker-time-content">
            <div
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
        </div>
    </div>
</template>

<script>

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
            default: 'hm'
        },
        // 限制的时间组
        scopes: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            selectedTime: '', // 选择的时间
            hour: '', // 选择的小时
            minute: '', // 选择的分钟

            hours: [],
            minutes: []
        };
    },
    watch: {
        time(n, o) {
            if (n === o) return;
            this.setTime(n);
        },
        scopes: {
            handler(n) {
                this.setDisableArr(n);
            },
            deep: true
        }
    },
    created() {
        this.setTime(this.time);
        this.initTimeArr(this.scopeTime);
    },
    methods: {
        countTime(len) {
            const arr = [];
            for (let i = 0; i < len; i++) {
                arr.push({ time: i < 10 ? `0${i}` : `${i}`, disabled: false });
            }
            return arr;
        },
        CountNumber() {
            const hours = this.countTime(25),
                minutes = this.countTime(this.hour === '24' ? 1 : 60);

            return [hours, minutes];
        },
        // 设置禁用 flag - [h, m, null]
        setDisableArr(scopes, flag) {
            const { hours, minutes, hour } = this;
            const HOURS = JSON.parse(JSON.stringify(hours));
            const MINUTES = JSON.parse(JSON.stringify(minutes));
            scopes.forEach(d => {
                const [s, e] = d.split('-');
                const [hs, ms] = s.split(':'),
                    [he, me] = e.split(':');
                if (flag === 'h') {
                    HOURS.forEach(h => {
                        const cur = `${h.time}${me}`;
                        if (!h.disabled)h.disabled = cur > (hs + ms) && cur < (he + me);
                    });
                } else if (flag === 'm') {
                    MINUTES.forEach(m => {
                        const cur = hour + m.time;
                        if (!m.disabled) m.disabled = cur >= (hs + ms) && cur <= (he + me);
                    });
                } else {
                    HOURS.forEach(h => {
                        const cur = `${h.time}${me}`;
                        if (!h.disabled) h.disabled = cur > (hs + ms) && cur < (he + me);
                    });
                    MINUTES.forEach(m => {
                        const cur = hour + m.time;
                        if (!m.disabled) m.disabled = cur >= (hs + ms) && cur <= (he + me);
                    });
                }
            });
            this.hours = HOURS;
            this.minutes = MINUTES;
        },
        // 初始化时间
        initTimeArr() {
            const { scopes } = this;
            const [hours, minutes] = this.CountNumber();
            this.hours = hours;
            this.minutes = minutes;
            if (scopes && scopes.length) this.setDisableArr(scopes);
        },
        /**
         * 设置时间
         */
        setTime(time) {
            let hour = '',
                minute = '';
            if (time) {
                const [hh, mm] = this.time.split(':');
                hour = hh;
                minute = mm;
            }
            this.hour = hour;
            this.minute = minute;
        },
        // 设置时分秒位置
        setTimeDom() {
            this.$nextTick(() => {
                setTimeout(() => {
                    if (this.$refs.hoursDom) this.$refs.hoursDom.scrollTop = this.hour * 32;
                    if (this.$refs.minutesDom) this.$refs.minutesDom.scrollTop = this.minute * 32;
                });
            });
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
            this.$emit('changeHour', hour);

            if (hour === '24') {
                this.minutes = [{ time: '00', disabled: false }];
                this.$refs.minutesDom.scrollTop = 0;
                this.minute = '00';
                this.$emit('changeMinute', '00');
            } else {
                if (this.minutes && this.minutes.length === 1) {
                    this.initTimeArr();
                } else {
                    this.minutes = this.countTime(this.hour === '24' ? 1 : 60);
                    this.setDisableArr(this.scopes, 'm');
                }
            }
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
            this.$emit('changeMinute', minute);
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
        // 鼠标放开
        hourUpHandle(e) {
            this.hourDown = false;
            this.hourScroll(e);
        },
        minuteUpHandle(e) {
            this.minuteDown = false;
            this.minuteScroll(e);
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
        }
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
