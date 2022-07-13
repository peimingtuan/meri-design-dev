<template>
    <div :class="['p-picker-child-select-box', 'p-picker-child-select-box-'+borderLeft]">
        <div class="p-picker-child-title">
            <section class="p-picker-time-title-item">月</section>
            <section class="p-picker-time-title-item">日</section>
        </div>
        <div class="p-picker-time-content">
            <div
                    :class="['p-picker-time-select', 'p-picker-time-select-hm']"
                    ref="monthDom"
                    @mousedown="monthDownHandle"
                    @mouseup="monthUpHandle"
                    @scroll="monthScroll"
            >
                <section class="p-picker-time-section">
                    <article
                            :class="['p-picker-time-text', month===ma.text&&'p-picker-time-text-selected', ma.disabled&&'p-picker-time-text-disabled']"
                            v-for="(ma, hi) in monthArray"
                            :key="'month'+hi+ma.text"
                            @click="monthClick(ma)"
                    ><span>{{ma.text}}</span></article>
                </section>
            </div>
            <div
                    :class="['p-picker-time-select', 'p-picker-time-select-hm']"
                    ref="dayDom"
                    @mousedown="dayDownHandle"
                    @mouseup="dayUpHandle"
                    @scroll="dayScroll"
            >
                <section class="p-picker-time-section">
                    <article
                            :class="['p-picker-time-text', day===da.text&&'p-picker-time-text-selected', da.disabled&&'p-picker-time-text-disabled']"
                            v-for="(da, mi) in dayArray"
                            :key="'day'+mi+da.text"
                            @click="dayClick(da)"
                    ><span>{{da.text}}</span></article>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MonthDaySelect',
    props: {
        // 左边框
        borderLeft: {
            type: String,
            default: ''
        },
        // 二月有多少天
        leapYear: {
            type: Boolean,
            default: false
        },
        // 当前选中的月日
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
        // 限制的时间范围
        scope: {
            type: String,
            default: ''
        },
        // 选中的月日
        mdSelected: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            monthArray: [], // 月数据
            dayArray: [], // 日数据
            month: '',
            day: ''
        };
    },
    watch: {
        date(n, o) {
            if (n === o) return;
            this.initArray(n);
        },
        scope(n, o) {
            if (n === o) return;
            this.monthArray = this.countMonth();
            this.dayArray = this.countDay(this.month || '01');
        }
    },
    created() {
        this.initArray(this.date);
    },
    methods: {
        // 计算数字
        countNumber(num) {
            const N = num + 1,
                arr = [];
            for (let i = 1; i < N; i++) {
                arr.push({
                    text: i < 10 ? `0${i}` : `${i}`,
                    disabled: false
                });
            }
            return arr;
        },
        // 计算月
        countMonth() {
            const arr = this.countNumber(12);
            const { scope } = this;
            if (scope) {
                const { start, end } = this.getScope(scope);
                const s = start.substr(0, 2),
                    e = end.substr(0, 2);
                return arr.map(d => {
                    const cur = d.text;
                    d.disabled = cur < s || cur > e;
                    return d;
                });
            }
            return arr;
        },
        // 计算天
        countDay(month) {
            let num = 0;
            switch (month) {
            case '01':
            case '03':
            case '05':
            case '07':
            case '08':
            case '10':
            case '12':
                num = 31;
                break;
            case '02':
                num = this.leapYear ? 29 : 28;
                break;
            case '04':
            case '06':
            case '09':
            case '11':
            default:
                num = 30;
                break;
            }

            const arr = this.countNumber(num);
            if (this.scope) {
                const { start, end } = this.getScope(this.scope);
                return arr.map(d => {
                    const cur = d.text;
                    d.disabled = ((this.month || '00') + cur) < start || ((this.month || '13') + cur) > end;
                    return d;
                });
            }
            return arr;
        },

        // 初始化月日
        initArray(monthDay) {
            this.monthArray = this.countMonth();
            let month = '01';
            if (monthDay) {
                const [M, D] = monthDay.split('.');
                this.month = M;
                this.day = D;
                month = M;
            }
            this.dayArray = this.countDay(month);
        },

        /**
         * 获取禁用时间点
         * @param scope 禁用-时间段
         */
        getScope(scope) {
            let start = '00',
                end = '1300';
            if (scope) {
                const md = scope.replace(/\./g, '') || '';
                const [mdS = '0000', mdE = '1300'] = md.split('-');
                start = mdS;
                end = mdE;
            }

            return {
                start,
                end
            };
        },

        // 设置月日位置
        setDateDom(date) {
            let month = '',
                day = '';
            if (date) {
                const [m, d] = date.split('.');
                month = m;
                day = d;
            }
            this.month = month;
            this.day = day;
            this.$nextTick(() => {
                setTimeout(() => {
                    if (this.$refs.monthDom) this.$refs.monthDom.scrollTop = (month ? (month - 1) : 0) * 32;
                    if (this.$refs.dayDom) this.$refs.dayDom.scrollTop = (day ? (day - 1) : 0) * 32;
                });
            });
        },

        // 设置时间状态
        setTimeStatus(month, day) {
            const { scope } = this;
            if (!scope) return;

            const [start, end] = scope.split('-');
            const [minM, minD] = start.split('.');
            const [maxM, maxD] = end.split('.');
            const now = month + day,
                min = minM + minD,
                max = maxM + maxD;
            let obj;
            if (now > max) {
                obj = {
                    flag: 'max',
                    M: maxM,
                    D: maxD
                };
            } else if (now < min) {
                obj = {
                    flag: 'min',
                    M: minM,
                    D: minD
                };
            } else {
                obj = null;
            }
            return obj;
        },

        /**
         * 点击月
         * @param month
         * @param disabled
         */
        monthClick({ text: month, disabled }) {
            if (disabled) return;
            this.month = month;
            this.scrollTopTimer((month - 1) * 32, 'monthDom');
            this.$emit('changeMonth', month);

            const mdStatus = this.setTimeStatus(month, this.day);
            if (mdStatus && mdStatus.hasOwnProperty('flag')) {
                const { D } = mdStatus;
                if (D) {
                    this.day = D;
                    this.$refs.dayDom.scrollTop = (D - 1) * 32;
                    this.$emit('changeDay', D);
                }
            }
            this.dayArray = this.countDay(month);
        },
        /**
         * 点击日
         * @param day
         * @param disabled
         */
        dayClick({ text: day, disabled }) {
            if (disabled) return;
            this.day = day;
            this.scrollTopTimer((day - 1) * 32, 'dayDom');
            this.$emit('changeDay', day);
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
        monthDownHandle() {
            this.monthDown = true;
        },
        dayDownHandle() {
            this.dayDown = true;
        },
        // 鼠标放开
        monthUpHandle(e) {
            this.monthDown = false;
            this.monthScroll(e);
        },
        dayUpHandle(e) {
            this.dayDown = false;
            this.dayScroll(e);
        },
        // 月scroll
        monthScroll(e) {
            if (this.timer || this.monthDown) return;
            if (this.monthTimer) clearTimeout(this.monthTimer);
            const target = e.target || e;
            const st = Math.round(target.scrollTop / 32);
            this.monthTimer = setTimeout(() => {
                target.scrollTop = st * 32;
                clearTimeout(this.monthTimer);
                this.monthTimer = null;
            }, 30);
        },
        // 日scroll
        dayScroll(e) {
            if (this.timer || this.dayDown) return;
            if (this.dayTimer) clearTimeout(this.dayTimer);
            const target = e.target || e;
            const st = Math.round(target.scrollTop / 32);
            this.dayTimer = setTimeout(() => {
                target.scrollTop = st * 32;
                clearTimeout(this.dayTimer);
                this.dayTimer = null;
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

        ul
            li
                padding-left 36px

    .p-picker-time-select-hm
        width 147px

        ul
            li
                padding-left 60px

    .p-picker-time-select-h
        width 262px

        ul
            li
                padding-left 122px

    .p-picker-time-select
        position relative
        z-index 10
        height 192px
        overflow hidden

        &:hover
            overflow-y auto

        ul
            padding-bottom 160px
            width 100%

        .p-picker-time-text
            margin-bottom 8px
            width 100%
            height 24px
            line-height @height
            transition background-color .3s

            &:hover
                background-color $hover-color-grey
                border-radius 4px

            span
                color $grey-900
                font-size 14px
                text-align center
                cursor pointer
                transition all .3s
                user-select none

                &:hover
                    background-color $hover-color-grey

            &.p-picker-time-text-selected
                span
                    color $blue-500

            &.p-picker-time-text-disabled
                span
                    cursor not-allowed
                    color $grey-400

</style>
