<template>
    <div class="p-carousel" @mouseenter="stopTimer" @mouseleave="setTimer">
        <transition-group name="slideUpUi">
            <div class="p-carousel-msg"
                 v-show="num === i"
                 v-for="(item, i) in data"
                 :key="item.id"
                 @click="itemClick(item.id)"
                 :title="item.text"
            >
                <!--
                commission 待办
                executory 待执行
                pending 待处理
                -->
                <i class="p-carousel-icon">
                    <CommissionSvg v-if="item.type === 'commission'" />
                    <ExecutorySvg v-if="item.type === 'executory'" />
                    <PendingSvg v-if="item.type === 'pending'" />
                </i>
                <section class="p-carousel-item">{{item.text}}</section>
            </div>
        </transition-group>
    </div>
</template>

<script>
import CommissionSvg from '../static/iconSvg/commission.svg'; // 代办
import ExecutorySvg from '../static/iconSvg/executory.svg'; // 待执行
import PendingSvg from '../static/iconSvg/pending.svg'; // 待处理

export default {
    name: 'CarouselText',
    components: { CommissionSvg, ExecutorySvg, PendingSvg },
    props: {
        /**
         * 文字轮播列表
         */
        data: {
            type: Array,
            default: () => []
        },
        /**
         * 定时器时间,单位s（秒）
         */
        time: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            num: 0
        };
    },
    mounted() {
        this.setTimer();
    },
    methods: {
        setTimer() {
            if (this.data && this.data.length) {
                this.timer = window.setInterval(() => {
                    if (this.num < this.data.length - 1) this.num++;
                    else this.num = 0;
                }, this.time * 1000);
            }
        },
        stopTimer() {
            if (this.data && this.data.length) {
                window.clearInterval(this.timer);
                // this.num = 0;
            }
        },
        /**
         * 点击某项执行的函数
         * @param id
         */
        itemClick(id) {
            this.$emit('click', id);
        }
    },
    beforeDestroy() {
        if (this.data && this.data.length) {
            this.stopTimer();
        }
    }
};
</script>

<style lang="stylus">
    @import "../static/stylus/animate/slideUpUi.styl"

    .p-carousel
        display flex
        align-items center
        justify-content flex-end
        width 100%
        height 24px
        overflow hidden
        font-size 0
        > span
            display inline-block
            width 100%
        .p-carousel-msg
            display flex
            align-items center
            justify-content flex-end
            width 100%
            height @height
        .p-carousel-icon
            margin-right 8px
            padding-top 4px
            background-color $red-400
            border-radius 11px
            width 22px
            height @width
            text-align center
            svg
                vertical-align middle
        .p-carousel-item
            max-width calc(100% - 30px)
            height @height
            line-height @height
            font-size 14px
            color $grey-600
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            cursor pointer

</style>
