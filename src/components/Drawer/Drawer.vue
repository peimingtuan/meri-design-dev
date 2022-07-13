<template>
    <transition name="slideRightLeft">
        <div v-show="show" class="p-drawer-box">
            <div v-if="shadow" :class="['p-drawer-shadow', penetrate && 'p-drawer-shadow-event']"></div>
            <div
                ref="drawerBox"
                class="p-drawer"
                :style="top&&{top: `${top}px`, height: `calc(100% - ${top}px)`}"
                >
                <div class="p-drawer-title">
                    <section class="p-drawer-title-content">
                        <slot name="title" />
                    </section>
                    <i class="p-drawer-title-icon" @click="onClose">
                        <IconClose />
                    </i>
                </div>
                <div :id="componentId" :class="['p-drawer-content', bottom&&'p-drawer-content-bottom']" @scroll="contentScroll">
                    <!-- @slot html内容 -->
                    <slot name="content" />
                    <section class="p-drawer-content-loading" v-if="loadingMore">
                        <Loading16px class="p-loading16px-drawer" />
                        <span>加载中...</span>
                    </section>
                </div>
                <div :class="['p-drawer-handle', bottom&&'p-drawer-handle-bottom']" v-if="$slots.handle">
                    <slot name="handle" />
                </div>
                <div class="p-drawer-loading" v-if="loading">
                    <section class="p-drawer-loading-svg">
                        <Loading16px color="#c3c7cb" />
                    </section>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import IconClose from '../static/iconSvg/icon_close.svg';
import Loading16px from '../Loading16px';

export default {
    name: 'Drawer',
    components: { IconClose, Loading16px },
    props: {
        /**
         * 侧拉窗显示状态
         */
        show: {
            type: Boolean,
            default: false,
            required: true
        },
        // 是否显示遮罩
        shadow: {
            type: Boolean,
            default: false
        },
        // 点击遮罩是否穿透
        penetrate: {
            type: Boolean,
            default: false
        },
        /**
         * 是否聚焦（也就是失去交掉是否关闭侧拉窗）
         */
        focus: {
            type: Boolean,
            default: false
        },
        /**
         * 是否固定底部操作栏
         */
        bottom: {
            type: Boolean,
            default: false
        },
        // 加载更多
        loadingMore: {
            type: Boolean,
            default: false
        },
        // 加载中...
        loading: {
            type: Boolean,
            default: false
        },
        // 弹窗距离顶部距离是多少
        top: {
            type: [String, Number],
            default: ''
        },
        // 当前组件的id，具有唯一性
        componentId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            autoClose: false, // 是否失去焦点就关闭
            scrollTop: 0, // 滚动条的位置
            tabIndex: -1,
            clientWidth: 0, // drawerBox宽
            clientHeight: 0 //
        };
    },
    watch: {
        // 监听focus改变
        focus: {
            handler(n, o) {
                if (n === o) return;
                this.autoClose = n;
            },
            immediate: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('mousedown', this.checkPointer, false);
            this.$once('hook:beforeDestroy', () => {
                window.removeEventListener('mousedown', this.checkPointer);
            });
        });
    },
    methods: {
        // 检查点击区域
        checkPointer(e) {
            const { focus, show } = this;
            if (!focus || !show) return;
            const { innerWidth } = window,
                { clientWidth } = this.$refs.drawerBox,
                { x } = e;
            if (x < (innerWidth - clientWidth)) this.onClose();
        },
        /**
         * 关闭侧拉窗
         */
        onClose() {
            this.$emit('close', false);
        },
        // 监听页面触底
        contentScroll(e) {
            if (this.loadingMore) return;
            this.$nextTick(() => {
                const { target } = e;
                const { scrollTop, scrollHeight } = target;
                const h = target.getBoundingClientRect().height;
                if (scrollTop + h === scrollHeight) {
                    // 触底了
                    this.$emit('getMore');
                }
            });
        }
    }
};
</script>

<style lang="stylus">
@import "../static/stylus/animate/slideRightLeft.styl"

.p-drawer-box
    position fixed
    right 0
    top 0
    z-index 3000
    display block
    //min-width 304px
    //max-width 680px
    width 100%
    height 100%
    transition right .3s
.p-drawer-shadow
    position absolute
    top 0
    right 0
    z-index 2999
    width 100%
    height 100%
    opacity 0
    //background-color rosybrown
.p-drawer-shadow-event
    pointer-events none
.p-drawer
    outline none
    position absolute
    right 0
    top 0
    background-color $theme
    box-shadow $box-shadow-bottom
    min-width 304px
    max-width 680px
    height 100%
    font-size 0
    z-index 3000
.p-drawer-title
    display flex
    justify-content space-between
    align-items center
    position relative
    padding-left 32px
    padding-right 32px
    border-bottom 1px solid $grey-300
    width 100%
    height 56px
    .p-drawer-title-content
        width calc(100% - 16px)
        font-size 0
    .p-drawer-title-icon
        svg
            width 16px
            height @width
            cursor pointer
            &:hover
                path
                    fill $blue-500
                    transition fill .3s
.p-drawer-content
    width 100%
    min-width 304px
    max-width 680px
    height calc(100% - 56px)
    overflow-x hidden
    overflow-y auto
    .p-drawer-content-loading
        padding 16px
        width 100%
        text-align center
        svg
            width 16px
            vertical-align middle
        span
            vertical-align middle
            color $grey-600
            font-size 14px
.p-drawer-content-bottom
    height calc(100% - 132px)
.p-drawer-handle
    padding 24px 32px 20px
    background-color $theme
    width 100%
.p-drawer-handle-bottom
    position absolute
    right 0
    bottom 0
    box-shadow $box-shadow-top
.p-drawer-loading
    position absolute
    left 0
    top 0
    background-color rgba(255, 255, 255, .8)
    width 100%
    height 100%
    z-index 11
    .p-drawer-loading-svg
        margin 50% auto 0
        width 40px
        height @width
.p-loading16px-drawer
    color $grey-400
</style>
