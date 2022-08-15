<template>
    <div class="p-modal">
        <transition name="opacityInUiOut">
            <div class="p-modal-bg" @click="shadeHandle" :style="{zIndex: secondary&&zIndex}" v-if="show"/>
        </transition>
        <transition-group :name="mode==='full'?'bounceInUiOutScale':'bounceInUiOut'">
            <!-- 提示弹窗样式 -->
            <Tip
                    key="tip"
                    :style="{zIndex: secondary&&zIndex}"
                    v-if="show && mode==='tip'"
                    :title="title"
                    :type="type"
                    :componentId="componentId"
                    @close="close"
            >
                <template #content>
                    <slot name="content"/>
                </template>
                <template #handle>
                    <slot v-if="$scopedSlots.handle" name="handle"/>
                    <Handle v-else
                            @confirm="confirm"
                            @close="close"
                    />
                </template>
            </Tip>
            <!-- 默认弹窗样式 -->
            <Default
                    ref="defaultModal"
                    :style="{zIndex: secondary&&zIndex}"
                    key="default"
                    v-if="show && (mode==='default' || mode==='small' || mode==='middle' || mode==='large')"
                    :mode="mode"
                    :title="title"
                    :custonTitle="custonTitle"
                    :componentId="componentId"
                    @close="close"
            >
                <template #custonTitle>
                    <!-- @slot html内容 -->
                    <slot name="custonTitle"/>
                </template>
                <template #default>
                    <!-- @slot html内容 -->
                    <slot name="content"/>
                </template>
                <template #handle>
                    <slot v-if="$scopedSlots.handle" name="handle"/>
                    <Handle v-else
                            @confirm="confirm"
                            @close="close"
                    />
                </template>
            </Default>
            <!-- 全屏弹窗样式 -->
            <Full key="full"
                  :style="{zIndex: secondary&&zIndex}"
                  v-if="show && mode==='full'"
                  :title="title"
                  :componentId="componentId"
                  @close="close">
                <template #content>
                    <slot name="content"/>
                </template>
                <template #handle>
                    <slot v-if="$scopedSlots.handle" name="handle"/>
                    <Handle v-else
                            @confirm="confirm"
                            @close="close"
                    />
                </template>
            </Full>
        </transition-group>
    </div>
</template>

<script>
import Default from './depend/default';
import Full from './depend/full';
import Tip from './depend/tip';
import Handle from './depend/Handle';

export default {
    name: 'Modal',
    components: {
        Default,
        Full,
        Tip,
        Handle
    },
    props: {
        /**
         * 模态框显示状态
         */
        show: {
            type: Boolean,
            default: false,
            required: true
        },
        /**
         * 自定义标题
         */
         custonTitle:{
            type:Boolean,
            default:false
        },
        /**
         * 模态框标题
         */
        title: {
            type: String,
            default: '',
            required: true
        },
        /**
         * 模态框显示模式，【可选值 full-全屏显示 default-(默认值)自适应宽高 small-最小对话框】
         */
        mode: {
            type: String,
            default: 'default'
        },
        /**
         * 最小模态框类型
         */
        type: {
            type: String,
            default: ''
        },
        // 键盘esc事件关闭弹窗
        esc: {
            type: Boolean,
            default: false
        },
        // 点击遮罩关闭弹窗
        shade: {
            type: Boolean,
            default: false
        },
        // 当前组件的id，具有唯一性
        componentId: {
            type: String,
            default: ''
        },
        // 二次确认
        secondary: {
            type: Boolean,
            default: false
        },
        // 自定义弹窗层级
        zIndex: {
            type: [String, Number],
            default: 4999
        }
    },
    data() {
        return {
            loading: false, // 确定按钮的loading属性
            handleShadow: false // 操作区按钮投影
        };
    },
    watch: {
        show(n, o) {
            if (n === o) return;
            if (n) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.esc) document.addEventListener('keyup', this.listenKeyEsc, false);
        });
    },
    beforeDestroy() {
        if (this.esc) document.removeEventListener('keyup', this.listenKeyEsc);
        document.body.style.overflow = 'auto';
    },
    methods: {
        // 点击遮罩关闭弹窗
        shadeHandle() {
            if (this.shade) this.$emit('close', this.secondary);
        },
        listenKeyEsc(e) {
            if (!this.esc || e.keyCode !== 27) return;
            this.$emit('close', this.secondary);
            document.body.style.overflow = 'auto';
        },
        countPos() {
            const { $refs: { defaultModal } } = this;
            if (defaultModal) defaultModal.countPos();
        },
        confirm() {
            this.$emit('confirm');
        },
        close() {
            this.$emit('close', this.secondary);
        }
    }
};
</script>

<style lang="stylus">
    @import '../static/stylus/animate/opacityInUiOut.styl'
    @import '../static/stylus/animate/bounceInUiOut.styl'
    @import '../static/stylus/animate/bounceInUiOutScale.styl'

    .p-modal-bg
        position fixed
        left 0
        top 0
        background-color $theme-transparency
        width 100%
        height 100%
        z-index 5000

    .p-modal-main
        position fixed
        background-color $theme
        box-shadow $modal-shadow-bottom
        z-index 5000

    .p-modal-main-full
        top 0
        left 0
        width 100%
        height 100%

    .p-modal-main-max
        top 60px

    .p-modal-title
        position relative
        display flex
        justify-content space-between
        padding-left 32px
        padding-right 28px
        border-bottom 1px solid $grey-300
        width 100%
        height 56px

        .p-title-text
            max-width calc(100% - 80px)
            line-height 55px
            color $grey-900
            font-size 16px
            font-weight 600
            overflow hidden
            text-overflow ellipsis
            white-space nowrap

        .p-modal-title-icon
            display inline-block
            width 16px
            height 55px
            line-height @height
            svg
                vertical-align middle
                cursor pointer
                &:hover
                    path
                        fill $blue-500
                        transition fill .36s

    .p-modal-content
        width 100%
        overflow-y auto

    .p-modal-content-full
        max-height calc(100vh - 56px)

    .p-modal-content-max-height
        max-height calc(100vh - 252px)

    .p-modal-content-default
        min-height 156px

    .p-modal-content-middle
        min-height 360px

    .p-modal-content-small
        min-height 77px

    .p-modal-handle
        padding 24px 32px 20px
        width 100%
        text-align right
        font-size 0

    .p-modal-handle-shadow
        box-shadow $box-shadow-top

</style>
