<template>
    <div class="p-sidebar-custom"
         :class="[
             pointX && 'p-sidebar-custom-col-resize',
             windowWidth >= 1920 ? 'p-sidebar-custom-large' : 'p-sidebar-custom-normal'
         ]"
         @mousemove="lineMove"
         @mouseup="lineUp"
        >
        <div v-if="pointX"
             class="p-sidebar-custom-line"
             :style="{left: `${pointX - left - 1}px`}"
        />
        <div v-if="!width"
             class="p-sidebar-custom-bar"
             :class="{'p-sidebar-custom-bar-change-size': changeSize && leftWidth}"
             :style="{left: `${leftWidth-2}px`}"
             @mousedown="lineDown"
        />
        <div v-if="openClose"
             class="p-sidebar-custom-btn"
             :class="[leftWidth ? 'p-sidebar-custom-btn-normal' : (hasSlot ? '' : 'p-sidebar-custom-btn-rotate')]"
             :style="{left: `${leftWidth ? leftWidth : (windowWidth >= 1920 ? 22 : 20)}px`}"
             @click="closeLeft"
        >
            <slot v-if="hasSlot" name="icon"/>
            <ArrowDoubleLeft v-else/>
        </div>
        <div class="p-sidebar-left"
             :style="{width: `${leftWidth}px`}"
             v-show="leftShow"
        >
            <slot name="left"/>
        </div>
        <div class="p-sidebar-right" :style="{width: `calc(100% - ${leftWidth}px)`}">
            <slot name="right"/>
        </div>
    </div>
</template>

<script>
import ArrowDoubleLeft from '../static/iconSvg/arrow_double_left.svg';

export default {
    name: 'SidebarCustom',
    components: { ArrowDoubleLeft },
    props: {
        // 宽
        width: {
            type: [String, Number],
            default: ''
        },
        // 显示left栏
        show: {
            type: Boolean,
            default: true
        },
        // 开启改变大小
        changeSize: {
            type: Boolean,
            default: true
        },
        // 开启点击按钮收起
        openClose: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            windowWidth: 0, // 页面宽度
            minWidth: 0, // 最小宽度
            maxWidth: 580, // 最大宽度
            lineStatus: false, // 线条显示
            leftShow: true, // 左侧栏显示
            leftWidth: 0, // 左侧宽度
            leftWidthHistory: 0, // 左侧宽度 - 历史记录
            pointX: 0, // x轴的位置
            left: 0 // 容器距离坐标的距离
        };
    },
    computed: {
        hasSlot() {
            return this.$slots.icon;
        }
    },
    watch: {
        show(n, o) {
            if (n === o) return;
            if (n) this.leftWidth = this.width || this.leftWidthHistory;
            else this.leftWidth = 0;
        }
    },
    mounted() {
        this.getWindowWidth();
        window.addEventListener('resize', this.getWindowWidth, false);
        this.$once('hook:beforeDestroy', () => {
            window.removeEventListener('resize', this.getWindowWidth);
        });
    },
    methods: {
        // 获取页面宽度
        getWindowWidth() {
            const {
                show, width,
                leftWidth: lw,
                leftWidthHistory: lwh,
                maxWidth,
                leftShow
            } = this;
            if (lw === maxWidth) return;
            const windowWidth = window.innerWidth;
            this.windowWidth = windowWidth;

            this.$nextTick(() => {
                if (width) {
                    // if (show) this.leftWidth = width;
                    if (leftShow) this.leftWidth = width;
                    this.leftWidthHistory = width;
                    this.minWidth = width;
                } else {
                    const leftWidth = windowWidth >= 1920 ? 280 : 224;
                    if (((lwh && lw) || (!lwh && !lw)) && show) this.leftWidth = leftWidth;
                    this.leftWidthHistory = leftWidth;
                    this.minWidth = leftWidth;
                }
            });
        },
        /* 竖线 鼠标操作 -s */
        lineDown(e) {
            if (!this.changeSize) return;
            const { left } = this.$el.getBoundingClientRect();
            this.left = Math.ceil(left);
            this.pointX = e.x;
        },
        lineMove(e) {
            if (!this.pointX) return;
            const { x } = e,
                { minWidth, maxWidth, left } = this;
            if (x - left <= minWidth) this.pointX = minWidth + left;
            else if (x - left >= maxWidth) this.pointX = maxWidth + left;
            else this.pointX = x;
        },
        lineUp() {
            if (!this.pointX) return;
            const { pointX, left } = this;
            this.leftWidth = pointX - left;
            this.leftWidthHistory = pointX - left;
            this.pointX = 0;
            this.$emit('change', this.leftWidth, this.leftShow);
        },
        /* 竖线 鼠标操作 -e */
        // 关闭左侧
        closeLeft() {
            if (this.leftWidth) {
                this.leftWidth = 0;
                setTimeout(() => { this.leftShow = false; }, 300);
            } else {
                this.leftShow = true;
                setTimeout(() => { this.leftWidth = this.leftWidthHistory; });
            }
            setTimeout(() => { this.$emit('change', this.leftWidth, this.leftShow); }, 300);
        }
    }
};
</script>

<style lang="stylus">
.p-sidebar-custom
    position relative
    display flex
    width 100%
    height 100%
    font-size 0
    overflow hidden
.p-sidebar-custom-col-resize
    cursor col-resize
    > div
        pointer-events none
        user-select none
    .p-sidebar-left
        pointer-events none
.p-sidebar-custom-normal
    .p-sidebar-custom-btn
        border-radius 12px
        width 24px
        height @width
        line-height @width
        transform translateX(-12px)
        svg
            width 12px
            height 12px
.p-sidebar-custom-large
    .p-sidebar-custom-btn
        border-radius 14px
        width 28px
        height @width
        line-height @width
        transform translateX(-14px)
        svg
            width 16px
            height @width
.p-sidebar-custom-line
    position absolute
    left 222px
    top 0
    z-index 11
    background-color $blue-500
    width 2px
    height 100%
    pointer-events none
.p-sidebar-custom-bar
    position absolute
    top 0
    z-index 11
    width 3px
    height 100%
.p-sidebar-custom-bar-change-size
    cursor col-resize
    &:hover
        &::before
            content ''
            position absolute
            top 0
            right 1px
            z-index 11
            display block
            background-color $blue-500
            width 2px
            height 100%
.p-sidebar-custom-btn
    position absolute
    top 16px
    z-index 12
    display inline-block
    background-color $theme
    border 1px solid $grey-300
    box-shadow $box-shadow-right
    overflow hidden
    font-size 0
    text-align center
    cursor pointer
    transition background-color .3s, left .3s
    &:hover
        background-color $blue-500
        border-color $blue-500
        svg
            path
                fill $white
    svg
        margin-top -2px
        vertical-align middle
        font-size 0
        transition transform .3s
        path
            transition fill.3s
//.p-sidebar-custom-btn-normal
//    svg
//        margin-left -2px
.p-sidebar-custom-btn-rotate
    svg
        //margin-right -2px
        transform rotate(180deg)
.p-sidebar-left
    position relative
    z-index 10
    background-color $grey-50
    border-right 1px solid $grey-300
    width 224px
    height 100%
    overflow auto
    transition width .3s
.p-sidebar-right
    width calc(100% - 224px)
    height 100%
    overflow auto
    transition width .3s
</style>
